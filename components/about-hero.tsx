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
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our priority. We build lasting partnerships through exceptional service.",
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We maintain the highest standards in code quality, security, and performance.",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "From Sri Lanka to the world, we create solutions that make a difference.",
    color: "from-purple-500 to-pink-500",
  },
]

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement[]>([])
  const shape1Ref = useRef<HTMLDivElement>(null)
  const shape2Ref = useRef<HTMLDivElement>(null)
  const shape3Ref = useRef<HTMLDivElement>(null)
  const shape4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const valueCards = valuesRef.current.filter(Boolean)

      // Set initial states
      gsap.set([textRef.current, subtitleRef.current, missionRef.current, visionRef.current], {
        opacity: 0,
        y: 100,
      })

      gsap.set(valueCards, {
        opacity: 0,
        y: 50,
        scale: 0.9,
      })

      gsap.set([shape1Ref.current, shape2Ref.current, shape3Ref.current, shape4Ref.current], {
        opacity: 0,
        scale: 0,
        rotation: -45,
      })

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      })

      // Animate shapes
      tl.to([shape1Ref.current, shape2Ref.current, shape3Ref.current, shape4Ref.current], {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        stagger: 0.1,
      })

      // Animate text
      tl.to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
        },
        "-=1.2",
      )

      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1.5",
      )

      // Animate mission and vision
      tl.to(
        [missionRef.current, visionRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=1",
      )

      // Animate values
      tl.to(
        valueCards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.8",
      )

      // Floating animations
      gsap.to(shape1Ref.current, {
        y: -30,
        rotation: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(shape2Ref.current, {
        y: -20,
        rotation: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      })

      gsap.to(shape3Ref.current, {
        y: -25,
        rotation: 20,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      })

      gsap.to(shape4Ref.current, {
        y: -35,
        rotation: -15,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-orange-900/20 to-red-900/20 py-20"
    >
      {/* Animated Background Shapes */}
      <div
        ref={shape1Ref}
        className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-full opacity-60"
      />
      <div
        ref={shape2Ref}
        className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-500/30 opacity-50"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />
      <div
        ref={shape3Ref}
        className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl opacity-40"
        style={{ transform: "rotate(45deg)" }}
      />
      <div
        ref={shape4Ref}
        className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-green-500/30 to-teal-500/30 rounded-full opacity-50"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Text */}
        <div className="text-center mb-16">
          <div ref={textRef} className="mb-8">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-4">
              <span className="block bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                Who
              </span>
              <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                we are
              </span>
            </h2>
          </div>

          <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed">
            {"{"}
            <span className="text-orange-400 font-mono"> Versal Labs </span>- Passionate innovators building the future
            of technology in Sri Lanka
            {"}"}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div
            ref={missionRef}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-gray-500/50 transition-all duration-700 hover:scale-105 group"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold group-hover:text-orange-400 transition-colors duration-300">
                Our Mission
              </h3>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              To empower businesses with innovative software solutions that drive growth, efficiency, and digital
              transformation. We bridge the gap between complex technology and practical business needs.
            </p>
          </div>

          <div
            ref={visionRef}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-gray-500/50 transition-all duration-700 hover:scale-105 group"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold group-hover:text-blue-400 transition-colors duration-300">
                Our Vision
              </h3>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              To be the leading software development partner in South Asia, recognized for our innovation, quality, and
              commitment to client success in the global digital economy.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={value.title}
                  ref={(el) => {
                    if (el) valuesRef.current[index] = el
                  }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:border-gray-500/50 transition-all duration-700 hover:scale-105 group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-red-400 rounded-full opacity-40 animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-pulse delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-pulse delay-500" />
      </div>
    </section>
  )
}
