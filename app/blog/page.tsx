"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, User, Search, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import { getPosts, type Post } from "@/lib/sanity"
import { urlForImage } from "./../../sanity/versal-labs/lib/image"
import { usePageTracking } from "@/hooks/use-analytics"

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Track page views
  usePageTracking()

  useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getPosts()
        setPosts(allPosts)
        setFilteredPosts(allPosts)
      } catch (error) {
        console.error("Error loading posts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.categories?.some((cat) => cat.slug === selectedCategory))
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedCategory])

  // Get unique categories
  const categories = Array.from(new Set(posts.flatMap((post) => post.categories?.map((cat) => cat.slug) || [])))
    .map((slug) => {
      const category = posts.flatMap((post) => post.categories || []).find((cat) => cat.slug === slug)
      return category
    })
    .filter(Boolean)

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        <ScrollProgress />
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Our Blog
              </h1>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ScrollProgress />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-cyan-900/20 to-blue-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Our Blog
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Insights, tutorials, and thoughts on technology, innovation, and the future of software development
            </p>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-600 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
                />
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className={
                    selectedCategory === null
                      ? "bg-cyan-500 hover:bg-cyan-600"
                      : "border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                  }
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category._id}
                    variant={selectedCategory === category?.slug?.current ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category?.slug?.current || null)}
                    className={
                      selectedCategory === category?.slug?.current
                        ? "bg-cyan-500 hover:bg-cyan-600"
                        : "border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                    }
                  >
                    {category?.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">
                {searchTerm || selectedCategory
                  ? "No articles found matching your criteria."
                  : "No blog posts available yet. Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 group cursor-pointer"
                  onClick={() => {
                    const href = `/blog/${(post as any).slug}`
                    window.location.href = href
                  }}
                >
                  {post.mainImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={urlForImage(post.mainImage)?.width(400).height(200).url() || "/placeholder.svg"}
                        alt={post.mainImage.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {post.featured && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/90 text-white text-xs font-medium rounded-full">
                          Featured
                        </div>
                      )}
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

                    <h2 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    )}

                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.slice(0, 2).map((category) => (
                          <span
                            key={category._id}
                            className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full flex items-center gap-1"
                          >
                            <Tag className="w-2 h-2" />
                            {category.title}
                          </span>
                        ))}
                        {post.categories.length > 2 && (
                          <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                            +{post.categories.length - 2} more
                          </span>
                        )}
                      </div>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-4 border-t border-gray-700">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More Button (for future pagination) */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-400">
                Showing {filteredPosts.length} of {posts.length} articles
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
