import type { ReactNode } from "react"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Learn how Versal Labs collects, uses, protects, and manages personal information when you use our website and contact our team.",
  path: "/privacy",
})

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children
}
