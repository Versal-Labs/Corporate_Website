"use client"

import { useState, useEffect } from "react"
import { Cookie, Settings, X, Check, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  getCookieConsent,
  setCookieConsent,
  COOKIE_CATEGORIES,
  type CookieCategory,
  clearNonConsentedCookies,
  initializeAnalytics,
} from "@/lib/cookies"

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [consent, setConsent] = useState({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already given consent
    const existingConsent = getCookieConsent()

    if (!existingConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      // Initialize services based on existing consent
      if (existingConsent.analytics) {
        initializeAnalytics()
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const allConsent = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    }

    setCookieConsent(allConsent)
    setShowBanner(false)
    setShowSettings(false)

    // Initialize analytics if accepted
    initializeAnalytics()
  }

  const handleAcceptSelected = () => {
    setCookieConsent(consent)
    setShowBanner(false)
    setShowSettings(false)

    // Clear non-consented cookies
    clearNonConsentedCookies()

    // Initialize analytics if accepted
    if (consent.analytics) {
      initializeAnalytics()
    }
  }

  const handleRejectAll = () => {
    const minimalConsent = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    }

    setCookieConsent(minimalConsent)
    setShowBanner(false)
    setShowSettings(false)

    // Clear all non-essential cookies
    clearNonConsentedCookies()
  }

  const toggleConsent = (category: CookieCategory) => {
    if (category === "essential") return // Essential cookies cannot be disabled

    setConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl">
            {!showSettings ? (
              // Main Banner
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">We use cookies</h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      We use cookies and similar technologies to improve your experience, analyze site traffic, and
                      personalize content. You can choose which cookies to accept below.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBanner(false)}
                    className="text-gray-400 hover:text-white flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept All
                  </Button>

                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    className="border-gray-600 hover:border-orange-400 hover:bg-orange-400/10 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Customize
                  </Button>

                  <Button
                    onClick={handleRejectAll}
                    variant="ghost"
                    className="text-gray-400 hover:text-white font-medium px-6 py-2 rounded-xl transition-all duration-300"
                  >
                    Reject All
                  </Button>
                </div>

                <div className="text-xs text-gray-400">
                  By continuing to use our site, you agree to our{" "}
                  <a href="/cookies" className="text-orange-400 hover:text-orange-300 underline">
                    Cookie Policy
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-orange-400 hover:text-orange-300 underline">
                    Privacy Policy
                  </a>
                  .
                </div>
              </div>
            ) : (
              // Settings Panel
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Cookie Preferences</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <p className="text-gray-300 text-sm">
                  Choose which cookies you want to accept. You can change these settings at any time.
                </p>

                <div className="space-y-4">
                  {Object.entries(COOKIE_CATEGORIES).map(([key, category]) => {
                    const categoryKey = key as CookieCategory
                    const isEnabled = consent[categoryKey]
                    const isRequired = category.required

                    return (
                      <div
                        key={key}
                        className="flex items-start justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
                      >
                        <div className="flex-1 mr-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-white">{category.name}</h4>
                            {isRequired && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                <Shield className="w-3 h-3" />
                                Required
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{category.description}</p>
                        </div>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={() => toggleConsent(categoryKey)}
                          disabled={isRequired}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
                  <Button
                    onClick={handleAcceptSelected}
                    className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Save Preferences
                  </Button>

                  <Button
                    onClick={handleAcceptAll}
                    variant="outline"
                    className="border-gray-600 hover:border-green-400 hover:bg-green-400/10 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 bg-transparent"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
