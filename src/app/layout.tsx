import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DistroLand // 8-Bit Guide to Linux Distributions',
  description: 'A charming 8-bit retro arcade 3D guide to exploring and learning Linux distributions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className="antialiased min-h-screen text-[#2D2338]"
        style={{ 
          background: 'linear-gradient(180deg, #A8D8F0 0%, #FFF0D6 48%, #FFA8CB 100%)',
          color: '#2D2338', 
          margin: 0, 
          padding: 0, 
          minHeight: '100vh', 
          overflow: 'hidden' 
        }}
      >
        {children}
      </body>
    </html>
  );
}
