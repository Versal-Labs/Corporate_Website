import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Send email to you (the business owner)
    const { data: emailData, error } = await resend.emails.send({
      from: 'Versal Labs Contact <mohamed.sakeel@versallabs.lk>',
      to: ['mohamed.sakeel@versallabs.lk'], // Your business email
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin: 0 0 5px 0;">Contact Details:</h3>
              <p style="margin: 5px 0; color: #475569;"><strong>Name:</strong> ${data.name}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Email:</strong> ${data.email}</p>
              ${data.company ? `<p style="margin: 5px 0; color: #475569;"><strong>Company:</strong> ${data.company}</p>` : ''}
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin: 0 0 10px 0;">Message:</h3>
              <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #374151; line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            
            <div style="background: #dbeafe; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>Reply directly to this email</strong> to respond to ${data.name} at ${data.email}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #64748b; font-size: 12px;">
            <p>This email was sent from the Versal Labs contact form</p>
          </div>
        </div>
      `,
      replyTo: data.email, // This allows you to reply directly to the sender
    })

    if (error) {
      console.error('Error sending email:', error)
      return { success: false, error: 'Failed to send email' }
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Versal Labs <mohamed.sakeel@versallabs.lk>',
      to: [data.email],
      subject: 'Thank you for contacting Versal Labs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Hi ${data.name},</p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you for contacting Versal Labs! We've received your message and our team will get back to you within 24 hours.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0; margin: 20px 0;">
              <h3 style="color: #1e293b; margin: 0 0 10px 0;">Your Message:</h3>
              <p style="color: #64748b; margin: 0; font-style: italic;">"${data.message}"</p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to explore our services and recent projects on our website.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://versallabs.lk" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Visit Our Website
              </a>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              <strong>Mohamed Sakeel</strong><br>
              <span style="color: #64748b;">Founder & CEO, Versal Labs</span>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #64748b; font-size: 12px;">
            <p>Versal Labs | Level 15, World Trade Center, Echelon Square, Colombo 01, Sri Lanka</p>
            <p>mohamed.sakeel@versallabs.lk | +94 11 234 5678</p>
          </div>
        </div>
      `,
    })

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Error in sendContactEmail:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
