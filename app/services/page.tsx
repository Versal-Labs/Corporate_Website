import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import { createPageMetadata, serializeJsonLd, siteConfig } from "@/lib/seo"
import { services } from "@/lib/services"

export const metadata = createPageMetadata({
  title: "Software Development Services in Sri Lanka",
  description:
    "Explore custom software, AI automation, ERP development, cloud and DevOps, and software outsourcing services from Versal Labs in Colombo, Sri Lanka.",
  path: "/services",
  keywords: ["software development services Sri Lanka", "IT company Colombo", "technology consulting Sri Lanka"],
})

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Versal Labs software development services",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.shortName,
    url: `${siteConfig.url}/services/${service.slug}`,
  })),
}
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListSchema) }} />
      <ScrollProgress />
      <Navbar />
      <main>
        <section className="border-b border-gray-800 bg-gradient-to-br from-gray-900 via-blue-950/50 to-purple-950/40 px-4 pb-20 pt-32">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">Engineering from Colombo, Sri Lanka</p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">Software development services built for measurable business progress</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
              From a focused automation project to an enterprise platform, Versal Labs combines product thinking, software engineering, AI, and cloud delivery in one accountable team.
            </p>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.slug} className="rounded-2xl border border-gray-700 bg-gray-800/40 p-8 transition hover:border-cyan-500/60 hover:bg-gray-800/70">
                <p className="text-sm font-medium text-cyan-300">{service.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-bold">{service.shortName}</h2>
                <p className="mt-4 leading-relaxed text-gray-300">{service.summary}</p>
                <ul className="mt-6 space-y-2 text-sm text-gray-300">
                  {service.outcomes.slice(0, 3).map((outcome) => (
                    <li key={outcome} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />{outcome}</li>
                  ))}
                </ul>
                <Link href={`/services/${service.slug}`} className="mt-8 inline-flex items-center font-semibold text-cyan-300 hover:text-cyan-200">
                  Explore {service.shortName}<ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-gray-800 bg-gray-950 px-4 py-16 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold">Not sure which approach fits?</h2>
            <p className="mt-4 text-gray-300">Tell us where your workflow, product, or infrastructure is getting stuck. We will help you define a practical first step.</p>
            <Link href="/#contact" className="mt-7 inline-flex rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white hover:from-cyan-600 hover:to-blue-700">Discuss your project</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
