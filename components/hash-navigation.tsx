"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

export default function HashNavigation() {
  useEffect(() => {
    // Handle hash navigation when component mounts
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace("#", "")

      if (hash) {
        // Wait a bit for the page to load and animations to settle
        setTimeout(() => {
          const element = document.getElementById(hash)
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
        }, 1500) // Increased delay to ensure page is fully loaded
      }
    }

    // Handle initial hash on page load
    handleHashNavigation()

    // Handle hash changes (back/forward navigation)
    const handleHashChange = () => {
      handleHashNavigation()
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return null // This component doesn't render anything
}
