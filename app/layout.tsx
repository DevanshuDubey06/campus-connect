import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Campus Connect – Team Work Updates',
  description:
    'Campus Connect is a national initiative connecting students, ideas, and a brighter tomorrow. Submit your daily team work updates here.',
  keywords: 'Campus Connect, MyGov, team updates, student initiative, LNCT Bhopal',
  openGraph: {
    title: 'Campus Connect – Team Work Updates',
    description: 'People | Ideas | Brighter Tomorrow',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌴</text></svg>" />
      </head>
      <body className="antialiased bg-vice-dark text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
