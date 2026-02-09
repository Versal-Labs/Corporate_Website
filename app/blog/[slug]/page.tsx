"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import { getPost, type Post } from "@/lib/sanity"
import { urlForImage } from "./../../../sanity/versal-labs/lib/image"
import { PortableText } from "@portabletext/react"
import { usePageTracking } from "@/hooks/use-analytics"

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <img
          src={urlForImage(value)?.width(800).height(400).url() || "/placeholder.svg"}
          alt={value.alt || ""}
          className="w-full rounded-xl shadow-lg"
        />
        {value.alt && <p className="text-center text-sm text-gray-400 mt-2 italic">{value.alt}</p>}
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 underline"
      >
        {children}
      </a>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold mt-4 mb-2 text-white">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-semibold mt-4 mb-2 text-white">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-cyan-500 pl-4 my-6 italic text-gray-300 bg-gray-800/30 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed text-gray-300">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>,
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
    ),
  },
}

export default function BlogPost() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Track page views
  usePageTracking()

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        return
      }

      try {
        const postData = await getPost(slug)
        if (!postData) {
          setError("Post not found")
        } else {
          setPost(postData)
        }
      } catch (error) {
        console.error("Error loading post:", error)
        setError("Failed to load post")
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || "",
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        <ScrollProgress />
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading article...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        <ScrollProgress />
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
              <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been moved.</p>
              <Button
                onClick={() => (window.location.href = "/blog")}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
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

      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/blog")}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto mb-12">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>

            {post.excerpt && <p className="text-xl text-gray-300 mb-8 leading-relaxed">{post.excerpt}</p>}

            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <img
                      src={urlForImage(post.author.image)?.width(40).height(40).url() || "/placeholder.svg"}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                </div>
              )}

              {post.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}

              {post.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              )}

              <Button variant="ghost" size="sm" onClick={handleShare} className="text-gray-400 hover:text-white">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>

            {post.mainImage && (
              <div className="relative rounded-xl overflow-hidden shadow-2xl mb-12">
                <img
                  src={urlForImage(post.mainImage)?.width(1200).height(600).url() || "/placeholder.svg"}
                  alt={post.mainImage.alt || post.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                {post.mainImage.alt && (
                  <p className="text-center text-sm text-gray-400 mt-2 italic">{post.mainImage.alt}</p>
                )}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.author && (
              <div className="mt-12 pt-8 border-t border-gray-700">
                <div className="flex items-start gap-4">
                  {post.author.image && (
                    <img
                      src={urlForImage(post.author.image)?.width(80).height(80).url() || "/placeholder.svg"}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full flex-shrink-0"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About {post.author.name}</h3>
                    {post.author.bio && (
                      <div className="text-gray-400">
                        <PortableText value={post.author.bio} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
