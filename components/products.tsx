"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const products = [
  {
    title: "Ceylon Wellness",
    description:
      "A modern mobile app promoting mindfulness and holistic well-being for Sri Lankans. Offers guided meditations, health tracking, Ayurvedic tips, and community support.",
    image: "/ceylon-wellness-app.png",
    status: "Live",
    features: ["Meditation", "Health Tracking", "Ayurvedic Guidance", "Sinhala & Tamil Support"],
  },
]

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
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
  }, [])

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
              key={product.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-12`}
            >
              <div className="flex-1">
                <div className="relative group">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-bold">{product.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === "Live"
                        ? "bg-green-500/20 text-green-400"
                        : product.status === "Beta"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">{product.description}</p>

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

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-500">
                    Learn More
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                  {product.status === "Live" && (
                    <Button
                      variant="outline"
                      className="border-gray-600 hover:border-green-400 hover:bg-green-400/10 bg-transparent transition-all duration-300"
                    >
                      <Star className="mr-2 w-4 h-4" />
                      Try Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
