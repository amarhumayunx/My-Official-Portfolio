"use server"

import { z } from "zod"
import { Resend } from "resend"

// IMPORTANT: In a real production environment, you would use process.env.RESEND_API_KEY
// For this demo, a placeholder key is used.
const RESEND_API_KEY_DEMO = "re_6NDc9ymU_9sLrmCNYgQK5p4d8nWGJU4wg"

const resend = new Resend(RESEND_API_KEY_DEMO) // Using the hardcoded key for demo

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // reCaptchaToken field removed from schema
})

export async function sendContactMessage(formData: FormData) {
  // Removed recaptchaSecretKey variable and its check

  console.log("Server Action: sendContactMessage started (without reCAPTCHA).")

  try {
    // Validate form data
    const validatedFields = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      // reCaptchaToken is no longer expected in formData
    })

    console.log("Server Action: Form data validation result:", validatedFields.success)

    if (!validatedFields.success) {
      console.error("Server Action: Form data validation failed.", validatedFields.error.flatten().fieldErrors)
      return {
        success: false,
        message: "Please check your form data and try again.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { name, email, subject, message } = validatedFields.data
    console.log("Server Action: Extracted form data:", { name, email, subject, message })

    // Removed reCAPTCHA verification logic

    // Send the email using Resend
    console.log("Server Action: Attempting to send email via Resend...")
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Replace with your verified Resend domain email
      to: "amarhumayun@outlook.com", // Replace with your actual recipient email
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <p><strong>New Contact Form Submission</strong></p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr/>
        <p><em>Sent from Muhammad Humayun Amar's Portfolio Website</em></p>
      `,
      reply_to: email,
    })

    if (error) {
      console.error("Server Action: Resend email error:", error)
      return {
        success: false,
        message: `Failed to send message: ${error.message || "Unknown error"}`,
      }
    }

    console.log("Server Action: Email sent successfully:", data)

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Server Action: Caught an unexpected error during contact form processing:", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return {
      success: false,
      message: `Sorry, there was an unexpected error sending your message: ${errorMessage}. Please try again or contact me directly.`,
    }
  }
}
