"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Cloud, Cog, Layers, Brain, Users } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    icon: Code,
    title: "Custom Software Development",
    description:
      "Tailored solutions built from the ground up to meet your unique business requirements and scale with your growth.",
  },
  {
    icon: Layers,
    title: "Enterprise Solutions",
    description:
      "Robust, scalable applications designed for large organizations with complex workflows and integration needs.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Modern cloud infrastructure, CI/CD pipelines, and DevOps practices to accelerate your development lifecycle.",
  },
  {
    icon: Cog,
    title: "SaaS Platforms",
    description:
      "Complete software-as-a-service solutions with multi-tenancy, subscription management, and scalable architecture.",
  },
  {
    icon: Brain,
    title: "AI Integration & Automation",
    description:
      "We integrate AI into your workflows—chatbots, recommendation engines, OCR, NLP, forecasting models, and more—tailored to your business needs.",
  },
  {
    icon: Users,
    title: "IT Consulting",
    description:
      "Strategic technology guidance to help you make informed decisions and optimize your digital transformation journey.",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)

      // Set initial state with better values
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
          duration: 1.8,
          delay: index * 0.15,
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
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to accelerate your business growth and digital transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 group cursor-pointer"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
