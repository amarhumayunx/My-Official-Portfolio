"use server"

import { z } from "zod"
import { Resend } from "resend"

const RESEND_API_KEY_DEMO = "re_6NDc9ymU_9sLrmCNYgQK5p4d8nWGJU4wg"

const resend = new Resend(RESEND_API_KEY_DEMO) // Using the hardcoded key for demo

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  reCaptchaToken: z.string().min(1, "reCAPTCHA token is missing."), // New: reCAPTCHA token
})

export async function sendContactMessage(formData: FormData) {
  // In a production environment, you would use:
  // const resendApiKey = process.env.RESEND_API_KEY;
  // if (!resendApiKey) { /* handle missing key error */ }
  // const resend = new Resend(resendApiKey);

  // Placeholder for your reCAPTCHA secret key
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY || "6LeIxAcTAAAAABJcZVRqyZE8YmJwGwP_Jj6_V_87" // Replace with your actual secret key

  try {
    // Validate form data
    const validatedFields = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      reCaptchaToken: formData.get("reCaptchaToken"), // Get the token
    })

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Please check your form data and try again.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { name, email, subject, message, reCaptchaToken } = validatedFields.data

    // Verify reCAPTCHA token
    const recaptchaVerifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${recaptchaSecretKey}&response=${reCaptchaToken}`,
    })
    const recaptchaData = await recaptchaVerifyResponse.json()

    if (!recaptchaData.success || recaptchaData.score < 0.7) {
      // Adjust score threshold as needed (0.0 to 1.0)
      console.warn("reCAPTCHA verification failed:", recaptchaData)
      return {
        success: false,
        message: "Spam detection failed. Please try again.",
      }
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // or your verified email
      to: "amarhumayun@outlook.com", // your email
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
      console.error("Resend email error:", error)
      return {
        success: false,
        message: `Failed to send message: ${error.message || "Unknown error"}`,
      }
    }

    console.log("Email sent successfully:", data)

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      message: "Sorry, there was an unexpected error sending your message. Please try again or contact me directly.",
    }
  }
}
