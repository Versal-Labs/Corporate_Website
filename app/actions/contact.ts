'use server'

import { sendContactEmail, type ContactFormData } from '@/lib/email'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100, 'Company name is too long').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
})

export type ContactFormState = {
  success: boolean
  message: string
  errors: Partial<Record<"name" | "email" | "company" | "message", string>>
}

export async function submitContactForm(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  try {
    // Extract form data
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string,
    }

    // Validate the data
    const validatedData = contactSchema.parse(rawData)

    // Send the email
    const result = await sendContactEmail(validatedData)

    if (!result.success) {
      return {
        success: false,
        message: 'Failed to send message. Please try again or contact us directly.',
        errors: {},
      }
    }

    return {
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
      errors: {},
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      const errors: ContactFormState["errors"] = {}
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as keyof ContactFormState["errors"]] = err.message
        }
      })

      return {
        success: false,
        message: 'Please check the form for errors.',
        errors,
      }
    }

    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
      errors: {},
    }
  }
}
