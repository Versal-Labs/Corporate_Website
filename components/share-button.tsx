"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ShareButton({ title, text }: { title: string; text?: string }) {
  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch {
        return
      }
    }
    await navigator.clipboard.writeText(url)
  }

  return (
    <Button variant="ghost" size="sm" onClick={share} className="text-gray-400 hover:text-white">
      <Share2 className="mr-1 h-4 w-4" />Share
    </Button>
  )
}
