import type { ReactNode } from "react"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: "Understand how Versal Labs uses essential and optional cookies and how you can manage your cookie preferences.",
  path: "/cookies",
})

export default function CookiesLayout({ children }: { children: ReactNode }) {
  return children
}
