import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The shared Open Graph card. Rendered by Satori at build time, so every rule here is
 * constrained by what Satori supports: flexbox only, and any element with more than one
 * child needs an explicit `display`.
 */

const FONT_DIR = join(process.cwd(), 'node_modules/@fontsource/ibm-plex-mono/files');

// Satori reads ttf/otf/woff. The variable Instrument Sans only ships woff2, so the card is
// set entirely in the mono face, which is the register the product speaks in anyway.
const mono = (weight: 400 | 600) =>
  readFileSync(join(FONT_DIR, `ibm-plex-mono-latin-${weight}-normal.woff`));

export const ogFonts = () =>
  [
    { name: 'IBM Plex Mono', data: mono(400), weight: 400 as const, style: 'normal' as const },
    { name: 'IBM Plex Mono', data: mono(600), weight: 600 as const, style: 'normal' as const },
  ];

export const OG_SIZE = { width: 1200, height: 630 };

const INK = '#0a282a';
const MUTED = '#587072';
const ACCENT = '#006f77';
const REJECT = '#be3d36';
const LINE = '#c6d6d4';

export type OgCopy = {
  kicker: string;
  headline: [string, string];
  refused: string;
};

export function OgCard({ kicker, headline, refused }: OgCopy) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#eff5f4',
        padding: 72,
        fontFamily: 'IBM Plex Mono',
        color: INK,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-start' }}>
          <div style={{ width: 15, height: 38, borderRadius: 5, background: ACCENT }} />
          <div style={{ width: 15, height: 38, borderRadius: 5, background: INK, marginTop: 6 }} />
        </div>
        <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>EchoCheck</div>
        <div style={{ fontSize: 20, color: MUTED, marginLeft: 12, marginTop: 4 }}>{kicker}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 62,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: -2,
          }}
        >
          <div>{headline[0]}</div>
          <div>{headline[1]}</div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            background: '#ffffff',
            border: `2px solid ${LINE}`,
            borderRadius: 14,
            padding: '26px 32px',
            fontSize: 24,
          }}
        >
          <div style={{ display: 'flex', color: MUTED }}>
            <div style={{ width: 320 }}>msg-approve-a</div>
            <div>0 independent sources</div>
          </div>
          <div style={{ display: 'flex', color: MUTED }}>
            <div style={{ width: 320 }}>msg-approve-b</div>
            <div>0 independent sources</div>
          </div>
          <div style={{ display: 'flex', height: 2, background: LINE, marginTop: 6 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 6 }}>
            <div style={{ fontWeight: 600 }}>independent_sources = 0</div>
            <div style={{ color: MUTED }}>{'->'}</div>
            <div style={{ fontWeight: 600, color: REJECT }}>REJECT</div>
            <div style={{ color: MUTED }}>{refused}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20 }}>
        <div style={{ color: ACCENT }}>echo-check.zent-agency.com</div>
        <div style={{ color: MUTED }}>Apache-2.0</div>
      </div>
    </div>
  );
}
