import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import BackToTop from "@/components/ui/BackToTop"
import PerformanceMonitor from "@/components/debug/PerformanceMonitor"
import { ScrollIndicator } from "@/components/layout/ScrollIndicator"
import { PageLoadingBar } from "@/components/ui/PageLoadingBar"
import { ScrollEnhancer } from "@/components/providers/ScrollEnhancer"
import { FloatingActionButton } from "@/components/ui/FloatingActionButton"
import { ErrorBoundary } from "@/components/providers/ErrorBoundary"
import { SkipNav } from "@/components/layout/SkipNav"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://amarhumayun.com"),
  title: {
    default: "Muhammad Humayun Amar - Mobile App Developer | Flutter & Android Expert",
    template: "%s | Muhammad Humayun Amar",
  },
  description:
    "Professional mobile app developer specializing in Flutter, Android, and cross-platform solutions. Expert in Firebase, AI/ML integration, and modern app development.",
  keywords: [
    "Mobile App Developer",
    "Flutter Developer",
    "Android Developer",
    "Cross-platform Development",
    "Firebase Integration",
    "AI ML Integration",
    "App Development",
    "Amar Humayun",
  ],
  authors: [{ name: "Muhammad Humayun Amar", url: "https://amarhumayun.com" }],
  creator: "Muhammad Humayun Amar",
  publisher: "Muhammad Humayun Amar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amarhumayun.com",
    siteName: "Muhammad Humayun Amar - Mobile App Developer",
    title: "Muhammad Humayun Amar - Mobile App Developer | Flutter & Android Expert",
    description: "Professional mobile app developer specializing in Flutter, Android, and cross-platform solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Humayun Amar - Mobile App Developer",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 800,
        height: 800,
        alt: "Muhammad Humayun Amar Profile",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Humayun Amar - Mobile App Developer | Flutter & Android Expert",
    description: "Professional mobile app developer specializing in Flutter, Android, and cross-platform solutions.",
    creator: "@amarhumayunx",
    site: "@amarhumayunx",
    images: {
      url: "/og-image.jpg",
      alt: "Muhammad Humayun Amar - Mobile App Developer",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://amarhumayun.com",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Humayun Amar",
    url: "https://amarhumayun.com",
    jobTitle: "Mobile App Developer",
    description: "Professional mobile app developer specializing in Flutter, Android, and cross-platform solutions.",
    sameAs: [
      "https://github.com/amarhumayunx",
      "https://linkedin.com/in/amarhumayun",
      "https://twitter.com/amarhumayun",
    ],
    knowsAbout: [
      "Flutter Development",
      "Android Development",
      "Cross-platform Development",
      "Firebase Integration",
      "AI/ML Integration",
      "Mobile App Development",
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <SkipNav />
            <ScrollEnhancer />
            <PageLoadingBar />
            <ScrollIndicator />
            <Navigation />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <FloatingActionButton />
            <Footer />
            <BackToTop />
            <PerformanceMonitor />
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
