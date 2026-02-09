"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Cookie, Settings, BarChart3, Shield, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CookiePolicy() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([heroRef.current, contentRef.current], {
        opacity: 0,
        y: 30,
      })

      // Animate hero
      gsap.to(heroRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      })

      // Animate content
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ScrollProgress />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-orange-900/20 to-yellow-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center mr-4">
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                Cookie Policy
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Learn about how we use cookies and similar technologies to improve your experience on our website.
            </p>
            <p className="text-sm text-gray-400">Last updated: January 21, 2025</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Cookie className="w-6 h-6 mr-3 text-orange-400" />
                What Are Cookies?
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Cookies are small text files that are stored on your device when you visit our website. They help us
                  provide you with a better experience by remembering your preferences and understanding how you use our
                  site.
                </p>
                <p>
                  We also use similar technologies such as web beacons, pixels, and local storage to collect information
                  about your interactions with our website and services.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Types of Cookies We Use</h2>
              <div className="space-y-6 text-gray-300">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function properly. They enable basic features like
                    page navigation, access to secure areas, and form submissions.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    <strong>Duration:</strong> Session or up to 1 year
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Performance Cookies</h3>
                  <p>
                    These cookies collect information about how visitors use our website, such as which pages are
                    visited most often and if users get error messages.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    <strong>Duration:</strong> Up to 2 years
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Functional Cookies</h3>
                  <p>
                    These cookies remember choices you make to improve your experience, such as your preferred language
                    or region.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    <strong>Duration:</strong> Up to 1 year
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies</h3>
                  <p>
                    These cookies help us understand how our website is performing and how we can improve it by
                    analyzing user behavior and traffic patterns.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    <strong>Duration:</strong> Up to 2 years
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-green-400" />
                Third-Party Cookies
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>We may use third-party services that set their own cookies:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Google Analytics:</strong> To analyze website traffic and user behavior
                  </li>
                  <li>
                    <strong>Google Fonts:</strong> To display custom fonts on our website
                  </li>
                  <li>
                    <strong>Social Media Platforms:</strong> For social sharing functionality
                  </li>
                  <li>
                    <strong>Content Delivery Networks:</strong> To improve website performance
                  </li>
                </ul>
                <p className="mt-4">
                  These third parties have their own privacy policies and cookie practices. We recommend reviewing their
                  policies to understand how they use cookies.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-blue-400" />
                Managing Your Cookie Preferences
              </h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-xl font-semibold text-white">Browser Settings</h3>
                <p>You can control cookies through your browser settings:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Block all cookies</li>
                  <li>Block third-party cookies only</li>
                  <li>Delete existing cookies</li>
                  <li>Set cookies to expire when you close your browser</li>
                  <li>Receive notifications when cookies are set</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-6">Browser-Specific Instructions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Chrome</h4>
                    <p className="text-sm">Settings → Privacy and Security → Cookies and other site data</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Firefox</h4>
                    <p className="text-sm">Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Safari</h4>
                    <p className="text-sm">Preferences → Privacy → Manage Website Data</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Edge</h4>
                    <p className="text-sm">Settings → Cookies and site permissions → Cookies and site data</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-purple-400" />
                Impact of Disabling Cookies
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>While you can disable cookies, please note that this may affect your experience on our website:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Some features may not work properly</li>
                  <li>You may need to re-enter information repeatedly</li>
                  <li>Personalized content and recommendations may not be available</li>
                  <li>Website performance may be slower</li>
                  <li>Some pages may not display correctly</li>
                </ul>
                <p className="mt-4">
                  Essential cookies cannot be disabled as they are necessary for the website to function.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Mobile Devices</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  On mobile devices, you can manage cookies through your browser app settings or device privacy
                  settings:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>iOS:</strong> Settings → Safari → Privacy & Security
                  </li>
                  <li>
                    <strong>Android:</strong> Browser app → Settings → Privacy
                  </li>
                </ul>
                <p className="mt-4">
                  You can also reset your advertising ID or opt out of personalized advertising through your device
                  settings.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Updates to This Policy</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                  operational, legal, or regulatory reasons.
                </p>
                <p>
                  When we make changes, we will update the "Last updated" date at the top of this policy. We encourage
                  you to review this policy periodically to stay informed about our use of cookies.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-3 text-cyan-400" />
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Email</h4>
                    <p>hello@versallabs.lk</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Address</h4>
                    <p>
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
