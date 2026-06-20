"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import AnimatedTextSection from "@/components/animated-text-section"
import ServicesHero from "@/components/services-hero"
import ProductsSection from "@/components/products-section"
import PortfolioSection from "@/components/portfolio-section"
import AboutHero from "@/components/about-hero"
import ContactHero from "@/components/contact-hero"
import RecentBlogs from "@/components/recent-blogs"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import HashNavigation from "@/components/hash-navigation"
import { usePageTracking } from "@/hooks/use-analytics"
import type { PortfolioItem, Post, Product } from "@/lib/sanity"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type HomePageProps = {
  recentPosts: Post[]
  featuredProducts: Product[]
  featuredPortfolio: PortfolioItem[]
}

export default function HomePage({ recentPosts, featuredProducts, featuredPortfolio }: HomePageProps) {
  usePageTracking()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState === "complete") refresh()
    else window.addEventListener("load", refresh, { once: true })

    return () => {
      window.removeEventListener("load", refresh)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      <ScrollProgress />
      <HashNavigation />
      <Navbar />
      <main>
        <Hero />
        <AnimatedTextSection />
        <ServicesHero />
        <ProductsSection initialProducts={featuredProducts} />
        <PortfolioSection initialItems={featuredPortfolio} />
        <AboutHero />
        <RecentBlogs initialPosts={recentPosts} />
        <ContactHero />
      </main>
      <Footer />
    </div>
  )
}
