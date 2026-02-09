"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial state
    gsap.set(contentRef.current, {
      opacity: 0,
      y: 20,
    })

    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 25%",
        scrub: false,
        toggleActions: "play none none none",
      },
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <div ref={contentRef} className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            As a growing company, we're building our portfolio with innovative solutions. Stay tuned for exciting
            projects coming soon!
          </p>
        </div>
      </div>
    </section>
  )
}
