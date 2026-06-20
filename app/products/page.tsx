import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import { getProducts, type Product } from "@/lib/sanity"
import { ProductCard } from "@/components/product-card"
import { createPageMetadata } from "@/lib/seo"

export const revalidate = 3600

export const metadata = createPageMetadata({
  title: "Software Products & SaaS Platforms from Sri Lanka",
  description: "Explore SaaS, ERP, mobile, and web products designed and engineered by Versal Labs in Colombo, Sri Lanka.",
  path: "/products",
  keywords: ["software products Sri Lanka", "SaaS company Sri Lanka", "business software Colombo"],
})

export default async function ProductsPage() {
  const products: Product[] = await getProducts()

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-green-900/20 to-blue-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Our Products
            </h1>
            <p className="text-xl text-gray-300">
              Innovative SaaS platforms and applications we&apos;ve built to solve real-world business challenges.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">No products available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

