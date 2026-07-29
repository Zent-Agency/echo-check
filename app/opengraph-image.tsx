import { ImageResponse } from 'next/og';

import { OG_SIZE, OgCard, ogFonts } from '@/components/og-card';

// Rendered once at build time, so the deployed worker serves a static asset and never runs
// Satori at request time.
export const dynamic = 'force-static';

export const alt =
  'EchoCheck: independent_sources = 0, REJECT. Provenance control for agent pipelines.';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        kicker="provenance control for agent pipelines"
        headline={['More agents do not', 'create more evidence.']}
        refused="deploy_prod refused"
      />
    ),
    { ...OG_SIZE, fonts: ogFonts() },
  );
}
