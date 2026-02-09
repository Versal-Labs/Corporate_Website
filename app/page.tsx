"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import AnimatedTextSection from "@/components/animated-text-section"
import ServicesHero from "@/components/services-hero"
import ProductsHero from "@/components/products-hero"
import Portfolio from "@/components/portfolio"
import ProductsSection from "@/components/products-section"
import PortfolioSection from "@/components/portfolio-section"
import AboutHero from "@/components/about-hero"
import ContactHero from "@/components/contact-hero"
import RecentBlogs from "@/components/recent-blogs"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import HashNavigation from "@/components/hash-navigation"
import { usePageTracking } from "@/hooks/use-analytics"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  // Track page views
  usePageTracking()

  useEffect(() => {
    // Prevent any animations until page is fully loaded
    const handleLoad = () => {
      setIsPageLoaded(true)

      // Small delay to ensure everything is rendered
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    // Cleanup function
    return () => {
      window.removeEventListener("load", handleLoad)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Don't render animations until page is loaded
  if (!isPageLoaded) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img src="/logo-icon.svg" alt="Versal Labs" className="w-16 h-16 mx-auto mb-4 animate-pulse" />
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      <ScrollProgress />
      <HashNavigation />
      <Navbar />
      <main>
        <Hero />
        <AnimatedTextSection />
        <ServicesHero />
        <ProductsSection />
        <PortfolioSection />
        <AboutHero />
        <RecentBlogs />
        <ContactHero />
      </main>
      <Footer />
    </div>
  )
}
