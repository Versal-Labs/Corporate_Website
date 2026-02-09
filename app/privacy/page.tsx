"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Eye, Lock, Database, Mail } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function PrivacyPolicy() {
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
      <section ref={heroRef} className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                <Eye className="w-6 h-6 mr-3 text-blue-400" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                <p>We may collect the following personal information when you interact with our services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company name and job title</li>
                  <li>Project requirements and business information</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-6">Technical Information</h3>
                <p>We automatically collect certain technical information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP address and browser information</li>
                  <li>Device type and operating system</li>
                  <li>Website usage patterns and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Database className="w-6 h-6 mr-3 text-green-400" />
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Service Delivery:</strong> To provide software development services and support
                  </li>
                  <li>
                    <strong>Communication:</strong> To respond to inquiries and provide project updates
                  </li>
                  <li>
                    <strong>Improvement:</strong> To enhance our services and website functionality
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> To comply with applicable laws and regulations
                  </li>
                  <li>
                    <strong>Marketing:</strong> To send relevant updates about our services (with your consent)
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-3 text-purple-400" />
                Data Protection & Security
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure hosting infrastructure</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="mt-4">
                  While we strive to protect your information, no method of transmission over the internet is 100%
                  secure. We cannot guarantee absolute security but are committed to protecting your data.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Information Sharing</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We do not sell, trade, or rent your personal information. We may share information in these limited
                  circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Service Providers:</strong> With trusted third-party vendors who assist in our operations
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or to protect our rights
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
                  </li>
                  <li>
                    <strong>Consent:</strong> When you have given explicit consent for sharing
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Your Rights</h2>
              <div className="space-y-4 text-gray-300">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information
                  </li>
                  <li>
                    <strong>Portability:</strong> Request transfer of your data to another service provider
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to processing of your personal information
                  </li>
                  <li>
                    <strong>Withdrawal:</strong> Withdraw consent for data processing at any time
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Cookies & Tracking</h2>
              <div className="space-y-4 text-gray-300">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Improve website functionality and user experience</li>
                  <li>Provide personalized content and recommendations</li>
                </ul>
                <p className="mt-4">
                  You can control cookie settings through your browser preferences. However, disabling cookies may
                  affect website functionality.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Data Retention</h2>
              <div className="space-y-4 text-gray-300">
                <p>We retain your personal information for as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide our services and support</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Improve our services and operations</li>
                </ul>
                <p className="mt-4">
                  When information is no longer needed, we securely delete or anonymize it in accordance with our data
                  retention policies.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Mail className="w-6 h-6 mr-3 text-cyan-400" />
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>If you have questions about this Privacy Policy or want to exercise your rights, contact us:</p>
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
                <p className="mt-6 text-sm">We will respond to your request within 30 days of receipt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
