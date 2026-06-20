"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PortfolioItem } from "@/lib/sanity"
import { urlForImage } from "../sanity/versal-labs/lib/image"
import Link from "next/link"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function PortfolioSection({ initialItems }: { initialItems: PortfolioItem[] }) {
  const portfolioItems = initialItems
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (portfolioItems.length === 0) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)

      // Set initial states
      gsap.set(cards, {
        opacity: 0,
        y: 40,
        scale: 0.95,
      })

      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          delay: index * 0.1,
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
  }, [portfolioItems])

  if (portfolioItems.length === 0) {
    return (
      <section id="portfolio" className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're building our portfolio with innovative solutions. Stay tuned for exciting projects coming soon!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our latest projects and innovative solutions that drive business success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={item._id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 group cursor-pointer"
            >
              {item.mainImage && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={urlForImage(item.mainImage)?.width(400).height(200).url() || "/placeholder.svg"}
                    alt={item.mainImage.alt || item.title}
                    width={400}
                    height={200}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {item.status && (
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-green-500/90 text-white"
                          : item.status === "in-progress"
                            ? "bg-yellow-500/90 text-white"
                            : "bg-blue-500/90 text-white"
                      }`}
                    >
                      {item.status === "completed"
                        ? "Completed"
                        : item.status === "in-progress"
                          ? "In Progress"
                          : "Maintenance"}
                    </div>
                  )}
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {item.category && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                      {item.category === "web"
                        ? "Web Development"
                        : item.category === "mobile"
                          ? "Mobile App"
                          : item.category === "enterprise"
                            ? "Enterprise"
                            : item.category === "ai"
                              ? "AI/ML"
                              : "Cloud Solution"}
                    </span>
                  )}
                  {item.completedAt && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.completedAt).getFullYear()}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors duration-300">
                  {item.title}
                </h3>

                {item.description && <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.description}</p>}

                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">
                        +{item.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  {item.projectUrl && (
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-xs"
                    >
                      <a href={item.projectUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-3 h-3 mr-1" />View {item.title}</a>
                    </Button>
                  )}
                  {item.githubUrl && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-gray-600 hover:border-purple-400 hover:bg-purple-400/10 bg-transparent text-xs"
                    >
                      <a href={item.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="w-3 h-3 mr-1" />View source code</a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/portfolio">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
