import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import Navigation from "@/components/layout/Navigation"
import { Toaster } from "@/components/ui/toaster"
import { SmoothScroll } from "@/components/ui/SmoothScroll"
import { ParticlesBackground } from "@/components/ui/ParticlesBackground"
import { LoadingScreen } from "@/components/ui/LoadingScreen"
import { WebsiteReadTime } from "@/components/ui/WebsiteReadTime"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Muhammad Humayun Amar - Flutter Developer & Software Engineer",
  description:
    "Experienced Flutter developer and software engineer specializing in cross-platform mobile applications, with expertise in Dart, Kotlin, and modern development frameworks.",
  keywords: "Flutter Developer, Mobile App Developer, Software Engineer, Dart, Kotlin, Cross-platform Development",
  authors: [{ name: "Muhammad Humayun Amar" }],
  creator: "Muhammad Humayun Amar",
  metadataBase: new URL("https://amarhumayun.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amarhumayun.vercel.app",
    title: "Muhammad Humayun Amar - Flutter Developer",
    description: "Experienced Flutter developer and software engineer",
    siteName: "Muhammad Humayun Amar Portfolio",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Muhammad Humayun Amar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Humayun Amar - Flutter Developer",
    description: "Experienced Flutter developer and software engineer",
    creator: "@amarhumayunx",
    images: ["/icon-512.png"],
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon" sizes="180x180" type="image/png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        {/* reCAPTCHA script removed */}
      </head>
      <body className={`${inter.className} antialiased`}>
        <LoadingScreen />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ParticlesBackground />
          <SmoothScroll />
          <Navigation />
          {children}
          <Toaster />
          <WebsiteReadTime />
        </ThemeProvider>
      </body>
    </html>
  )
}
