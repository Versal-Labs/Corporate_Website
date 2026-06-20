import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import CookieBanner from "@/components/cookie-banner"
import CookieSettingsButton from "@/components/cookie-settings-button"
import { absoluteUrl, serializeJsonLd, siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Custom Software & AI Development Company in Sri Lanka | Versal Labs',
    template: '%s | Versal Labs',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: 'Versal Labs Team', url: siteConfig.url }],
  creator: 'Versal Labs Team',
  publisher: siteConfig.name,
  category: "technology",

  openGraph: {
    type: "website",
    locale: "en_LK",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Custom Software & AI Development Company in Sri Lanka | Versal Labs",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software & AI Development Company in Sri Lanka | Versal Labs",
    description: siteConfig.description,
    creator: "@versallabs",
  },
  
  // Prevent search engines from indexing certain parts of the site (if needed)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  alternateName: "VersalLabs",
  url: siteConfig.url,
  logo: absoluteUrl("/logo-full.svg"),
  image: absoluteUrl("/opengraph-image"),
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.telephone,
  address: { "@type": "PostalAddress", ...siteConfig.address },
  areaServed: [
    { "@type": "Country", name: "Sri Lanka" },
    { "@type": "Place", name: "Worldwide" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    contactType: "sales and customer support",
    areaServed: "Worldwide",
    availableLanguage: "English",
  },
  sameAs: [
    siteConfig.googleBusinessProfile,
    siteConfig.social.linkedin,
    siteConfig.social.x,
    siteConfig.social.github,
    siteConfig.social.instagram,
  ],
  identifier: siteConfig.googleKnowledgeGraphId,
  knowsAbout: [
    "Custom software development",
    "Artificial intelligence automation",
    "ERP software development",
    "Cloud and DevOps consulting",
    "SaaS product development",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: "en-LK",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }} />
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
