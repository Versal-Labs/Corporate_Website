"use client"

import type React from "react"

import { useEffect, useRef, useActionState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "@/app/actions/contact"
import { useFormTracking } from "@/hooks/use-analytics"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const initialState = {
  success: false,
  message: "",
  errors: {},
}

export default function ContactHero() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const { trackFormStart, trackFormSubmit, trackFormError } = useFormTracking()

  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const shape1Ref = useRef<HTMLDivElement>(null)
  const shape2Ref = useRef<HTMLDivElement>(null)
  const shape3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([textRef.current, subtitleRef.current, formRef.current, infoRef.current], {
        opacity: 0,
        y: 100,
      })

      gsap.set([shape1Ref.current, shape2Ref.current, shape3Ref.current], {
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
      tl.to([shape1Ref.current, shape2Ref.current, shape3Ref.current], {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        stagger: 0.2,
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
        "-=1",
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

      // Animate form and info
      tl.to(
        [formRef.current, infoRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=1",
      )

      // Floating animations
      gsap.to(shape1Ref.current, {
        y: -25,
        rotation: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(shape2Ref.current, {
        y: -20,
        rotation: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      })

      gsap.to(shape3Ref.current, {
        y: -30,
        rotation: 15,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Track form interactions
  useEffect(() => {
    if (state.success) {
      trackFormSubmit("contact_form", true)
    } else if (state.message && !state.success) {
      trackFormError("contact_form", state.message)
    }
  }, [state, trackFormSubmit, trackFormError])

  const handleFormFocus = () => {
    trackFormStart("contact_form")
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-cyan-900/20 to-blue-900/20 py-20"
    >
      {/* Animated Background Shapes */}
      <div
        ref={shape1Ref}
        className="absolute top-20 left-20 w-36 h-36 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full opacity-60"
      />
      <div
        ref={shape2Ref}
        className="absolute bottom-1/4 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-3xl opacity-50"
        style={{ transform: "rotate(45deg)" }}
      />
      <div
        ref={shape3Ref}
        className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 opacity-40"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Text */}
        <div className="text-center mb-16">
          <div ref={textRef} className="mb-8">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-4">
              <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                Let's
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                connect
              </span>
            </h2>
          </div>

          <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed">
            {"{"}
            <span className="text-cyan-400 font-mono"> Ready to transform </span>- Your business with cutting-edge
            technology? Let's discuss your vision
            {"}"}
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div
            ref={formRef}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-gray-500/50 transition-all duration-700 hover:scale-[1.02] group"
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold group-hover:text-cyan-400 transition-colors duration-300">
                Send us a message
              </h3>
            </div>

            {/* Success/Error Messages */}
            {state.message && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                state.success 
                  ? "bg-green-500/10 border border-green-500/20 text-green-400"
                    : "bg-red-500/10 border border-red-500/20 text-red-400"
                }`}
              >
                {state.success ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm">{state.message}</p>
              </div>
            )}

            <form action={formAction} className="space-y-6" onFocus={handleFormFocus}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    disabled={isPending}
                    className={`form-input bg-gray-800/50 border-gray-600 focus:border-cyan-400 focus:ring-cyan-400 transition-all duration-500 rounded-xl ${
                      state.errors?.name ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="Your full name"
                  />
                  {state.errors?.name && <p className="text-red-400 text-xs mt-1">{state.errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isPending}
                    className={`form-input bg-gray-800/50 border-gray-600 focus:border-cyan-400 focus:ring-cyan-400 transition-all duration-500 rounded-xl ${
                      state.errors?.email ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="your@email.com"
                  />
                  {state.errors?.email && <p className="text-red-400 text-xs mt-1">{state.errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-300">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  disabled={isPending}
                  className={`form-input bg-gray-800/50 border-gray-600 focus:border-cyan-400 focus:ring-cyan-400 transition-all duration-500 rounded-xl ${
                    state.errors?.company ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  placeholder="Your company name"
                />
                {state.errors?.company && <p className="text-red-400 text-xs mt-1">{state.errors.company}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  disabled={isPending}
                  className={`form-input bg-gray-800/50 border-gray-600 focus:border-cyan-400 focus:ring-cyan-400 resize-none transition-all duration-500 rounded-xl ${
                    state.errors?.message ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  placeholder="Tell us about your project..."
                />
                {state.errors?.message && <p className="text-red-400 text-xs mt-1">{state.errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="action-button w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 group rounded-xl py-4 text-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8">
            {/* Contact Details */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-gray-500/50 transition-all duration-700 hover:scale-[1.02] group">
              <h3 className="text-3xl font-bold mb-8 group-hover:text-cyan-400 transition-colors duration-300">
                Get in touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">Email</h4>
                    <a href="mailto:mohamed.sakeel@versallabs.lk">mohamed.sakeel@versallabs.lk</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">Phone</h4>
                    <a href="tel:+94766243587">+94 76 624 3587</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">Address</h4>
                    <p className="text-gray-400">
                      105/24, Kent Road
                <br />
                Dematagoda, Colombo 09
                <br />
                Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-gray-500/50 transition-all duration-700 hover:scale-[1.02] group">
              <h3 className="text-2xl font-bold mb-6 group-hover:text-cyan-400 transition-colors duration-300">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
  href="https://www.linkedin.com/company/versallabs"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    size="icon"
    variant="outline"
    className="w-14 h-14 border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10 group bg-transparent transition-all duration-500 rounded-xl"
  >
    <Linkedin className="w-6 h-6 group-hover:text-cyan-400 transition-colors duration-300" />
  </Button>
</a>

<a
  href="https://twitter.com/versallabs"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    size="icon"
    variant="outline"
    className="w-14 h-14 border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10 group bg-transparent transition-all duration-500 rounded-xl"
  >
    <Twitter className="w-6 h-6 group-hover:text-cyan-400 transition-colors duration-300" />
  </Button>
</a>

<a
  href="https://github.com/Versal-Labs"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    size="icon"
    variant="outline"
    className="w-14 h-14 border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10 group bg-transparent transition-all duration-500 rounded-xl"
  >
    <Github className="w-6 h-6 group-hover:text-cyan-400 transition-colors duration-300" />
  </Button>
</a>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-teal-400 rounded-full opacity-60 animate-pulse" />
      </div>
    </section>
  )
}
