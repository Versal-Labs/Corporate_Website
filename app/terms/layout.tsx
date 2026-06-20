import type { ReactNode } from "react"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Review the terms governing use of the Versal Labs website and our software development and technology services.",
  path: "/terms",
})

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children
}
