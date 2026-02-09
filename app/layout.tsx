import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import CookieBanner from "@/components/cookie-banner"
import CookieSettingsButton from "@/components/cookie-settings-button"

export const metadata: Metadata = {
  // Primary SEO Information
  title: {
    default: 'VersalLabs - Innovating the Future',
    template: '%s | VersalLabs',
  },
  description: 'VersalLabs is a leading technology company specializing in custom software development, AI solutions, and digital transformation. We help businesses innovate and grow through cutting-edge technology and expert consultation.',
  
  // Keywords are a good practice but less critical than they used to be.
  // Use a comma-separated list of relevant terms.
  keywords: ['VersalLabs', 'software development', 'AI solutions', 'digital transformation', 'web design', 'tech consulting', 'Sri Lanka'],

  // Canonical URL for preventing duplicate content issues
  alternates: {
    canonical: 'https://versallabs.lk',
  },

 

 

  // Author and other general information
  authors: [{ name: 'VersalLabs Team', url: 'https://versallabs.lk' }],
  creator: 'VersalLabs Team',
  publisher: "Versal Labs",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://versallabs.lk",
    siteName: "Versal Labs",
    title: "Versal Labs - Smart Code. Scalable Innovation.",
    description:
      "Your future-ready software partner. We craft cutting-edge solutions that transform businesses through custom development, AI integration, and scalable cloud platforms.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Versal Labs - Smart Code. Scalable Innovation.",
    description:
      "Your future-ready software partner. We craft cutting-edge solutions that transform businesses through custom development, AI integration, and scalable cloud platforms.",
    creator: "@Versal_Labs",
  },
  
  // Prevent search engines from indexing certain parts of the site (if needed)
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <CookieBanner />
        <CookieSettingsButton />
      </body>
    </html>
  )
}
