"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ["home", "services", "products", "portfolio", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "home" },
    { name: "Services", href: "services" },
    { name: "Products", href: "products" },
    { name: "Portfolio", href: "portfolio" },
    { name: "About", href: "about" },
    { name: "Contact", href: "contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the home page
    const isHomePage = window.location.pathname === "/"

    if (isHomePage) {
      // Same page scrolling
    const element = document.getElementById(sectionId)
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: element,
          offsetY: 80, // Account for navbar height
        },
        ease: "power2.inOut",
      })
      }
    } else {
      // Navigate to home page with section hash
      if (sectionId === "home") {
        window.location.href = "/"
      } else {
        window.location.href = `/#${sectionId}`
      }
    }
    setIsOpen(false) // Close mobile menu
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/95 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer magnetic-btn"
            onClick={() => {
              if (window.location.pathname === "/") {
                scrollToSection("home")
              } else {
                window.location.href = "/"
              }
            }}
          >
            <img src="/logo-full.svg" alt="Versal Labs" className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform relative magnetic-btn ${
                  activeSection === item.href ? "text-white" : ""
                }`}
              >
                {item.name}
                {activeSection === item.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                )}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("contact")}
              className="get-started-btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="lg:hidden magnetic-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 bg-gray-900/95 backdrop-blur-md rounded-lg border border-gray-700/50">
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left text-gray-300 hover:text-white transition-colors duration-300 py-2 magnetic-btn ${
                    activeSection === item.href ? "text-white border-l-2 border-blue-500 pl-3" : ""
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection("contact")}
                className="get-started-btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-fit mt-2 relative overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
