import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/seo"

const serviceLinks = [
  ["Custom Development", "/services/custom-software-development"],
  ["ERP & Enterprise Systems", "/services/erp-development"],
  ["Cloud & DevOps", "/services/cloud-devops"],
  ["AI Integration", "/services/ai-automation"],
  ["Software Outsourcing", "/services/software-outsourcing"],
] as const

const companyLinks = [
  ["About Us", "/#about"],
  ["Portfolio", "/portfolio"],
  ["Contact", "/#contact"],
  ["Careers", "/careers"],
  ["Blog", "/blog"],
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" aria-label="Versal Labs home" className="flex items-center space-x-3">
              <img src="/logo-full.svg" alt="Versal Labs" className="h-8 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Smart Code. Scalable Solutions.
              <br />
              Custom software and AI engineering from Colombo, Sri Lanka.
            </p>
            <div className="flex gap-3">
              <Button asChild size="icon" variant="ghost" className="hover:bg-blue-500/10 hover:text-blue-400">
                <a aria-label="Versal Labs on LinkedIn" href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" /></a>
              </Button>
              <Button asChild size="icon" variant="ghost" className="hover:bg-blue-500/10 hover:text-blue-400">
                <a aria-label="Versal Labs on X" href={siteConfig.social.x} target="_blank" rel="noopener noreferrer"><Twitter className="h-4 w-4" /></a>
              </Button>
              <Button asChild size="icon" variant="ghost" className="hover:bg-blue-500/10 hover:text-blue-400">
                <a aria-label="Versal Labs on GitHub" href={siteConfig.social.github} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4" /></a>
              </Button>
              <Button asChild size="icon" variant="ghost" className="hover:bg-blue-500/10 hover:text-blue-400">
                <a aria-label="Email Versal Labs" href={`mailto:${siteConfig.email}`}><Mail className="h-4 w-4" /></a>
              </Button>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-semibold">Services</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              {serviceLinks.map(([label, href]) => <li key={href}><Link href={href} className="transition-colors hover:text-white">{label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-semibold">Company</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              {companyLinks.map(([label, href]) => <li key={href}><Link href={href} className="transition-colors hover:text-white">{label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-semibold">Contact</h2>
            <address className="not-italic">
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a className="hover:text-white" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
                <li><a className="hover:text-white" href={`tel:${siteConfig.telephone}`}>{siteConfig.displayTelephone}</a></li>
                <li>105, 24 Kent Rd<br />Colombo 00900, Sri Lanka</li>
                <li><a className="text-cyan-400 hover:text-cyan-300" href={siteConfig.googleBusinessProfile} target="_blank" rel="noopener noreferrer">View Google Business Profile</a></li>
              </ul>
            </address>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">© {currentYear} Versal Labs. All rights reserved.</p>
          <div className="mt-4 flex gap-6 text-sm text-gray-400 md:mt-0">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
            <Link href="/cookies" className="transition-colors hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
