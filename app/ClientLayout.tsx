'use client';

import type React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

function RouteProtection({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only protect /home route
    if (pathname === '/home') {
      const cameFromHome = sessionStorage.getItem('cameFromHomePage');
      const userHasInteracted = sessionStorage.getItem('userHasInteracted');
      const interactionTimestamp = sessionStorage.getItem('interactionTimestamp');

      // Check if interaction was recent (within last 5 minutes)
      const isRecentInteraction =
        interactionTimestamp && Date.now() - Number.parseInt(interactionTimestamp) < 1 * 60 * 1000;

      // Redirect if any condition is not met
      if (!cameFromHome || !userHasInteracted || !isRecentInteraction) {
        // Clear flags and redirect
        sessionStorage.clear();
        router.replace('/');
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#a5da60" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <RouteProtection>{children}</RouteProtection>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Victor Torres',
              jobTitle: 'Full-Stack Developer',
              description: 'Desenvolvedor Full-Stack especializado em React, Node.js e tecnologias modernas',
              url: 'https://victortorres.dev',
              image: 'https://victortorres.dev/profile-image.jpg',
              sameAs: [
                'https://github.com/victortorres',
                'https://linkedin.com/in/victortorres',
                'https://twitter.com/victortorres',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'São Paulo',
                addressCountry: 'BR',
              },
              knowsAbout: [
                'JavaScript',
                'TypeScript',
                'React',
                'Node.js',
                'Full-Stack Development',
                'Web Development',
                'Frontend Development',
                'Backend Development',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
