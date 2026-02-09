"use client"

import { useEffect, useState } from "react"
import { MapPin, Briefcase, Clock, Globe, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import { Button } from "@/components/ui/button"
import { getCareers, type Career } from "@/lib/sanity"

export default function CareersPage() {
  const [roles, setRoles] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getCareers()
        setRoles(data)
      } catch (error) {
        console.error("Error loading careers:", error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        <ScrollProgress />
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Careers at Versal Labs
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
                              size="sm"
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 group"
                              onClick={() => window.open(role.applicationUrl!, "_blank")}
                            >
                              Apply Now
                              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                          )}
                          {!role.applicationUrl && role.applicationEmail && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10"
                              onClick={() => (window.location.href = `mailto:${role.applicationEmail}`)}
                            >
                              Email Your CV
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

