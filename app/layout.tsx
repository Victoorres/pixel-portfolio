import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Victor Torres - Full-Stack Developer | Portfólio Pixelado",
  description:
    "Desenvolvedor Full-Stack especializado em React, Node.js e tecnologias modernas. Experiência única em portfólio estilo pixel art com jogos interativos.",
  keywords: [
    "desenvolvedor full-stack",
    "react developer",
    "node.js",
    "javascript",
    "typescript",
    "portfolio",
    "pixel art",
    "web developer",
    "são paulo",
    "freelancer",
  ],
  authors: [{ name: "Victor Torres" }],
  creator: "Victor Torres",
  publisher: "Victor Torres",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://victortorres.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Victor Torres - Full-Stack Developer",
    description:
      "Portfólio interativo estilo pixel art de um desenvolvedor Full-Stack especializado em React e Node.js",
    url: "https://victortorres.dev",
    siteName: "Victor Torres Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Victor Torres - Full-Stack Developer Portfolio",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Torres - Full-Stack Developer",
    description: "Portfólio interativo estilo pixel art de um desenvolvedor Full-Stack",
    images: ["/og-image.png"],
    creator: "@victortorres",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
