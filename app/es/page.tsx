import type { Metadata } from 'next';
import { MarketingLanding } from '@/components/marketing/marketing-landing';

export const metadata: Metadata = {
  title: 'EchoCheck | Control de procedencia para agentes',
  description: 'Rastrea cada aprobación hasta su fuente y frena releases basados en un único input en disputa.',
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
