"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/sanity"
import { urlForImage } from "../sanity/versal-labs/lib/image"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProductsSection({ initialProducts }: { initialProducts: Product[] }) {
  const products = initialProducts
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (products.length === 0) return

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
  }, [products])

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
                        alt={(product.image as any)?.alt || product.title}
                        width={600}
                        height={400}
                        loading="lazy"
                        className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <ProductCard product={product} showImage={false} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            asChild
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
