"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Cloud, Cog, Layers, Brain, Users } from 'lucide-react'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    icon: Code,
    title: "Custom Development",
    description: "Tailored solutions built from the ground up",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Layers,
    title: "Enterprise Solutions",
    description: "Robust, scalable applications for large organizations",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Modern infrastructure and deployment practices",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Cog,
    title: "SaaS Platforms",
    description: "Complete software-as-a-service solutions",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Intelligent automation and machine learning",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Users,
    title: "IT Consulting",
    description: "Strategic technology guidance and optimization",
    color: "from-pink-500 to-rose-500",
  },
]

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const shapesRef = useRef<HTMLDivElement[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)
      const shapes = shapesRef.current.filter(Boolean)

      // Kill existing animations
      gsap.killTweensOf([textRef.current, subtitleRef.current, ...cards, ...shapes])

      // Set initial states
      gsap.set([textRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50,
        visibility: "hidden",
        force3D: true,
      })

      gsap.set(cards, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        visibility: "hidden",
        force3D: true,
      })

      gsap.set(shapes, {
        opacity: 0,
        scale: 0.8,
        visibility: "hidden",
        force3D: true,
      })

      // Create main timeline
      const mainTl = gsap.timeline({
        paused: true,
        onComplete: () => setIsLoaded(true),
      })

      // Animate shapes
      mainTl.to(shapes, {
        opacity: 1,
        scale: 1,
        visibility: "visible",
        duration: 1,
        ease: "power2.out",
        stagger: 0.05,
        force3D: true,
      })

      // Animate text
      mainTl.to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 1.2,
          ease: "power2.out",
          force3D: true,
        },
        "-=0.8",
      )

      mainTl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 1,
          ease: "power2.out",
          force3D: true,
        },
        "-=0.9",
      )

      // Animate cards
      mainTl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          visibility: "visible",
          duration: 1,
          ease: "power2.out",
          stagger: 0.05,
          force3D: true,
        },
        "-=0.7",
      )

      // ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        onEnter: () => mainTl.play(),
        fastScrollEnd: true,
        preventOverlaps: true,
      })

      // Floating animations
      shapes.forEach((shape, index) => {
        gsap.to(shape, {
          y: -15 - index * 5,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
          force3D: true,
        })
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      setIsLoaded(false)
    }
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-container flex flex-col justify-center relative bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 py-20"
    >
      {/* Animated Background Shapes */}
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) shapesRef.current[index] = el
          }}
          className={`gsap-element floating-element absolute ${
            index === 0
              ? "top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full"
              : index === 1
                ? "top-1/4 right-20 w-32 h-32 bg-gradient-to-br from-green-400/30 to-blue-500/30"
                : index === 2
                  ? "bottom-1/3 left-1/4 w-36 h-36 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl"
                  : "bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full"
          } opacity-60`}
          style={
            index === 1
              ? { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }
              : index === 2
                ? { transform: "rotate(45deg)" }
                : {}
          }
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Text */}
        <div className="text-center mb-16">
          <div ref={textRef} className="gsap-element mb-8">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-4">
              <span className="block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                We
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                deliver
              </span>
            </h2>
          </div>

          <p
            ref={subtitleRef}
            className="gsap-element text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed"
          >
            {"{"}
            <span className="text-blue-400 font-mono"> Comprehensive solutions </span>- From custom development to AI
            integration, we build the future
            {"}"}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className="gsap-element service-card group relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 cursor-pointer"
              >
                <div className="relative z-10">
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center icon-bounce shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
