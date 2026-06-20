import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import { getPortfolioItems, type PortfolioItem } from "@/lib/sanity"
import { PortfolioCard } from "@/components/portfolio-card"
import { createPageMetadata } from "@/lib/seo"

export const revalidate = 3600

export const metadata = createPageMetadata({
  title: "Software Development Portfolio & Case Studies",
  description: "See software, ERP, mobile, web, and AI projects delivered by Versal Labs for businesses in Sri Lanka and beyond.",
  path: "/portfolio",
  keywords: ["software development portfolio Sri Lanka", "software case studies", "Versal Labs projects"],
})

export default async function PortfolioPage() {
  const items: PortfolioItem[] = await getPortfolioItems()

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-300">
              A selection of projects and solutions we’ve built to help teams ship faster and grow smarter.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">No portfolio projects available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <PortfolioCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

