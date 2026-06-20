const legacySlugMap: Record<string, string> = {
  "falling-behind-5-reasons-why-custom-software-is-your-nexxt-big-investment":
    "falling-behind-5-reasons-why-custom-software-is-your-next-big-investment",
}
export function canonicalBlogSlug(slug: string) {
  return legacySlugMap[slug] || slug
}

export function sourceBlogSlug(slug: string) {
  const entry = Object.entries(legacySlugMap).find(([, canonical]) => canonical === slug)
  return entry?.[0] || slug
}
