"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function AnimatedTextSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const shape1Ref = useRef<HTMLDivElement>(null)
  const shape2Ref = useRef<HTMLDivElement>(null)
  const shape3Ref = useRef<HTMLDivElement>(null)
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
    // Set loading state
    setIsLoaded(false)

    const ctx = gsap.context(() => {
      // Kill any existing animations
      gsap.killTweensOf([
        textRef.current,
        subtitleRef.current,
        buttonRef.current,
        shape1Ref.current,
        shape2Ref.current,
        shape3Ref.current,
      ])

      // Set initial states immediately
      gsap.set([textRef.current, subtitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
        visibility: "hidden",
        force3D: true,
      })

      gsap.set([shape1Ref.current, shape2Ref.current, shape3Ref.current], {
        opacity: 0,
        scale: 0.8,
        rotation: 0,
        visibility: "hidden",
        force3D: true,
      })

      // Create main timeline
      const mainTl = gsap.timeline({
        paused: true,
        onComplete: () => setIsLoaded(true),
      })

      // Animate shapes first
      mainTl.to([shape1Ref.current, shape2Ref.current, shape3Ref.current], {
        opacity: 1,
        scale: 1,
        visibility: "visible",
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
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

      // Animate subtitle
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

      // Animate button
      mainTl.to(
        buttonRef.current,
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

      // ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        onEnter: () => mainTl.play(),
        fastScrollEnd: true,
        preventOverlaps: true,
      })

      // Continuous floating animation (separate from main timeline)
      gsap.to(shape1Ref.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      })

      gsap.to(shape2Ref.current, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
        force3D: true,
      })

      gsap.to(shape3Ref.current, {
        y: -20,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
        force3D: true,
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      setIsLoaded(false)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-container flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Animated Background Shapes */}
      <div
        ref={shape1Ref}
        className="gsap-element floating-element absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl opacity-20"
        style={{ transform: "rotate(45deg)" }}
      />
      <div
        ref={shape2Ref}
        className="gsap-element floating-element absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-25"
      />
      <div
        ref={shape3Ref}
        className="gsap-element floating-element absolute bottom-32 left-1/3 w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main Animated Text */}
        <div ref={textRef} className="gsap-element mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
            <span className="block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              Build
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              anything
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="gsap-element text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
        >
          {"{"}
          <span className="text-blue-400 font-mono"> Versal Labs </span>- A wildly innovative software development
          company built for the future
          {"}"}
        </p>

        {/* CTA Button */}
        <div ref={buttonRef} className="gsap-element">
          <Button 
            onClick={() => scrollToSection("services")}
            className="button-hover bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4 rounded-full border-2 border-transparent hover:border-blue-400/30 group"
          >
            Start Building
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full opacity-50 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-pulse" />
      </div>
    </section>
  )
}
