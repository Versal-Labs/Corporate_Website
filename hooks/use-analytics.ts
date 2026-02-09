"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageView, trackEvent, hasConsentFor } from "@/lib/cookies"

// Hook for tracking page views
export function usePageTracking() {
  const pathname = usePathname()

  useEffect(() => {
    if (hasConsentFor("analytics")) {
      trackPageView(pathname)
    }
  }, [pathname])
}

// Hook for tracking custom events
export function useEventTracking() {
  const track = (eventName: string, parameters?: Record<string, any>) => {
    if (hasConsentFor("analytics")) {
      trackEvent(eventName, parameters)
    }
  }

  return { track }
}

// Hook for tracking form submissions
export function useFormTracking() {
  const trackFormStart = (formName: string) => {
    trackEvent("form_start", { form_name: formName })
  }

  const trackFormSubmit = (formName: string, success = true) => {
    trackEvent("form_submit", {
      form_name: formName,
      success: success,
    })
  }

  const trackFormError = (formName: string, error: string) => {
    trackEvent("form_error", {
      form_name: formName,
      error_message: error,
    })
  }

  return {
    trackFormStart,
    trackFormSubmit,
    trackFormError,
  }
}

// Hook for tracking user interactions
export function useInteractionTracking() {
  const trackClick = (elementName: string, location?: string) => {
    trackEvent("click", {
      element_name: elementName,
      location: location,
    })
  }

  const trackScroll = (percentage: number) => {
    trackEvent("scroll", { scroll_percentage: percentage })
  }

  const trackDownload = (fileName: string, fileType: string) => {
    trackEvent("file_download", {
      file_name: fileName,
      file_type: fileType,
    })
  }

  return {
    trackClick,
    trackScroll,
    trackDownload,
  }
}
