"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Star, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts, type Product } from "@/lib/sanity"
import { urlForImage } from "../sanity/versal-labs/lib/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    async function loadProducts() {
      try {
        const items = await getFeaturedProducts()
        setProducts(items)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    if (loading || products.length === 0) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)

      cards.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          y: 40,
          scale: 0.95,
        })

        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none none",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [loading, products])

  if (loading) {
    return (
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Our Products
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Our Products
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Innovative SaaS platforms and applications coming soon. Stay tuned for exciting launches!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Our Products
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Innovative SaaS platforms and applications we've built to solve real-world business challenges
          </p>
        </div>

        <div className="space-y-12">
          {products.map((product, index) => (
            <div
              key={product._id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-12`}
            >
              <div className="flex-1">
                <div className="running-border product-card cursor-pointer">
                  <div className="running-border-content relative group">
                    {product.image && (
                      <img
                        src={urlForImage(product.image)?.width(600).height(400).url() || "/placeholder.svg"}
                        alt={product.image || product.title}
                        className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-bold">{product.title}</h3>
                  {product.status && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium inline-block w-auto ${
                        product.status === "live"
                          ? "bg-green-500/20 text-green-400"
                          : product.status === "beta"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : product.status === "coming-soon"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {product.status === "live"
                        ? "Live"
                        : product.status === "beta"
                          ? "Beta"
                          : product.status === "coming-soon"
                            ? "Coming Soon"
                            : "Development"}
                    </span>
                  )}
                </div>

                {product.description && <p className="text-lg text-gray-300 leading-relaxed">{product.description}</p>}

                {product.features && product.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  {product.category && (
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      {product.category === "saas"
                        ? "SaaS Platform"
                        : product.category === "mobile"
                          ? "Mobile App"
                          : product.category === "web"
                            ? "Web Application"
                            : product.category === "api"
                              ? "API Service"
                              : "AI Tool"}
                    </div>
                  )}
                  {product.pricing?.price && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {product.pricing.price}
                    </div>
                  )}
                  {product.launchDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(product.launchDate).getFullYear()}
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  {product.productUrl && (
                    <Button className="action-button bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 group relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        Learn More
                        <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  )}
                  {product.demoUrl && product.status === "live" && (
                    <Button
                      variant="outline"
                      className="action-button border-gray-600 hover:border-green-400 hover:bg-green-400/10 bg-transparent group relative overflow-hidden"
                      onClick={() => window.open(product.demoUrl, "_blank")}
                    >
                      <span className="relative z-10 flex items-center">
                        <Star className="mr-2 w-4 h-4 group-hover:text-green-400 transition-colors duration-300" />
                        Try Demo
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            onClick={() => (window.location.href = "/products")}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
