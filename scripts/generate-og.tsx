/**
 * Renders the Open Graph cards to PNG files under app/, where Next picks them up as static
 * metadata assets.
 *
 * They are generated here rather than by an `opengraph-image.tsx` route because that route
 * runs Satori inside the Cloudflare worker at request time, which fails there. A committed
 * PNG is a plain static asset and needs no runtime.
 *
 *   npm run og      # after editing components/og-card.tsx
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// `next/og.js`, not `next/og`: Next ships no exports map, so plain Node ESM cannot resolve
// the extensionless specifier outside the Next build.
import { ImageResponse } from 'next/og.js';

import { OG_SIZE, OgCard, ogFonts, type OgCopy } from '../components/og-card.tsx';

const CARDS: { out: string; alt: string; copy: OgCopy }[] = [
  {
    out: 'app/opengraph-image.png',
    alt: 'EchoCheck: independent_sources = 0, REJECT. Provenance control for agent pipelines.',
    copy: {
      kicker: 'provenance control for agent pipelines',
      headline: ['More agents do not', 'create more evidence.'],
      refused: 'deploy_prod refused',
    },
  },
  {
    out: 'app/es/opengraph-image.png',
    alt: 'EchoCheck: independent_sources = 0, REJECT. Control de procedencia para pipelines de agentes.',
    copy: {
      kicker: 'control de procedencia para agentes',
      headline: ['Más agentes no generan', 'más evidencia.'],
      refused: 'deploy_prod rechazado',
    },
  },
];

for (const { out, alt, copy } of CARDS) {
  const response = new ImageResponse(<OgCard {...copy} />, { ...OG_SIZE, fonts: ogFonts() });
  const png = Buffer.from(await response.arrayBuffer());
  writeFileSync(join(process.cwd(), out), png);
  writeFileSync(join(process.cwd(), out.replace(/\.png$/, '.alt.txt')), alt);
  console.log(`${out}  ${(png.length / 1024).toFixed(1)} kB`);
}
