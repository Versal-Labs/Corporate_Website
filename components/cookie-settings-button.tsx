"use client"

import { useState } from "react"
import { Settings, Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  getCookieConsent,
  setCookieConsent,
  COOKIE_CATEGORIES,
  type CookieCategory,
  clearNonConsentedCookies,
  initializeAnalytics,
} from "@/lib/cookies"

export default function CookieSettingsButton() {
  const [open, setOpen] = useState(false)
  const [consent, setConsent] = useState(() => {
    const existing = getCookieConsent()
    return (
      existing || {
        essential: true,
        analytics: false,
        functional: false,
        marketing: false,
      }
    )
  })

  const handleSave = () => {
    setCookieConsent(consent)
    clearNonConsentedCookies()

    if (consent.analytics) {
      initializeAnalytics()
    }

    setOpen(false)
  }

  const toggleConsent = (category: CookieCategory) => {
    if (category === "essential") return

    setConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-40 bg-gray-900/90 backdrop-blur-sm border-gray-600 hover:border-orange-400 hover:bg-orange-400/10 text-white"
        >
          <Cookie className="w-4 h-4 mr-2" />
          Cookie Settings
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-400" />
            Cookie Preferences
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Manage your cookie preferences. Changes will take effect immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
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
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Required</span>
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

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
          <Button variant="outline" onClick={() => setOpen(false)} className="border-gray-600 hover:border-gray-500">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
          >
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
