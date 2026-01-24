/**
 * Internationalization (i18n) Utilities
 * English language support
 */

export type Language = "en"

export interface Translations {
  [key: string]: string | Translations
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      stats: "Stats",
      skills: "Skills",
      projects: "Projects",
      portfolio: "Portfolio",
      services: "Services",
      testimonials: "Testimonials",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      title: "Muhammad Humayun Amar",
      subtitle: "Full Stack Flutter Developer",
      description: "Passionate Flutter Developer with hands-on experience building high-performance, cross-platform apps using Flutter and Firebase.",
      location: "Lahore, Pakistan",
    },
    about: {
      title: "About Me",
      description: "Full-Stack Flutter and Mobile App Developer | FlutterFlow | GetX | RESTful APIs | Android and iOS Expert",
    },
    projects: {
      title: "Featured Projects",
      description: "A showcase of my recent work, demonstrating expertise in mobile development, AI integration, and cross-platform solutions.",
      viewDetails: "View Details",
      viewDemo: "View Demo",
      viewGitHub: "View on GitHub",
    },
    contact: {
      title: "Let's Build Something Amazing Together",
      description: "Ready to bring your mobile app vision to life? I'm here to help you create exceptional digital experiences with cutting-edge Flutter development.",
      email: "Email",
      location: "Location",
      responseTime: "Response Time",
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      success: "Success!",
      readMore: "Read More",
      learnMore: "Learn More",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      search: "Search",
      filter: "Filter",
      all: "All",
    },
  },
}

let currentLanguage: Language = "en"

export function setLanguage(lang: Language) {
  currentLanguage = lang
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio-language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = "ltr"
  }
}

export function getLanguage(): Language {
  // Only English is supported now
  return "en"
}

export function t(key: string, lang?: Language): string {
  const language = lang || getLanguage()
  const keys = key.split(".")
  let value: string | Translations = translations[language]

  for (const k of keys) {
    if (typeof value === "object" && value !== null && k in value) {
      value = value[k]
    } else {
      // Fallback to English if translation not found
      if (language !== "en") {
        return t(key, "en")
      }
      return key
    }
  }

  return typeof value === "string" ? value : key
}

// Initialize language on client side
if (typeof window !== "undefined") {
  const savedLang = getLanguage()
  setLanguage(savedLang)
}
