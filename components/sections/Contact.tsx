"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, MessageSquare, Calendar, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import { MultiStepForm } from "@/components/ui/MultiStepForm"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "amarhumayun@outlook.com",
    href: "mailto:amarhumayun@outlook.com",
    description: "For quick questions and direct communication",
  },
  {
    icon: MessageSquare,
    title: "Phone",
    value: "+92-348-5856797",
    href: "tel:+923485856797",
    description: "Call me directly for urgent matters",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Lahore, Pakistan",
    href: "#",
    description: "Available for local meetings and remote work",
  },
  {
    icon: Calendar,
    title: "Response Time",
    value: "Within 24 hours",
    href: "#",
    description: "I typically respond to all inquiries within one business day",
  },
]

const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    href: "https://github.com/amarhumayunx",
    username: "@amarhumayunx",
    description: "View my code and open source contributions",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "https://linkedin.com/in/amarhumayun",
    username: "@amarhumayun",
    description: "Connect with me professionally",
  },
]

const quickActions = [
  {
    icon: MessageSquare,
    title: "Quick Question",
    description: "Have a simple question? Send me a direct email",
    action: "Email Me",
    href: "mailto:amarhumayun@outlook.com?subject=Quick Question",
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Want to discuss your project in detail?",
    action: "Book a Call",
    href: "mailto:amarhumayun@outlook.com?subject=Schedule a Call&body=I'd like to schedule a call to discuss my project.",
  },
  {
    icon: Zap,
    title: "Urgent Project",
    description: "Need immediate assistance with your project?",
    action: "Priority Contact",
    href: "mailto:amarhumayun@outlook.com?subject=Urgent Project Request&body=This is an urgent project request.",
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Let's Build Something <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Ready to bring your mobile app vision to life? I'm here to help you create exceptional digital experiences
            with cutting-edge Flutter development.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.div key={action.title} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-4 sm:p-6 text-center">
                  <action.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{action.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{action.description}</p>
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto bg-transparent">
                    <a href={action.href}>{action.action}</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Contact Information */}
          <ParallaxSection offset={30}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get In Touch</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  Whether you're a startup looking to build your first app, an established business wanting to expand
                  digitally, or an entrepreneur with a groundbreaking idea, I'm here to help turn your vision into
                  reality.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold mb-1 text-sm sm:text-base">{info.title}</h4>
                            {info.href !== "#" ? (
                              <a
                                href={info.href}
                                className="text-primary hover:underline font-medium block mb-1 text-sm sm:text-base break-all"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="font-medium mb-1 text-sm sm:text-base">{info.value}</p>
                            )}
                            <p className="text-xs sm:text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect With Me</h4>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <Card key={social.name} className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-medium text-sm sm:text-base">{social.name}</span>
                              <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs sm:text-sm text-primary hover:underline break-all"
                              >
                                {social.username}
                              </a>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground">{social.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </ParallaxSection>

          {/* Multi-Step Form */}
          <div className="lg:col-span-2">
            <ParallaxSection offset={-30}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <MultiStepForm />
              </motion.div>
            </ParallaxSection>
          </div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold mb-4">What Happens Next?</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2 text-sm sm:text-base">
                    1
                  </div>
                  <p className="font-medium mb-1">Review & Analysis</p>
                  <p className="text-muted-foreground">I'll review your request and analyze your requirements</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2 text-sm sm:text-base">
                    2
                  </div>
                  <p className="font-medium mb-1">Initial Consultation</p>
                  <p className="text-muted-foreground">We'll schedule a call to discuss your project in detail</p>
                </div>
                <div className="flex flex-col items-center sm:col-span-2 lg:col-span-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2 text-sm sm:text-base">
                    3
                  </div>
                  <p className="font-medium mb-1">Proposal & Timeline</p>
                  <p className="text-muted-foreground">You'll receive a detailed proposal with timeline and pricing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
