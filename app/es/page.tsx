import type { Metadata } from 'next';
import { MarketingLanding } from '@/components/marketing/marketing-landing';

const TITLE = 'EchoCheck | Control de procedencia para agentes';
const DESCRIPTION =
  'Rastrea cada aprobación hasta su fuente y frena releases basados en un único input en disputa.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Sin esto hereda el openGraph en inglés del layout raíz.
  openGraph: {
    type: 'website',
    siteName: 'EchoCheck',
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://echo-check.zent-agency.com/es',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: '/es',
    languages: {
      en: '/',
      es: '/es',
    },
  },
};

export default function SpanishHome() {
  return <MarketingLanding locale="es" />;
}
