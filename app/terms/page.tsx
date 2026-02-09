"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FileText, Users, Shield, AlertTriangle, Gavel } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function TermsOfService() {
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
      <section ref={heroRef} className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-green-900/20 to-blue-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Terms of Service
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              These terms govern your use of our services. Please read them carefully before engaging with Versal Labs.
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
                <Users className="w-6 h-6 mr-3 text-green-400" />
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  By accessing or using Versal Labs' services, website, or engaging in any business relationship with
                  us, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms,
                  please do not use our services.
                </p>
                <p>
                  These Terms apply to all users, clients, visitors, and others who access or use our services,
                  including but not limited to software development, consulting, and related technology services.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Services Description</h2>
              <div className="space-y-4 text-gray-300">
                <p>Versal Labs provides the following services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Custom software development and programming</li>
                  <li>Web and mobile application development</li>
                  <li>Enterprise software solutions</li>
                  <li>Cloud infrastructure and DevOps services</li>
                  <li>AI integration and automation solutions</li>
                  <li>IT consulting and strategic technology guidance</li>
                  <li>Software maintenance and support services</li>
                </ul>
                <p className="mt-4">
                  Specific service details, deliverables, timelines, and pricing are outlined in separate project
                  agreements or statements of work.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Client Responsibilities</h2>
              <div className="space-y-4 text-gray-300">
                <p>As our client, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete project requirements</li>
                  <li>Supply necessary access, credentials, and resources</li>
                  <li>Respond to requests for information in a timely manner</li>
                  <li>Review and approve deliverables within agreed timeframes</li>
                  <li>Make payments according to the agreed schedule</li>
                  <li>Respect intellectual property rights</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-400" />
                Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-xl font-semibold text-white">Client IP</h3>
                <p>
                  You retain ownership of your pre-existing intellectual property, business data, and content provided
                  to us for project development.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6">Developed IP</h3>
                <p>
                  Unless otherwise specified in a project agreement, you will own the intellectual property rights to
                  custom software developed specifically for your project upon full payment.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6">Versal Labs IP</h3>
                <p>
                  We retain ownership of our proprietary methodologies, frameworks, tools, and general knowledge used in
                  service delivery.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Payment Terms</h2>
              <div className="space-y-4 text-gray-300">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Payment terms are specified in individual project agreements</li>
                  <li>Invoices are typically due within 30 days of receipt</li>
                  <li>Late payments may incur interest charges as permitted by law</li>
                  <li>We reserve the right to suspend services for overdue payments</li>
                  <li>All prices are in Sri Lankan Rupees (LKR) unless otherwise specified</li>
                  <li>Additional work outside the original scope requires separate agreement</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
                Warranties & Disclaimers
              </h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-xl font-semibold text-white">Limited Warranty</h3>
                <p>
                  We warrant that our services will be performed with professional skill and care. We will correct any
                  defects in our work at no additional charge for a period specified in the project agreement.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6">Disclaimers</h3>
                <p>
                  EXCEPT AS EXPRESSLY SET FORTH HEREIN, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY
                  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Limitation of Liability</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, VERSAL LABS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR
                  USE, ARISING OUT OF OR RELATING TO THESE TERMS OR OUR SERVICES.
                </p>
                <p>
                  OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR OUR SERVICES SHALL NOT
                  EXCEED THE TOTAL AMOUNT PAID BY YOU FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Confidentiality</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We understand that you may share confidential information with us during the course of our engagement.
                  We agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Keep all confidential information strictly confidential</li>
                  <li>Use confidential information only for the purpose of providing services</li>
                  <li>Not disclose confidential information to third parties without consent</li>
                  <li>Return or destroy confidential information upon request</li>
                  <li>Implement appropriate security measures to protect confidential information</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Termination</h2>
              <div className="space-y-4 text-gray-300">
                <p>Either party may terminate a project agreement:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For convenience with 30 days written notice</li>
                  <li>Immediately for material breach that remains uncured after 15 days notice</li>
                  <li>Immediately if the other party becomes insolvent or files for bankruptcy</li>
                </ul>
                <p className="mt-4">
                  Upon termination, you will pay for all services performed up to the termination date, and we will
                  deliver all completed work products.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Gavel className="w-6 h-6 mr-3 text-purple-400" />
                Governing Law & Disputes
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  These Terms are governed by the laws of Sri Lanka. Any disputes arising out of or relating to these
                  Terms or our services shall be resolved through:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Good faith negotiations between the parties</li>
                  <li>Mediation if negotiations fail</li>
                  <li>Arbitration or litigation in Colombo, Sri Lanka as a last resort</li>
                </ol>
                <p className="mt-4">
                  These Terms constitute the entire agreement between you and Versal Labs regarding our services and
                  supersede all prior agreements and understandings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
