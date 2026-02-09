"use client"

// Cookie categories and their purposes
export const COOKIE_CATEGORIES = {
  essential: {
    name: "Essential",
    description: "Required for basic website functionality",
    required: true,
  },
  analytics: {
    name: "Analytics",
    description: "Help us understand how you use our website",
    required: false,
  },
  functional: {
    name: "Functional",
    description: "Remember your preferences and settings",
    required: false,
  },
  marketing: {
    name: "Marketing",
    description: "Used to show you relevant content and ads",
    required: false,
  },
} as const

export type CookieCategory = keyof typeof COOKIE_CATEGORIES

export interface CookieConsent {
  essential: boolean
  analytics: boolean
  functional: boolean
  marketing: boolean
  timestamp: number
  version: string
}

const CONSENT_COOKIE_NAME = "versal-cookie-consent"
const CONSENT_VERSION = "1.0"

// Get cookie consent from localStorage
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(CONSENT_COOKIE_NAME)
    if (!stored) return null

    const consent = JSON.parse(stored) as CookieConsent

    // Check if consent is still valid (version matches)
    if (consent.version !== CONSENT_VERSION) {
      return null
    }

    return consent
  } catch {
    return null
  }
}

// Save cookie consent to localStorage
export function setCookieConsent(consent: Omit<CookieConsent, "timestamp" | "version">) {
  if (typeof window === "undefined") return

  const fullConsent: CookieConsent = {
    ...consent,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  }

  localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(fullConsent))

  // Trigger custom event for other components to listen to
  window.dispatchEvent(new CustomEvent("cookieConsentChanged", { detail: fullConsent }))
}

// Check if user has given consent for a specific category
export function hasConsentFor(category: CookieCategory): boolean {
  const consent = getCookieConsent()
  if (!consent) return false

  return consent[category]
}

// Set a cookie with consent check
export function setCookie(name: string, value: string, category: CookieCategory, days = 365) {
  if (typeof window === "undefined") return

  // Always allow essential cookies
  if (category !== "essential" && !hasConsentFor(category)) {
    return
  }

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

// Get a cookie value
export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null

  const nameEQ = name + "="
  const ca = document.cookie.split(";")

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }

  return null
}

// Delete a cookie
export function deleteCookie(name: string) {
  if (typeof window === "undefined") return

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

// Clear all non-essential cookies based on current consent
export function clearNonConsentedCookies() {
  if (typeof window === "undefined") return

  const consent = getCookieConsent()
  if (!consent) return

  // List of known cookies by category
  const cookiesByCategory = {
    analytics: ["_ga", "_ga_*", "_gid", "_gat", "_gtag"],
    functional: ["theme", "language", "preferences"],
    marketing: ["_fbp", "_fbc", "ads_*"],
  }

  // Clear cookies for categories without consent
  Object.entries(cookiesByCategory).forEach(([category, cookies]) => {
    if (!consent[category as CookieCategory]) {
      cookies.forEach((cookieName) => {
        if (cookieName.includes("*")) {
          // Handle wildcard cookies (like _ga_*)
          const prefix = cookieName.replace("*", "")
          const allCookies = document.cookie.split(";")
          allCookies.forEach((cookie) => {
            const name = cookie.split("=")[0].trim()
            if (name.startsWith(prefix)) {
              deleteCookie(name)
            }
          })
        } else {
          deleteCookie(cookieName)
        }
      })
    }
  })
}

// Initialize Google Analytics if consent is given
export function initializeAnalytics() {
  if (!hasConsentFor("analytics")) return

  // Initialize Google Analytics
  if (typeof window !== "undefined" && !window.gtag) {
    const script1 = document.createElement("script")
    script1.async = true
    script1.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
    document.head.appendChild(script1)

    const script2 = document.createElement("script")
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure'
      });
    `
    document.head.appendChild(script2)
  }
}

// Track page view (only if analytics consent is given)
export function trackPageView(url: string) {
  if (!hasConsentFor("analytics")) return

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "GA_MEASUREMENT_ID", {
      page_path: url,
    })
  }
}

// Track custom event (only if analytics consent is given)
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (!hasConsentFor("analytics")) return

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters)
  }
}

// Set user preferences (functional cookies)
export function setUserPreference(key: string, value: string) {
  setCookie(`pref_${key}`, value, "functional", 365)
}

// Get user preference
export function getUserPreference(key: string): string | null {
  if (!hasConsentFor("functional")) return null
  return getCookie(`pref_${key}`)
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
