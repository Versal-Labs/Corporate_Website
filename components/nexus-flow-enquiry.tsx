"use client"

import Link from "next/link"
import { useActionState, useEffect, useState } from "react"
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react"
import { submitNexusFlowEnquiry, type NexusFlowEnquiryState } from "@/app/actions/nexus-flow"
import { siteConfig } from "@/lib/seo"
import styles from "@/app/products/nexus-flow/nexus-flow.module.css"

const initialState: NexusFlowEnquiryState = { success: false, message: "", errors: {} }

export default function NexusFlowEnquiry() {
  const [state, formAction, pending] = useActionState(submitNexusFlowEnquiry, initialState)
  const [intent, setIntent] = useState("demo")

  useEffect(() => {
    const updateIntent = () => {
      if (window.location.hash === "#request-quotation") setIntent("quotation")
      if (window.location.hash === "#book-demo") setIntent("demo")
    }
    const handleLinkClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null
      const href = link?.getAttribute("href")
      if (href === "#book-demo") setIntent("demo")
      if (href === "#request-quotation") setIntent("quotation")
    }
    updateIntent()
    window.addEventListener("hashchange", updateIntent)
    document.addEventListener("click", handleLinkClick)
    return () => {
      window.removeEventListener("hashchange", updateIntent)
      document.removeEventListener("click", handleLinkClick)
    }
  }, [])

  return (
    <div className={styles.enquiryForm}>
      <span id="book-demo" className={styles.contactAnchor} aria-hidden="true" /><span id="request-quotation" className={styles.contactAnchor} aria-hidden="true" />
      <h3>Let’s talk about your business.</h3>
      <p className={styles.formIntro}>Leave your details and the Versal Labs team will contact you by email.</p>
      {state.success ? (
        <div role="status" className={styles.success}>
          <CheckCircle2 aria-hidden="true" size={32} />
          <h4>We’ve received your enquiry.</h4>
          <p>{state.message}</p>
        </div>
      ) : (
        <form action={formAction} aria-busy={pending}>
          <fieldset disabled={pending} className={styles.formFields}>
            <legend className="sr-only">Nexus Flow enquiry details</legend>
            <div className={styles.formRow}>
              <div>
                <label htmlFor="nexus-name">Your name <span aria-hidden="true">*</span></label>
                <input id="nexus-name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name" aria-invalid={!!state.errors.name} aria-describedby={state.errors.name ? "nexus-name-error" : undefined} />
                {state.errors.name && <p id="nexus-name-error" className={styles.fieldError}>{state.errors.name}</p>}
              </div>
              <div>
                <label htmlFor="nexus-company">Company <span aria-hidden="true">*</span></label>
                <input id="nexus-company" name="company" autoComplete="organization" required minLength={2} maxLength={100} placeholder="Business name" aria-invalid={!!state.errors.company} aria-describedby={state.errors.company ? "nexus-company-error" : undefined} />
                {state.errors.company && <p id="nexus-company-error" className={styles.fieldError}>{state.errors.company}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="nexus-email">Work email <span aria-hidden="true">*</span></label>
              <input id="nexus-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" aria-invalid={!!state.errors.email} aria-describedby={state.errors.email ? "nexus-email-error" : undefined} />
              {state.errors.email && <p id="nexus-email-error" className={styles.fieldError}>{state.errors.email}</p>}
            </div>
            <div>
              <label htmlFor="nexus-intent">I’d like to</label>
              <select id="nexus-intent" name="intent" value={intent} onChange={(event) => setIntent(event.target.value)} aria-invalid={!!state.errors.intent} aria-describedby={state.errors.intent ? "nexus-intent-error" : undefined}>
                <option value="demo">Book a demo</option>
                <option value="quotation">Request a quotation</option>
              </select>
              {state.errors.intent && <p id="nexus-intent-error" className={styles.fieldError}>{state.errors.intent}</p>}
            </div>
            <div>
              <label htmlFor="nexus-message">Tell us about your requirements <span className={styles.optional}>(optional)</span></label>
              <textarea id="nexus-message" name="message" rows={3} maxLength={1000} placeholder="Your current system, workflows, or what you’d like to see in the demo…" aria-invalid={!!state.errors.message} aria-describedby={state.errors.message ? "nexus-message-error" : undefined} />
              {state.errors.message && <p id="nexus-message-error" className={styles.fieldError}>{state.errors.message}</p>}
            </div>
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="nexus-website">Website</label>
              <input id="nexus-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {state.message && <p role="alert" className={styles.fieldError}>{state.message}</p>}
            <button type="submit" className={styles.primaryButton} disabled={pending}>
              {pending ? <><Loader2 size={18} aria-hidden="true" />Sending enquiry…</> : <>{intent === "demo" ? "Request my demo" : "Request my quotation"}<ArrowUpRight size={18} aria-hidden="true" /></>}
            </button>
            <p className={styles.privacyNote}>We’ll use your details to respond to this enquiry. <Link href="/privacy">Privacy policy</Link></p>
          </fieldset>
        </form>
      )}
      <a className={styles.directEmail} href={`mailto:${siteConfig.email}?subject=Nexus%20Flow%20ERP%20enquiry`}>Prefer email? {siteConfig.email}<ArrowUpRight size={14} aria-hidden="true" /></a>
    </div>
  )
}
