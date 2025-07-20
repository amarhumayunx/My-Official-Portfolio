"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sendContactMessage } from "@/app/actions/contact"
import { ParallaxSection } from "@/components/ui/ParallaxSection"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "amarhumayun@outlook.com",
    href: "mailto:amarhumayun@outlook.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Lahore, Pakistan",
    href: "#",
  },
]

const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    href: "https://github.com/amarhumayunx",
    username: "@amarhumayunx",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "https://linkedin.com/in/amarhumayun",
    username: "@amarhumayun",
  },
]

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    success: boolean
    message: string
    errors?: Record<string, string[]>
  } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const result = await sendContactMessage(formData)
      setSubmitResult(result)

      // Reset form if successful
      if (result.success) {
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can bring your mobile app ideas to life with
            cutting-edge Flutter development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <ParallaxSection offset={30}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always excited to discuss new opportunities, collaborate on interesting projects, or simply chat
                  about the latest in mobile development. Whether you're looking for a Flutter developer, need
                  consultation on your app idea, or want to explore potential partnerships, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <info.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{info.title}</h4>
                            {info.href !== "#" ? (
                              <a
                                href={info.href}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label={`Contact via ${info.title}: ${info.value}`}
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">{info.value}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow me on ${social.name}`}
                      >
                        <social.icon className="w-4 h-4" aria-hidden="true" />
                        {social.username}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </ParallaxSection>

          <ParallaxSection offset={-30}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {submitResult && (
                    <Alert
                      className={`mb-6 ${submitResult.success ? "border-green-200 bg-green-50 dark:bg-green-950" : "border-red-200 bg-red-50 dark:bg-red-950"}`}
                      aria-live="polite" // Announce changes to screen readers
                    >
                      {submitResult.success ? (
                        <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" aria-hidden="true" />
                      )}
                      <AlertDescription
                        className={
                          submitResult.success ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                        }
                      >
                        {submitResult.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form id="contact-form" action={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your full name"
                          className={submitResult?.errors?.name ? "border-red-500" : ""}
                          aria-invalid={submitResult?.errors?.name ? "true" : "false"}
                          aria-describedby={submitResult?.errors?.name ? "name-error" : undefined}
                        />
                        {submitResult?.errors?.name && (
                          <p id="name-error" className="text-sm text-red-600">
                            {submitResult.errors.name[0]}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          className={submitResult?.errors?.email ? "border-red-500" : ""}
                          aria-invalid={submitResult?.errors?.email ? "true" : "false"}
                          aria-describedby={submitResult?.errors?.email ? "email-error" : undefined}
                        />
                        {submitResult?.errors?.email && (
                          <p id="email-error" className="text-sm text-red-600">
                            {submitResult.errors.email[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        placeholder="What's this about?"
                        className={submitResult?.errors?.subject ? "border-red-500" : ""}
                        aria-invalid={submitResult?.errors?.subject ? "true" : "false"}
                        aria-describedby={submitResult?.errors?.subject ? "subject-error" : undefined}
                      />
                      {submitResult?.errors?.subject && (
                        <p id="subject-error" className="text-sm text-red-600">
                          {submitResult.errors.subject[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell me about your project or inquiry..."
                        rows={6}
                        className={submitResult?.errors?.message ? "border-red-500" : ""}
                        aria-invalid={submitResult?.errors?.message ? "true" : "false"}
                        aria-describedby={submitResult?.errors?.message ? "message-error" : undefined}
                      />
                      {submitResult?.errors?.message && (
                        <p id="message-error" className="text-sm text-red-600">
                          {submitResult.errors.message[0]}
                        </p>
                      )}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                            role="status"
                            aria-label="Sending message"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  )
}
