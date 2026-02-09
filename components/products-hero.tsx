"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Star, Leaf } from 'lucide-react'
import { Button } from "@/components/ui/button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProductsHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const shape1Ref = useRef<HTMLDivElement>(null)
  const shape2Ref = useRef<HTMLDivElement>(null)
  const shape3Ref = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([textRef.current, subtitleRef.current, productRef.current], {
        opacity: 0,
        y: 100,
        visibility: "hidden",
        force3D: true,
      })

      gsap.set([shape1Ref.current, shape2Ref.current, shape3Ref.current], {
        opacity: 0,
        scale: 0,
        rotation: -45,
        visibility: "hidden",
        force3D: true,
      })

      // Create timeline
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => setIsLoaded(true),
      })

      // Animate shapes
      tl.to([shape1Ref.current, shape2Ref.current, shape3Ref.current], {
        opacity: 1,
        scale: 1,
        rotation: 0,
        visibility: "visible",
        duration: 1.5,
        ease: "back.out(1.7)",
        stagger: 0.2,
        force3D: true,
      })

      // Animate text
      tl.to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 2,
          ease: "power3.out",
          force3D: true,
        },
        "-=1",
      )

      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 1.5,
          ease: "power3.out",
          force3D: true,
        },
        "-=1.5",
      )

      tl.to(
        productRef.current,
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 1.8,
          ease: "power3.out",
          force3D: true,
        },
        "-=1",
      )

      // ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => tl.play(),
        fastScrollEnd: true,
        preventOverlaps: true,
      })

      // Floating animations
      gsap.to(shape1Ref.current, {
        y: -25,
        rotation: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      })

      gsap.to(shape2Ref.current, {
        y: -20,
        rotation: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
        force3D: true,
      })

      gsap.to(shape3Ref.current, {
        y: -30,
        rotation: 15,
        duration: 4.5,
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
      id="products"
      ref={sectionRef}
      className="section-container flex flex-col justify-center relative bg-gradient-to-br from-gray-900 via-green-900/20 to-blue-900/20 py-20"
    >
      {/* Animated Background Shapes */}
      <div
        ref={shape1Ref}
        className="gsap-element floating-element absolute top-20 right-20 w-36 h-36 bg-gradient-to-br from-green-500/30 to-teal-500/30 rounded-full opacity-60"
      />
      <div
        ref={shape2Ref}
        className="gsap-element floating-element absolute bottom-1/4 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-green-500/30 rounded-3xl opacity-50"
        style={{ transform: "rotate(45deg)" }}
      />
      <div
        ref={shape3Ref}
        className="gsap-element floating-element absolute top-1/3 left-1/3 w-28 h-28 bg-gradient-to-br from-teal-500/30 to-blue-500/30 opacity-40"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Text */}
        <div className="text-center mb-16">
          <div ref={textRef} className="gsap-element mb-8">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-4">
              <span className="block bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
                We
              </span>
              <span className="block bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent">
                create
              </span>
            </h2>
          </div>

          <p ref={subtitleRef} className="gsap-element text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed">
            {"{"}
            <span className="text-green-400 font-mono"> Innovative products </span>- Solutions that make a real
            difference in people's lives
            {"}"}
          </p>
        </div>

        {/* Featured Product */}
        <div ref={productRef} className="gsap-element max-w-6xl mx-auto">
          <div className="running-border product-card cursor-pointer">
            <div className="running-border-content p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Product Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-xl" />
                  <img
                    src="/ceylon-wellness-app.png"
                    alt="Ceylon Wellness App"
                    className="product-card-image relative w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="status-badge absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium inline-block w-auto">
                    Live
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center icon-bounce">
                      <Leaf className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                        Ceylon Wellness
                      </h3>
                      <p className="text-gray-400">Mindfulness & Well-being Platform</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    A modern mobile app promoting mindfulness and holistic well-being for Sri Lankans. Features guided
                    meditations, health tracking, Ayurvedic tips, and community support in local languages.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {["Meditation", "Health Tracking", "Ayurvedic Guidance", "Sinhala & Tamil Support"].map((feature) => (
                      <span
                        key={feature}
                        className="px-4 py-2 bg-gray-800/50 rounded-full text-sm text-gray-300 border border-gray-700/50"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button className="action-button bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 group relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        Learn More
                        <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="action-button border-gray-600 hover:border-green-400 hover:bg-green-400/10 bg-transparent group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        <Star className="mr-2 w-4 h-4 group-hover:text-green-400 transition-colors duration-300" />
                        Try Demo
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-2/3 right-20 w-3 h-3 bg-teal-400 rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-pulse" />
      </div>
    </section>
  )
}
