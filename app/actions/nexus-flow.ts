"use server"

import { z } from "zod"
import { sendContactEmail } from "@/lib/email"

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  company: z.string().trim().min(2, "Please enter your company name.").max(100),
  intent: z.enum(["demo", "quotation"]),
  message: z.string().trim().max(1000, "Please keep your message under 1,000 characters."),
})

export type NexusFlowEnquiryState = {
  success: boolean
  message: string
  errors: Partial<Record<"name" | "email" | "company" | "intent" | "message", string>>
}

export async function submitNexusFlowEnquiry(
  _previousState: NexusFlowEnquiryState,
  formData: FormData,
): Promise<NexusFlowEnquiryState> {
  if (formData.get("website")) {
    return { success: false, message: "Your enquiry could not be sent. Please contact us by email.", errors: {} }
  }

  const parsed = enquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    intent: formData.get("intent"),
    message: formData.get("message") ?? "",
  })

  if (!parsed.success) {
    const errors: NexusFlowEnquiryState["errors"] = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof typeof errors
      if (!errors[field]) errors[field] = issue.message
    }
    return { success: false, message: "Please check the highlighted fields.", errors }
  }

  const { name, email, company, intent, message } = parsed.data
  const request = intent === "demo" ? "Book a demo" : "Request a quotation"

  try {
    const result = await sendContactEmail({
      name,
      email,
      company,
      subject: `Nexus Flow ERP: ${request}`,
      message: `Product: Nexus Flow ERP\nEnquiry: ${request}\nCompany: ${company}\n\n${message || "Please contact me to discuss Nexus Flow for our business."}`,
    })
    if (!result.success) {
      return { success: false, message: "We could not send your enquiry. Please try again or email us directly.", errors: {} }
    }
    return { success: true, message: "Thank you. Your enquiry has been sent, and our team will be in touch.", errors: {} }
  } catch {
    return { success: false, message: "We could not send your enquiry. Please try again or email us directly.", errors: {} }
  }
}
