import Link from "next/link"
import { ArrowRight, Calendar, Clock, Search, User } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import { getPosts, type Post } from "@/lib/sanity"
import { createPageMetadata, serializeJsonLd, siteConfig } from "@/lib/seo"
import { urlForImage } from "@/sanity/versal-labs/lib/image"
import { canonicalBlogSlug } from "@/lib/blog"

export const revalidate = 3600

export const metadata = createPageMetadata({
  title: "Software, AI & Digital Transformation Insights",
  description: "Practical insights from Versal Labs on custom software, AI automation, ERP systems, cloud engineering, and digital growth.",
  path: "/blog",
  keywords: ["software development blog Sri Lanka", "AI insights Sri Lanka", "digital transformation articles"],
})

type BlogPageProps = { searchParams: Promise<{ q?: string }> }

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts: Post[] = await getPosts()
  const { q = "" } = await searchParams
  const query = q.trim().toLowerCase()
  const filteredPosts = query
    ? posts.filter((post) =>
        [post.title, post.excerpt, ...(post.categories?.map((category) => category.title) || [])]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(query)),
      )
    : posts

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Versal Labs Insights",
    url: `${siteConfig.url}/blog`,
    description: metadata.description,
    hasPart: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteConfig.url}/blog/${canonicalBlogSlug(post.slug)}`,
      datePublished: post.publishedAt,
    })),
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionSchema) }} />
      <ScrollProgress />
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-gray-900 via-cyan-950/30 to-blue-950/40 px-4 pb-16 pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.28em] text-cyan-300">Versal Labs Insights</p>
            <h1 className="text-4xl font-black md:text-6xl">Software, AI and digital transformation insights</h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-300">
              Practical guidance for teams deciding what to build, automate, modernize, and scale.
            </p>
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <form action="/blog" method="get" className="mx-auto mb-12 flex max-w-2xl gap-3" role="search">
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <div className="relative flex-1">
                <Search aria-hidden="true" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input id="blog-search" name="q" defaultValue={q} placeholder="Search software and AI articles" className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-12 pr-4 text-white outline-none focus:border-cyan-500" />
              </div>
              <button type="submit" className="rounded-lg bg-cyan-600 px-5 py-3 font-semibold hover:bg-cyan-500">Search</button>
            </form>

            {filteredPosts.length === 0 ? (
              <div className="py-20 text-center">
                <h2 className="text-2xl font-bold">No matching articles</h2>
                <p className="mt-3 text-gray-400">Try a broader phrase or view all published insights.</p>
                <Link href="/blog" className="mt-5 inline-block text-cyan-400 hover:text-cyan-300">View all articles</Link>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <article key={post._id} className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/40 transition hover:border-cyan-500/60">
                    {post.mainImage && (
                      <Link href={`/blog/${canonicalBlogSlug(post.slug)}`} className="block h-52 overflow-hidden">
                        <img src={urlForImage(post.mainImage)?.width(720).height(420).url() || "/placeholder.svg"} alt={post.mainImage.alt || post.title} width={720} height={420} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                      </Link>
                    )}
                    <div className="p-6">
                      <div className="mb-4 flex flex-wrap gap-3 text-xs text-gray-400">
                        {post.publishedAt && <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(post.publishedAt).toLocaleDateString("en-LK", { year: "numeric", month: "short", day: "numeric" })}</span>}
                        {post.readTime && <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min read</span>}
                        {post.author?.name && <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />{post.author.name}</span>}
                      </div>
                      <h2 className="text-xl font-bold leading-snug"><Link href={`/blog/${canonicalBlogSlug(post.slug)}`} className="hover:text-cyan-300">{post.title}</Link></h2>
                      {post.excerpt && <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-300">{post.excerpt}</p>}
                      <Link href={`/blog/${canonicalBlogSlug(post.slug)}`} className="mt-6 inline-flex items-center font-semibold text-cyan-400 hover:text-cyan-300">Read article<ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
