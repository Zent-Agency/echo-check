import type { Metadata } from 'next';
import { MarketingLanding } from '@/components/marketing/marketing-landing';

export const metadata: Metadata = {
  title: 'EchoCheck | Evidencia independiente para agentes',
  description: 'Una compuerta obligatoria de evidencia independiente para acciones de agentes de alto riesgo.',
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
