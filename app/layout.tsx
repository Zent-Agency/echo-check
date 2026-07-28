import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EchoCheck — Independent evidence for agents',
  description: 'A mandatory independent-evidence gate for high-risk agent actions.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
