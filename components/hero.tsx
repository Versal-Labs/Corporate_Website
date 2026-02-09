"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from 'lucide-react'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const sparklesRef = useRef<HTMLDivElement[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: element,
          offsetY: 80,
        },
        ease: "power2.inOut",
      })
    }
  }

  useEffect(() => {
    setIsLoaded(false)

    const ctx = gsap.context(() => {
      const sparkles = sparklesRef.current.filter(Boolean)

      // Kill existing animations
      gsap.killTweensOf([titleRef.current, subtitleRef.current, buttonsRef.current, ...sparkles])

      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], {
        opacity: 0,
        y: 30,
        visibility: "hidden",
        force3D: true,
      })

      gsap.set(sparkles, {
        opacity: 0,
        scale: 0.8,
        visibility: "hidden",
        force3D: true,
      })

      // Create timeline
      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => setIsLoaded(true),
      })

      // Animate sparkles first
      tl.to(sparkles, {
        opacity: 0.6,
        scale: 1,
        visibility: "visible",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        force3D: true,
      })

      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 1,
          ease: "power2.out",
          force3D: true,
        },
        "-=0.6",
      )

      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 0.8,
          ease: "power2.out",
          force3D: true,
        },
        "-=0.7",
      )

      tl.to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
        },
        "-=0.5",
      )

      // Floating animation for sparkles
      sparkles.forEach((sparkle, index) => {
        gsap.to(sparkle, {
          y: -15,
          duration: 2.5 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
          force3D: true,
        })
      })
    }, heroRef)

    return () => {
      ctx.revert()
      setIsLoaded(false)
    }
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="section-container flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="absolute inset-0 bg-[url('/abstract-tech-pattern.png')] bg-no-repeat bg-cover bg-center opacity-10"></div>
      </div>

      {/* Floating Elements */}
      {[
        { top: "20", left: "10", icon: Sparkles, color: "text-blue-400" },
        { top: "40", right: "20", icon: Sparkles, color: "text-purple-400" },
        { bottom: "40", left: "20", icon: Sparkles, color: "text-green-400" },
      ].map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) sparklesRef.current[index] = el
          }}
          className={`gsap-element floating-element absolute ${
            item.top ? `top-${item.top}` : `bottom-${item.bottom}`
          } ${item.left ? `left-${item.left}` : `right-${item.right}`}`}
        >
          <item.icon className={`w-6 h-6 ${item.color} opacity-60`} />
        </div>
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1
          ref={titleRef}
          className="gsap-element text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
        >
          Smart Code.
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Scalable Innovation.
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="gsap-element text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Your future-ready software partner. We craft cutting-edge solutions that transform businesses through custom
          development, AI integration, and scalable cloud platforms.
        </p>

        <div ref={buttonsRef} className="gsap-element flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => scrollToSection("contact")}
            className="action-button bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Talk to Us
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
          <Button
            onClick={() => scrollToSection("portfolio")}
            variant="outline"
            className="action-button border-2 border-gray-600 hover:border-blue-400 hover:bg-blue-400/10 text-lg px-8 py-3 bg-transparent relative overflow-hidden"
          >
            <span className="relative z-10">View Our Work</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
