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
  themeColor: "#3b82f6",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        url: "https://amarhumayun.vercel.app/",
        name: "Muhammad Humayun Amar - Flutter Developer & Software Engineer",
        description:
          "Experienced Flutter developer and software engineer specializing in cross-platform mobile applications.",
        publisher: {
          "@id": "https://amarhumayun.vercel.app/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://amarhumayun.vercel.app/#person",
        name: "Muhammad Humayun Amar",
        url: "https://amarhumayun.vercel.app/",
        sameAs: [
          "https://github.com/amarhumayunx",
          "https://linkedin.com/in/amarhumayun",
          "mailto:amarhumayun@outlook.com",
        ],
        jobTitle: "Flutter Developer & Software Engineer",
        alumniOf: "University of Engineering and Technology, Lahore", // Example, adjust as needed
        worksFor: {
          "@type": "Organization",
          name: "Freelance", // Or your company name
        },
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
