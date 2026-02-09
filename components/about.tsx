"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Target, Eye, Users, Award, Globe } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We embrace cutting-edge technologies to deliver solutions that push boundaries.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our priority. We build lasting partnerships through exceptional service.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We maintain the highest standards in code quality, security, and performance.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "From Sri Lanka to the world, we create solutions that make a difference.",
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const valuesRef = useRef<HTMLDivElement[]>([])
  const missionRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const valueCards = valuesRef.current.filter(Boolean)

      // Set initial states
      gsap.set([missionRef.current, visionRef.current], { opacity: 0, y: 30 })
      gsap.set(valueCards, { opacity: 0, y: 30, scale: 0.95 })

      // Animate mission and vision
      gsap.to([missionRef.current, visionRef.current], {
        opacity: 1,
        y: 0,
        duration: 1.8,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none none",
        },
      })

      // Animate values
      valueCards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          delay: index * 0.2,
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
    <section id="about" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        {/* Mission & Vision */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            About Versal Labs
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div ref={missionRef} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              <div className="flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-orange-400 mr-3" />
                <h3 className="text-2xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                To empower businesses with innovative software solutions that drive growth, efficiency, and digital
                transformation. We bridge the gap between complex technology and practical business needs.
              </p>
            </div>

            <div ref={visionRef} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              <div className="flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                To be the leading software development partner in South Asia, recognized for our innovation, quality,
                and commitment to client success in the global digital economy.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={value.title}
                  ref={(el) => {
                    if (el) valuesRef.current[index] = el
                  }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-orange-500/50 transition-all duration-500 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
