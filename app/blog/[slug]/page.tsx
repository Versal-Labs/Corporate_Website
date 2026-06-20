import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import ShareButton from "@/components/share-button"
import { canonicalBlogSlug, sourceBlogSlug } from "@/lib/blog"
import { getPost, getPosts, type Post } from "@/lib/sanity"
import { absoluteUrl, createPageMetadata, serializeJsonLd, siteConfig } from "@/lib/seo"
import { urlForImage } from "@/sanity/versal-labs/lib/image"

export const revalidate = 3600

type BlogPostProps = { params: Promise<{ slug: string }> }

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <img src={urlForImage(value)?.width(1000).height(560).url() || "/placeholder.svg"} alt={value.alt || "Article illustration"} width={1000} height={560} loading="lazy" className="w-full rounded-xl shadow-lg" />
        {value.alt && <figcaption className="mt-2 text-center text-sm italic text-gray-400">{value.alt}</figcaption>}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }: any) => <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300">{children}</a>,
    code: ({ children }: any) => <code className="rounded bg-gray-800 px-2 py-1 font-mono text-sm text-cyan-400">{children}</code>,
  },
  block: {
    h1: ({ children }: any) => <h2 className="mb-4 mt-8 text-3xl font-bold text-white">{children}</h2>,
    h2: ({ children }: any) => <h2 className="mb-3 mt-8 text-2xl font-bold text-white">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mb-2 mt-6 text-xl font-semibold text-white">{children}</h3>,
    h4: ({ children }: any) => <h4 className="mb-2 mt-4 text-lg font-semibold text-white">{children}</h4>,
    blockquote: ({ children }: any) => <blockquote className="my-6 rounded-r-lg border-l-4 border-cyan-500 bg-gray-800/30 py-4 pl-4 italic text-gray-300">{children}</blockquote>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed text-gray-300">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="mb-4 list-inside list-disc space-y-2 text-gray-300">{children}</ul>,
    number: ({ children }: any) => <ol className="mb-4 list-inside list-decimal space-y-2 text-gray-300">{children}</ol>,
  },
}
export async function generateStaticParams() {
  const posts: Post[] = await getPosts()
  return posts.map((post) => ({ slug: canonicalBlogSlug(post.slug) }))
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post: Post | null = await getPost(sourceBlogSlug(slug))
  if (!post) return {}

  const canonicalSlug = canonicalBlogSlug(post.slug)
  const base = createPageMetadata({
    title: post.title,
    description: post.excerpt || `Read ${post.title} from the Versal Labs software and AI team in Sri Lanka.`,
    path: `/blog/${canonicalSlug}`,
    keywords: post.tags || post.categories?.map((category) => category.title),
    type: "article",
  })
  const image = post.mainImage ? urlForImage(post.mainImage)?.width(1200).height(630).url() : undefined

  return {
    ...base,
    authors: post.author?.name ? [{ name: post.author.name }] : [{ name: "Versal Labs Team" }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : ["Versal Labs Team"],
      images: image ? [{ url: image, alt: post.mainImage?.alt || post.title }] : undefined,
    },
    twitter: {
      ...base.twitter,
      images: image ? [image] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params
  const post: Post | null = await getPost(sourceBlogSlug(slug))
  if (!post) notFound()

  const canonicalSlug = canonicalBlogSlug(post.slug)
  const canonicalUrl = absoluteUrl(`/blog/${canonicalSlug}`)
  const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.width(1200).height(630).url() : undefined
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}/#article`,
    headline: post.title,
    description: post.excerpt,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: { "@type": "Person", name: post.author?.name || "Versal Labs Team" },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: canonicalUrl,
    keywords: post.tags?.join(", "),
    inLanguage: "en-LK",
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <ScrollProgress />
      <Navbar />
      <main>
        <article className="pb-16 pt-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-8 max-w-4xl">
              <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white"><ArrowLeft className="mr-2 h-4 w-4" />Back to Blog</Link>
            </div>
            <header className="mx-auto mb-12 max-w-4xl">
              {post.categories?.length ? <div className="mb-4 flex flex-wrap gap-2">{post.categories.map((category) => <span key={category._id || category.slug} className="flex items-center gap-1 rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400"><Tag className="h-3 w-3" />{category.title}</span>)}</div> : null}
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{post.title}</h1>
              {post.excerpt && <p className="mb-8 text-xl leading-relaxed text-gray-300">{post.excerpt}</p>}
              <div className="mb-8 flex flex-wrap items-center gap-6 text-gray-400">
                {post.author?.name && <span className="flex items-center gap-2"><User className="h-4 w-4" />{post.author.name}</span>}
                {post.publishedAt && <time dateTime={post.publishedAt} className="flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(post.publishedAt).toLocaleDateString("en-LK", { month: "long", day: "numeric", year: "numeric" })}</time>}
                {post.readTime && <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime} min read</span>}
                <ShareButton title={post.title} text={post.excerpt} />
              </div>
              {post.mainImage && <figure className="mb-12 overflow-hidden rounded-xl shadow-2xl"><img src={urlForImage(post.mainImage)?.width(1200).height(630).url() || "/placeholder.svg"} alt={post.mainImage.alt || post.title} width={1200} height={630} className="h-auto w-full object-cover" />{post.mainImage.alt && <figcaption className="mt-2 text-center text-sm italic text-gray-400">{post.mainImage.alt}</figcaption>}</figure>}
            </header>
            <div className="prose prose-lg prose-invert mx-auto max-w-4xl"><PortableText value={post.body} components={portableTextComponents} /></div>
            {post.author?.name && <aside className="mx-auto mt-12 max-w-4xl border-t border-gray-700 pt-8"><h2 className="text-xl font-semibold">About {post.author.name}</h2>{post.author.bio && <div className="mt-3 text-gray-400"><PortableText value={post.author.bio} /></div>}</aside>}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
