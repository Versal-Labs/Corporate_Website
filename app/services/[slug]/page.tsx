import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import { createPageMetadata, serializeJsonLd, siteConfig } from "@/lib/seo"
import { getService, services } from "@/lib/services"

type ServicePageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return createPageMetadata({
    title: service.name,
    description: service.description,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  })
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const url = `${siteConfig.url}/services/${service.slug}`
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name: service.shortName,
    serviceType: service.shortName,
    description: service.description,
    url,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: [{ "@type": "Country", name: "Sri Lanka" }, { "@type": "Place", name: "Worldwide" }],
  }
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
      { "@type": "ListItem", position: 3, name: service.shortName, item: url },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <ScrollProgress />
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-gray-900 via-blue-950/50 to-purple-950/40 px-4 pb-20 pt-32">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
              <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span><Link href="/services" className="hover:text-white">Services</Link><span className="mx-2">/</span><span>{service.shortName}</span>
            </nav>
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-cyan-300">{service.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">{service.name}</h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-gray-300">{service.summary}</p>
            <Link href="/#contact" className="mt-8 inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold hover:from-cyan-600 hover:to-blue-700">Talk to our team<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">What we deliver</h2>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {service.capabilities.map((capability) => <li key={capability} className="flex gap-3 rounded-xl border border-gray-700 bg-gray-800/40 p-4 text-gray-200"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />{capability}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Business outcomes</h2>
              <ul className="mt-7 space-y-4">
                {service.outcomes.map((outcome) => <li key={outcome} className="flex gap-3 text-lg leading-relaxed text-gray-300"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-purple-400" />{outcome}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-gray-800 bg-gray-950 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold">A delivery process designed for clarity</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => <article key={step.title} className="rounded-2xl border border-gray-800 bg-gray-900 p-6"><span className="text-sm font-bold text-cyan-400">0{index + 1}</span><h3 className="mt-3 text-xl font-bold">{step.title}</h3><p className="mt-3 leading-relaxed text-gray-400">{step.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold">Technology selected for the problem</h2>
            <p className="mt-4 max-w-3xl text-gray-300">We choose maintainable tools that fit your product, team, security, and operating environment instead of forcing every project into the same stack.</p>
            <div className="mt-7 flex flex-wrap gap-3">{service.technologies.map((technology) => <span key={technology} className="rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-200">{technology}</span>)}</div>
          </div>
        </section>

        <section className="border-t border-gray-800 bg-gray-950 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
            <div className="mt-8 space-y-5">{service.faqs.map((faq) => <details key={faq.question} className="group rounded-xl border border-gray-800 bg-gray-900 p-6"><summary className="cursor-pointer list-none text-lg font-semibold">{faq.question}</summary><p className="mt-4 leading-relaxed text-gray-300">{faq.answer}</p></details>)}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
