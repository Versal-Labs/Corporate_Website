import { MapPin, Briefcase, Clock, Globe, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import { Button } from "@/components/ui/button"
import { getCareers, type Career } from "@/lib/sanity"
import { createPageMetadata, serializeJsonLd, siteConfig } from "@/lib/seo"

export const revalidate = 1800

export const metadata = createPageMetadata({
  title: "Software & AI Careers in Colombo, Sri Lanka",
  description: "Explore software engineering, AI, design, and cloud career opportunities at Versal Labs in Colombo, Sri Lanka.",
  path: "/careers",
  keywords: ["software jobs Colombo", "software engineering careers Sri Lanka", "AI jobs Sri Lanka"],
})

export default async function CareersPage() {
  const roles: Career[] = await getCareers()
  const jobPostingSchemas = roles.map((role) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.summary || `${role.title} opportunity at Versal Labs in Colombo, Sri Lanka.`,
    datePosted: role.postedAt,
    validThrough: role.closingDate,
    employmentType: role.employmentType?.replaceAll("-", "_").toUpperCase(),
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}/logo-full.svg`,
    },
    ...(role.remoteOption === "remote"
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: { "@type": "Country", name: "Sri Lanka" },
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: { "@type": "PostalAddress", ...siteConfig.address },
          },
        }),
  }))

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {jobPostingSchemas.map((schema, index) => (
        <script key={roles[index]._id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-cyan-900/20 to-blue-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Join Versal Labs
            </h1>
            <p className="text-xl text-gray-300">
              Help us build modern, scalable software products for ambitious teams across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {roles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">
                We don&apos;t have any open roles right now, but we&apos;re always happy to hear from great people. Reach out
                via{" "}
                <a href="mailto:hello@versallabs.lk" className="text-cyan-400 hover:text-cyan-300 underline">
                  hello@versallabs.lk
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-6">
              {roles.map((role) => {
                const workArrangementLabel =
                  role.remoteOption === "remote"
                    ? "Remote"
                    : role.remoteOption === "hybrid"
                      ? "Hybrid"
                      : role.remoteOption === "onsite"
                        ? "On-site"
                        : undefined

                return (
                  <article
                    key={role._id}
                    className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 md:p-8 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-semibold">{role.title}</h2>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-300">
                          {role.department && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/40">
                              <Briefcase className="w-3 h-3" />
                              {role.department.charAt(0).toUpperCase() + role.department.slice(1).replace("-", " ")}
                            </span>
                          )}
                          {role.employmentType && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/40">
                              <Clock className="w-3 h-3" />
                              {role.employmentType
                                .split("-")
                                .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
                                .join(" ")}
                            </span>
                          )}
                          {role.location && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800 text-gray-200 border border-gray-700">
                              <MapPin className="w-3 h-3" />
                              {role.location}
                            </span>
                          )}
                          {workArrangementLabel && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
                              <Globe className="w-3 h-3" />
                              {workArrangementLabel}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-3">
                        {role.salaryRange && (role.salaryRange.min || role.salaryRange.max) && (
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-gray-100">Salary:</span>{" "}
                            {role.salaryRange.currency || ""}{" "}
                            {role.salaryRange.min && role.salaryRange.max
                              ? `${role.salaryRange.min.toLocaleString()} - ${role.salaryRange.max.toLocaleString()}`
                              : role.salaryRange.min
                                ? `${role.salaryRange.min.toLocaleString()}+`
                                : role.salaryRange.max
                                  ? `Up to ${role.salaryRange.max.toLocaleString()}`
                                  : ""}
                            {role.salaryRange.period === "month"
                              ? " / month"
                              : role.salaryRange.period === "year"
                                ? " / year"
                                : ""}
                          </p>
                        )}
                        <div className="flex gap-3">
                          {role.applicationUrl && (
                            <Button
                              asChild
                              size="sm"
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 group"
                            >
                              <a href={role.applicationUrl} target="_blank" rel="noopener noreferrer">
                                Apply Now
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                              </a>
                            </Button>
                          )}
                          {!role.applicationUrl && role.applicationEmail && (
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10"
                            >
                              <a href={`mailto:${role.applicationEmail}`}>Email Your CV</a>
                            </Button>
                          )}
                        </div>
                        {role.closingDate && (
                          <p className="text-xs text-gray-400">
                            Applications close on{" "}
                            {new Date(role.closingDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </div>

                    {role.summary && (
                      <p className="mt-4 text-sm md:text-base text-gray-300 leading-relaxed">{role.summary}</p>
                    )}

                    {role.requirements && role.requirements.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-200 mb-2">Requirements</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                          {role.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

