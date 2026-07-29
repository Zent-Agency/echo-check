import type { Metadata } from 'next';
import '@fontsource-variable/instrument-sans';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import './globals.css';

const SITE = 'https://echo-check.zent-agency.com';
const DESCRIPTION =
  'Trace every agent approval to its source and stop releases built on one disputed input.';

export const metadata: Metadata = {
  // Required for opengraph-image and canonical URLs to resolve to absolute ones.
  metadataBase: new URL(SITE),
  title: 'EchoCheck | Provenance control for agent pipelines',
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: 'EchoCheck',
    title: 'EchoCheck | Provenance control for agent pipelines',
    description: DESCRIPTION,
    url: SITE,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EchoCheck | Provenance control for agent pipelines',
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
