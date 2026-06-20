"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Clock, DollarSign, Coffee, Laptop, Heart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const jobs = [
  {
    title: "Senior Full Stack Developer",
    location: "Colombo, Sri Lanka",
    type: "Full-time",
    salary: "LKR 150,000 - 250,000",
    description:
      "Join our core development team to build scalable web applications using React, Node.js, and cloud technologies.",
    requirements: ["5+ years experience", "React/Node.js", "Cloud platforms", "Team leadership"],
  },
  {
    title: "AI/ML Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "LKR 200,000 - 300,000",
    description:
      "Develop and deploy machine learning models and AI solutions for our clients across various industries.",
    requirements: ["Python/TensorFlow", "ML algorithms", "Data science", "API development"],
  },
  {
    title: "UI/UX Designer",
    location: "Colombo, Sri Lanka",
    type: "Full-time",
    salary: "LKR 100,000 - 180,000",
    description:
      "Create beautiful, user-centered designs for web and mobile applications with a focus on modern aesthetics.",
    requirements: ["Figma/Adobe CC", "User research", "Prototyping", "Design systems"],
  },
  {
    title: "DevOps Engineer",
    location: "Hybrid",
    type: "Full-time",
    salary: "LKR 180,000 - 280,000",
    description: "Build and maintain CI/CD pipelines, cloud infrastructure, and ensure scalable, secure deployments.",
    requirements: ["AWS/Azure", "Docker/Kubernetes", "CI/CD", "Infrastructure as Code"],
  },
]

const benefits = [
  {
    icon: Laptop,
    title: "Latest Tech",
    description: "MacBook Pro and latest development tools",
  },
  {
    icon: Coffee,
    title: "Flexible Hours",
    description: "Work-life balance with flexible scheduling",
  },
  {
    icon: Heart,
    title: "Health Coverage",
    description: "Comprehensive health and wellness benefits",
  },
  {
    icon: Zap,
    title: "Growth Opportunities",
    description: "Continuous learning and career advancement",
  },
]

export default function Careers() {
  const sectionRef = useRef<HTMLElement>(null)
  const jobsRef = useRef<HTMLDivElement[]>([])
  const benefitsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const jobCards = jobsRef.current.filter(Boolean)
    const benefitCards = benefitsRef.current.filter(Boolean)

    // Set initial states
    gsap.set(jobCards, { opacity: 0, x: 0, y: 30 })
    gsap.set(benefitCards, { opacity: 0, y: 20 })

    // Animate job cards
    jobCards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
        },
      })
    })

    // Animate benefits
    benefitCards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
        },
      })
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const allCards = [...jobCards, ...benefitCards]
        if (trigger.trigger && (allCards as Element[]).includes(trigger.trigger)) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section id="careers" ref={sectionRef} className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Be part of a dynamic team that's shaping the future of technology in Sri Lanka and beyond
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Work With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={benefit.title}
                  ref={(el) => {
                    if (el) benefitsRef.current[index] = el
                  }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-green-500/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Job Openings */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Current Openings</h3>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div
                key={job.title}
                ref={(el) => {
                  if (el) jobsRef.current[index] = el
                }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req) => (
                        <span
                          key={req}
                          className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 border border-gray-700"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300">
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 hover:border-green-400 hover:bg-green-400/10 bg-transparent"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
