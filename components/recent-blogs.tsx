"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/sanity"
import { urlForImage } from "../sanity/versal-labs/lib/image"
import Link from "next/link"
import { canonicalBlogSlug } from "@/lib/blog"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function RecentBlogs({ initialPosts }: { initialPosts: Post[] }) {
  const posts = initialPosts
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLAnchorElement[]>([])

  useEffect(() => {
    if (posts.length === 0) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)

      // Set initial states
      gsap.set(cards, {
        opacity: 0,
        y: 30,
        scale: 0.95,
      })

      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none none",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [posts])

  if (posts.length === 0) {
    return null // Don't show section if no posts
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with our latest thoughts on technology, innovation, and industry trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post._id}
              href={`/blog/${canonicalBlogSlug(post.slug)}`}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 group cursor-pointer"
            >
              {post.mainImage && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={urlForImage(post.mainImage)?.width(400).height(200).url() || "/placeholder.svg"}
                    alt={post.mainImage.alt || post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  {post.publishedAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  )}
                  {post.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min read
                    </div>
                  )}
                  {post.author && (
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author.name}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                )}

                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.slice(0, 2).map((category) => (
                      <span
                        key={category._id}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <span className="text-sm text-gray-400">Read more</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
