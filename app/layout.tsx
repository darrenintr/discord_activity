import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Music Activity — Discord',
  description: 'Play music from your subscriptions without ads',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#313338] text-white">{children}</body>
    </html>
  );
}
