import HomePage from "@/components/home-page"
import { getFeaturedPortfolio, getFeaturedProducts, getRecentPosts } from "@/lib/sanity"
import { createPageMetadata } from "@/lib/seo"

export const revalidate = 3600

export const metadata = createPageMetadata({
  title: "Custom Software & AI Development Company in Sri Lanka",
  description:
    "Versal Labs is a software company in Colombo delivering custom software, AI automation, ERP systems, cloud engineering, and digital products in Sri Lanka and worldwide.",
  path: "/",
  keywords: [
    "software company Sri Lanka",
    "custom software development company Sri Lanka",
    "AI development company Sri Lanka",
    "software development Colombo",
  ],
})

export default async function Page() {
  const [recentPosts, featuredProducts, featuredPortfolio] = await Promise.all([
    getRecentPosts(),
    getFeaturedProducts(),
    getFeaturedPortfolio(),
  ])
  return <HomePage recentPosts={recentPosts} featuredProducts={featuredProducts} featuredPortfolio={featuredPortfolio} />
}
