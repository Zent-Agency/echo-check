import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';

import type { IoEvent } from '../lib/echo/observed.ts';

const API = 'https://api.deepseek.com/chat/completions';
const MODEL = process.env.ECHO_MODEL ?? 'deepseek-chat';
const SANDBOX = resolve(import.meta.dirname, 'sandbox');

export type ToolName = 'read_file' | 'write_file' | 'submit_review' | 'verify' | 'deploy_prod';

export type AgentSpec = {
  name: string;
  system: string;
  task: string;
  tools: ToolName[];
  /** Node id this agent uses when it emits a message. */
  messageId?: string;
};

export type AgentRun = {
  agent: string;
  events: IoEvent[];
  /** Human-readable, for the pitch only. Never reaches the gate. */
  transcript: { role: string; text: string }[];
  /** Displayed next to the confirmation. evaluate() never receives this. */
  review?: { verdict: string; ref: string };
  deployed: boolean;
};

/** The model controls `path`, so it is a trust boundary. Keep it inside the sandbox. */
function sandboxPath(path: string): string {
  const full = resolve(SANDBOX, path);
  if (full !== SANDBOX && !full.startsWith(SANDBOX + sep)) {
    throw new Error(`path escapes sandbox: ${path}`);
  }
  return full;
}

const TOOL_SCHEMAS: Record<ToolName, unknown> = {
  read_file: {
    type: 'function',
    function: {
      name: 'read_file',
      description: 'Read a file from the repository.',
      parameters: {
        type: 'object',
        properties: { path: { type: 'string' } },
        required: ['path'],
      },
    },
  },
  write_file: {
    type: 'function',
    function: {
      name: 'write_file',
      description: 'Write a file into the repository.',
      parameters: {
        type: 'object',
        properties: { path: { type: 'string' }, content: { type: 'string' } },
        required: ['path', 'content'],
      },
    },
  },
  submit_review: {
    type: 'function',
    function: {
      name: 'submit_review',
      description: 'Submit your review decision. This ends your turn.',
      parameters: {
        type: 'object',
        properties: {
          verdict: { type: 'string', enum: ['safe', 'unsafe'] },
          ref: { type: 'string', description: 'The file your decision is based on.' },
        },
        required: ['verdict', 'ref'],
      },
    },
  },
  verify: {
    type: 'function',
    function: {
      name: 'verify',
      description:
        'Independently verify a claim about this release against corroborating evidence.',
      parameters: {
        type: 'object',
        properties: { claim: { type: 'string' } },
        required: ['claim'],
      },
    },
  },
  deploy_prod: {
    type: 'function',
    function: {
      name: 'deploy_prod',
      description: 'Deploy the release to production. This ends your turn.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
};

async function chat(messages: unknown[], tools: unknown[]): Promise<any> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new Error('DEEPSEEK_API_KEY is not set');

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    // temperature 0 for the most repeatable run we can get; the recording is
    // what makes the demo actually deterministic.
    body: JSON.stringify({ model: MODEL, messages, tools, tool_choice: 'auto', temperature: 0 }),
  });
  if (!res.ok) throw new Error(`deepseek ${res.status}: ${await res.text()}`);
  return (await res.json()).choices[0].message;
}

export async function runAgent(spec: AgentSpec): Promise<AgentRun> {
  const events: IoEvent[] = [];
  const transcript: { role: string; text: string }[] = [];
  const messages: any[] = [
    { role: 'system', content: spec.system },
    { role: 'user', content: spec.task },
  ];
  let deployed = false;
  let done = false;
  let review: { verdict: string; ref: string } | undefined;

  for (let turn = 0; turn < 8 && !done; turn++) {
    const reply = await chat(
      messages,
      spec.tools.map((t) => TOOL_SCHEMAS[t]),
    );
    messages.push(reply);
    if (reply.content) transcript.push({ role: spec.name, text: reply.content });

    if (!reply.tool_calls?.length) break;

    for (const call of reply.tool_calls) {
      const args = JSON.parse(call.function.arguments || '{}');
      let result: string;

      switch (call.function.name as ToolName) {
        case 'read_file': {
          const full = sandboxPath(args.path);
          if (!existsSync(full)) {
            result = `error: no such file: ${args.path}`;
            break;
          }
          events.push({ op: 'read', agent: spec.name, path: args.path });
          result = readFileSync(full, 'utf8');
          break;
        }
        case 'write_file': {
          writeFileSync(sandboxPath(args.path), args.content ?? '');
          events.push({ op: 'write', agent: spec.name, path: args.path });
          result = `wrote ${args.path}`;
          break;
        }
        case 'submit_review': {
          // Only the fact that a message exists reaches the graph. The verdict
          // rides along for display; the gate never reads it.
          events.push({ op: 'emit', agent: spec.name, id: spec.messageId! });
          review = { verdict: String(args.verdict), ref: String(args.ref) };
          transcript.push({
            role: spec.name,
            text: `submit_review(verdict=${args.verdict}, ref=${args.ref})`,
          });
          result = 'review recorded';
          done = true;
          break;
        }
        case 'verify': {
          events.push({ op: 'call', agent: spec.name, tool: 'verify' });
          result = 'verification service: no corroborating source found for this claim';
          break;
        }
        case 'deploy_prod': {
          // ponytail: mocked on purpose, and it stays mocked. Nothing external ever runs.
          events.push({ op: 'call', agent: spec.name, tool: 'deploy_prod' });
          deployed = true;
          result = 'deploy_prod: production updated';
          done = true;
          break;
        }
        default:
          result = 'error: unknown tool';
      }

      messages.push({ role: 'tool', tool_call_id: call.id, content: result });
    }
  }

  return { agent: spec.name, events, transcript, review, deployed };
}
