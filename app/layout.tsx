import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import BackToTop from "@/components/ui/BackToTop"
import PerformanceMonitor from "@/components/debug/PerformanceMonitor"
import { ScrollIndicator } from "@/components/layout/ScrollIndicator"
import { PageLoadingBar } from "@/components/ui/PageLoadingBar"
import { ScrollEnhancer } from "@/components/providers/ScrollEnhancer"
import { FloatingActionButtonWrapper } from "@/components/ui/FloatingActionButtonWrapper"
import { ErrorBoundary } from "@/components/providers/ErrorBoundary"
import { SkipNav } from "@/components/layout/SkipNav"
import { CookieConsent } from "@/components/ui/CookieConsent"
import { PWARegister } from "@/components/ui/PWARegister"
import { KeyboardShortcutsProvider } from "@/components/ui/KeyboardShortcuts"
import { FocusVisibleEnhancer } from "@/components/ui/FocusVisible"
import { ARIALiveRegion } from "@/components/ui/ARIALiveRegion"
import { PerformanceOptimizer } from "@/components/ui/PerformanceOptimizer"
import { GoogleAnalytics } from "@/components/ui/GoogleAnalytics"
import { PageTransition } from "@/components/ui/PageTransition"
import { SmoothScroll } from "@/components/ui/SmoothScroll"
import { SearchModal } from "@/components/ui/SearchModal"
import { QuickJumpMenu } from "@/components/ui/QuickJumpMenu"
import { AccessibilityControls } from "@/components/ui/AccessibilityControls"
import { MobileBottomNav } from "@/components/ui/MobileBottomNav"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import { CursorTrail } from "@/components/ui/CursorTrail"
import { ThemeColorCustomizer } from "@/components/ui/ThemeColorCustomizer"
import { OfflineIndicator } from "@/components/ui/OfflineIndicator"
import { EnhancedBackground } from "@/components/ui/EnhancedBackground"
import { Suspense } from "react"

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
  // Enhanced structured data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Humayun Amar",
    url: "https://amarhumayun.com",
    jobTitle: "Mobile App Developer",
    description: "Professional mobile app developer specializing in Flutter, Android, and cross-platform solutions.",
    email: "amarhumayun@outlook.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    sameAs: [
      "https://github.com/amarhumayunx",
      "https://linkedin.com/in/amarhumayun",
      "https://twitter.com/amarhumayunx",
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://amarhumayun.com",
    name: "Muhammad Humayun Amar - Mobile App Developer",
    description: "Professional mobile app developer specializing in Flutter, Android, and cross-platform solutions.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://amarhumayun.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  const jsonLd = [personSchema, websiteSchema]

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  // If user has explicitly set a theme, use it
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    // If no preference saved, use system preference
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${_inter.variable} font-sans`}>
        <GoogleAnalytics />
        {Array.isArray(jsonLd) ? (
          jsonLd.map((schema, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))
        ) : (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
          storageKey="portfolio-theme"
          enableColorScheme={false}
        >
          <KeyboardShortcutsProvider>
            <ErrorBoundary>
              <SkipNav />
              <SmoothScroll />
              <ScrollEnhancer />
              <PageLoadingBar />
              <EnhancedBackground />
              <ScrollIndicator />
              <OfflineIndicator />
              <FocusVisibleEnhancer />
              <ARIALiveRegion />
              <PerformanceOptimizer />
              <Navigation />
              <Suspense>
                <PageTransition variant="fade">
                  <main id="main-content" className="min-h-screen bg-transparent">
                    {children}
                  </main>
                </PageTransition>
              </Suspense>
              <FloatingActionButtonWrapper />
              <Footer />
              <BackToTop />
              <PerformanceMonitor />
              <Toaster />
              <CookieConsent />
              <PWARegister />
              <SearchModal />
              <QuickJumpMenu />
              <AccessibilityControls />
              <MobileBottomNav />
              <ParticleBackground />
              <CursorTrail />
              <ThemeColorCustomizer />
            </ErrorBoundary>
          </KeyboardShortcutsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
