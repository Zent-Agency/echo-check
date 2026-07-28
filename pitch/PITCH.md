# EchoCheck — Pitch deck

## SLIDE 1 — HOOK

**2 agents agreed.**  
**1 source informed them.**

Two confirmations can still be one witness.

**Visual direction:** Two agent confirmations converge into a single red source node. Large type, no product UI.

**Speaker note:** “We trust multi-agent workflows because another agent checked. But if both agents learned the claim from the same source, nobody actually corroborated it.”

---

## SLIDE 2 — ATTACK

**Issue malicioso → Release Agent → artifacts → Security Reviewer → Deploy Agent**

The issue instructs the Release Agent.  
The Release Agent produces plausible artifacts.  
The Security Reviewer confirms those artifacts.  
The Deploy Agent sees two approvals.

**The agents verified. The verification was empty.**

**Visual direction:** A left-to-right provenance trace. The first and last connections are red; all apparent confirmations fold back to the malicious issue.

**Speaker note:** “Every step is legitimate in isolation. The failure is not identity or permission. It is evidence lineage.”

---

## SLIDE 3 — WHY CURRENT CONTROLS MISS IT

**Authentic message.**  
**Authorized agents.**  
**Allowed action.**  
**Circular evidence.**

Identity answers **who said it**.  
Authorization answers **who may act**.  
EchoCheck answers **whether the evidence is independent**.

**Visual direction:** Three neutral checks followed by one red failure stamp: `INDEPENDENCE: FAILED`.

**Speaker note:** “Authentication, policy, and agent count all pass. None of them ask whether the second opinion came from a second origin.”

---

## SLIDE 4 — ECHOCHECK

**Observe I/O → Build provenance → Require independent evidence → Issue receipt → Allow / block**

EchoCheck sits below the agents as a mandatory evidence gate.

`2 confirmations / 1 original source / 0 independent evidence`

**VERDICT: REJECT**

**Visual direction:** Use the real EchoCheck receipt screenshot once the MVP is integrated. Until then, use the same evidence-console composition as the landing hero.

**Speaker note:** “EchoCheck observes agent inputs and outputs, resolves confirmations to their origins, and blocks a high-risk action when independence is missing.”

---

## SLIDE 5 — WEDGE + FUTURE

**Today**  
Deployment approvals between coding agents.

**Tomorrow**  
Any high-risk decision where agents verify agents.

Security exceptions. Financial approvals. Production changes. Compliance decisions.

**More agents do not create more evidence.**

**Visual direction:** One precise statement, with “more agents” crossed out and “independent evidence” underlined in green.

**Speaker note:** “We start where the risk is concrete and the workflow is observable: deployment approvals. The same primitive extends anywhere agents approve other agents.”

# Pitch de 30 segundos

“Multi-agent systems treat agreement as confidence, but agreement is meaningless when every agent repeats the same source. EchoCheck is a mandatory independent-evidence gate for high-risk agent actions. It observes agent I/O, builds provenance, and blocks the action when multiple confirmations resolve to one disputed origin. We start with deployment approvals between coding agents, where a poisoned issue can travel through release, review, and deploy without any control noticing the evidence is circular. Two agents agreed. It was still one witness.”

# Guion cronometrado — 4 minutos

**Speakers**

- **Speaker:** presenta slides 1–5 y narra el problema.
- **Demo driver:** controla el MVP y no habla salvo que la demo requiera aclaración.

| Tiempo | Quién | Pantalla | Guion / acción |
|---|---|---|---|
| 0:00–0:25 | Speaker | Slide 1 | “Two agents agreed. One source informed them. Agent systems routinely use a second agent as a second opinion. But another agent is not another witness when both confirmations trace to the same disputed source.” |
| 0:25–1:00 | Speaker | Slide 2 | “Here is the attack. A malicious issue instructs a Release Agent. That agent produces normal-looking artifacts. A Security Reviewer checks those artifacts, and a Deploy Agent sees the release plus the review. Every participant is authentic. Every action is allowed. The agents verified; the verification was empty.” |
| 1:00–1:30 | Speaker | Slide 3 | “Current controls ask whether the message is authentic, whether the agents are authorized, and whether deployment is allowed. All three pass. The missing question is provenance: did the confirmation introduce independent evidence, or did it echo the original claim?” |
| 1:30–1:55 | Speaker | Slide 4 | “EchoCheck sits below the agents as a mandatory gate. It observes what they read and write, builds a provenance graph, requires an independent origin, and issues an auditable receipt before the high-risk action can continue.” |
| 1:55–2:00 | Speaker | Transition to demo | “Let’s run the attack.” Speaker cues the demo driver. |
| 2:00–2:45 | Demo driver | `/demo` | Execute the poisoned deployment path. Pause when Release Agent and Security Reviewer both confirm. Show that the deploy action appears eligible under identity and authorization controls. |
| 2:45–3:10 | Speaker | `/demo` receipt | “EchoCheck resolves both confirmations to the same issue: two confirmations, one original source, zero independent evidence. The receipt says REJECT, and the deployment is blocked.” |
| 3:10–3:30 | Demo driver | `/demo` | If the MVP supports the safe path, add independent evidence and rerun to show PASS. Otherwise remain on the REJECT receipt and point to the missing-evidence requirement. |
| 3:30–3:50 | Speaker | Slide 5 | “We start with deployment approvals between coding agents because the action is high risk and the provenance is observable. Tomorrow, this applies anywhere agents verify agents: production changes, security exceptions, finance, and compliance.” |
| 3:50–4:00 | Speaker | Slide 5 | “The takeaway is simple: more agents do not create more evidence. EchoCheck makes independence enforceable.” |

# Preguntas difíciles

1. **¿En qué se diferencia de IAM o policy-as-code?** IAM decide quién puede actuar; EchoCheck decide si la evidencia que justifica esa acción es realmente independiente.
2. **¿Cómo determina que dos fuentes son independientes?** Construye procedencia desde el I/O observado y exige orígenes distintos según una política explícita para la acción.
3. **¿Qué pasa si los agentes ocultan o resumen su fuente?** La compuerta confía en observación del runtime y recibos de procedencia, no en la explicación declarada por el agente.
4. **¿Esto bloquea demasiados deploys legítimos?** Los casos sin procedencia suficiente quedan UNPROVEN para revisión o política explícita, mientras REJECT se reserva para circularidad demostrada.
5. **¿Por qué no alcanza con agregar otro reviewer?** Un reviewer adicional sigue siendo un eco si consume los mismos artefactos derivados del mismo origen.
6. **¿Cuál es el wedge comercial?** Deployment approvals entre coding agents combina alto impacto, workflows repetibles y evidencia técnica observable.
7. **¿Qué impide falsificar un receipt?** El receipt debe estar firmado por la compuerta de ejecución y vinculado criptográficamente al grafo de procedencia y a la acción evaluada.
