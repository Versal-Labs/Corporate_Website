"use client"

import { Linkedin, Twitter, Github, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import Link from "next/link"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
          offsetY: 80,
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
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => {
                if (window.location.pathname === "/") {
                  scrollToSection("home")
                } else {
                  window.location.href = "/"
                }
              }}
            >
              <img 
                src="/logo-full.svg" 
                alt="Versal Labs" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Smart Code. Scalable Solutions.
              <br />
              Transforming businesses through innovative technology solutions.
            </p>
            <div className="flex gap-3">
  <a href="https://www.linkedin.com/company/versallabs" target="_blank" rel="noopener noreferrer">
    <Button size="icon" variant="ghost" className="hover:bg-blue-500/10 hover:text-blue-400">
      <Linkedin className="w-4 h-4" />
    </Button>
  </a>
  <a href="https://x.com/Versal_Labs" target="_blank" rel="noopener noreferrer">
    <Button size="icon" variant="ghost" className="hover:bg-blue-500/10 hover:text-blue-400">
      <Twitter className="w-4 h-4" />
    </Button>
  </a>
  <a href="https://github.com/Versal-Labs" target="_blank" rel="noopener noreferrer">
    <Button size="icon" variant="ghost" className="hover:bg-blue-500/10 hover:text-blue-400">
      <Github className="w-4 h-4" />
    </Button>
  </a>
  <a href="mailto:hello@versallabs.lk" target="_blank" rel="noopener noreferrer">
    <Button size="icon" variant="ghost" className="hover:bg-blue-500/10 hover:text-blue-400">
      <Mail className="w-4 h-4" />
    </Button>
  </a>
</div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors text-left">
                  Custom Development
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors text-left">
                  Enterprise Solutions
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors text-left">
                  Cloud & DevOps
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors text-left">
                  AI Integration
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors text-left">
                  IT Consulting
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("portfolio")} className="hover:text-white transition-colors text-left">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors text-left">
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    window.location.href = "/blog"
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="mailto:hello@versallabs.lk">hello@versallabs.lk</a></li>
<li><a href="tel:+94766243587">+94 76 624 3587</a></li>
              <li>
                105/24, Kent Road
                <br />
                Dematagoda, Colombo 09
                <br />
                Sri Lanka
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} Versal Labs. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
