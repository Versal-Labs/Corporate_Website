import type { Metadata } from "next"

export const siteConfig = {
  name: "Versal Labs",
  legalName: "Versal Labs",
  url: "https://versallabs.lk",
  description:
    "Versal Labs is a Sri Lankan software company building custom software, AI automation, ERP platforms, cloud systems, and scalable digital products for businesses worldwide.",
  email: "hello@versallabs.lk",
  telephone: "+94766243587",
  displayTelephone: "+94 76 624 3587",
  address: {
    streetAddress: "105, 24 Kent Rd",
    addressLocality: "Colombo",
    postalCode: "00900",
    addressCountry: "LK",
  },
  googleBusinessProfile: "https://share.google/7YAktg1qpGd9YHQg8",
  googleKnowledgeGraphId: "/g/11xvgbk4wf",
  social: {
    linkedin: "https://www.linkedin.com/company/versallabs/",
    x: "https://x.com/versallabs",
    github: "https://github.com/Versal-Labs",
    instagram: "https://www.instagram.com/versallabs/",
  },
} as const

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}
type PageMetadataInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  type?: "website" | "article"
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const brandedTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`

  return {
    title: { absolute: brandedTitle },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "en_LK",
      url,
      siteName: siteConfig.name,
      title: brandedTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      creator: "@versallabs",
    },
  }
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}
