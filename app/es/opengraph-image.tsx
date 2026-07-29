import { ImageResponse } from 'next/og';

import { OG_SIZE, OgCard, ogFonts } from '@/components/og-card';

export const dynamic = 'force-static';

export const alt =
  'EchoCheck: independent_sources = 0, REJECT. Control de procedencia para pipelines de agentes.';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImageEs() {
  return new ImageResponse(
    (
      <OgCard
        kicker="control de procedencia para agentes"
        headline={['Más agentes no generan', 'más evidencia.']}
        refused="deploy_prod rechazado"
      />
    ),
    { ...OG_SIZE, fonts: ogFonts() },
  );
}
