/**
 * Internationalization (i18n) Utilities
 * Multi-language support for Urdu/Hindi and English
 */

export type Language = "en" | "ur" | "hi"

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
  ur: {
    nav: {
      home: "ہوم",
      about: "میرے بارے میں",
      stats: "اعداد و شمار",
      skills: "مہارتیں",
      projects: "منصوبے",
      portfolio: "پورٹ فولیو",
      services: "خدمات",
      testimonials: "توصیفیں",
      blog: "بلاگ",
      contact: "رابطہ",
    },
    hero: {
      title: "محمد ہمایوں امر",
      subtitle: "فل اسٹیک فلیٹر ڈویلپر",
      description: "پرجوش فلیٹر ڈویلپر جو فلیٹر اور فائر بیس کا استعمال کرتے ہوئے اعلی کارکردگی، کراس پلیٹ فارم ایپس بنانے کا عملی تجربہ رکھتا ہے۔",
      location: "لاہور، پاکستان",
    },
    about: {
      title: "میرے بارے میں",
      description: "فل اسٹیک فلیٹر اور موبائل ایپ ڈویلپر | FlutterFlow | GetX | RESTful APIs | Android اور iOS ماہر",
    },
    projects: {
      title: "نمایاں منصوبے",
      description: "میرے حالیہ کام کا نمائش، موبائل ڈویلپمنٹ، AI انضمام، اور کراس پلیٹ فارم حل میں مہارت کا مظاہرہ۔",
      viewDetails: "تفصیلات دیکھیں",
      viewDemo: "ڈیمو دیکھیں",
      viewGitHub: "GitHub پر دیکھیں",
    },
    contact: {
      title: "آئیں مل کر کچھ شاندار بنائیں",
      description: "اپنے موبائل ایپ کے وژن کو زندگی میں لانے کے لیے تیار؟ میں جدید فلیٹر ڈویلپمنٹ کے ساتھ غیر معمولی ڈیجیٹل تجربات بنانے میں آپ کی مدد کے لیے یہاں ہوں۔",
      email: "ای میل",
      location: "مقام",
      responseTime: "جواب کا وقت",
    },
    common: {
      loading: "لوڈ ہو رہا ہے...",
      error: "ایک خرابی پیش آئی",
      success: "کامیابی!",
      readMore: "مزید پڑھیں",
      learnMore: "مزید جانیں",
      back: "واپس",
      next: "اگلا",
      previous: "پچھلا",
      close: "بند کریں",
      search: "تلاش",
      filter: "فلٹر",
      all: "سب",
    },
  },
  hi: {
    nav: {
      home: "होम",
      about: "मेरे बारे में",
      stats: "आंकड़े",
      skills: "कौशल",
      projects: "प्रोजेक्ट",
      portfolio: "पोर्टफोलियो",
      services: "सेवाएं",
      testimonials: "प्रशंसापत्र",
      blog: "ब्लॉग",
      contact: "संपर्क",
    },
    hero: {
      title: "मुहम्मद हुमायूं अमर",
      subtitle: "फुल स्टैक फ्लटर डेवलपर",
      description: "उत्साही फ्लटर डेवलपर जो फ्लटर और फायरबेस का उपयोग करके उच्च प्रदर्शन, क्रॉस-प्लेटफॉर्म ऐप्स बनाने का व्यावहारिक अनुभव रखता है।",
      location: "लाहौर, पाकिस्तान",
    },
    about: {
      title: "मेरे बारे में",
      description: "फुल स्टैक फ्लटर और मोबाइल ऐप डेवलपर | FlutterFlow | GetX | RESTful APIs | Android और iOS विशेषज्ञ",
    },
    projects: {
      title: "विशेष प्रोजेक्ट",
      description: "मेरे हाल के काम का प्रदर्शन, मोबाइल विकास, AI एकीकरण, और क्रॉस-प्लेटफॉर्म समाधानों में विशेषज्ञता का प्रदर्शन।",
      viewDetails: "विवरण देखें",
      viewDemo: "डेमो देखें",
      viewGitHub: "GitHub पर देखें",
    },
    contact: {
      title: "आइए मिलकर कुछ अद्भुत बनाएं",
      description: "अपने मोबाइल ऐप के दृष्टिकोण को जीवन में लाने के लिए तैयार? मैं अत्याधुनिक फ्लटर विकास के साथ असाधारण डिजिटल अनुभव बनाने में आपकी मदद करने के लिए यहां हूं।",
      email: "ईमेल",
      location: "स्थान",
      responseTime: "प्रतिक्रिया समय",
    },
    common: {
      loading: "लोड हो रहा है...",
      error: "एक त्रुटि हुई",
      success: "सफलता!",
      readMore: "और पढ़ें",
      learnMore: "और जानें",
      back: "वापस",
      next: "अगला",
      previous: "पिछला",
      close: "बंद करें",
      search: "खोजें",
      filter: "फ़िल्टर",
      all: "सभी",
    },
  },
}

let currentLanguage: Language = "en"

export function setLanguage(lang: Language) {
  currentLanguage = lang
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio-language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr"
  }
}

export function getLanguage(): Language {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("portfolio-language") as Language
    if (saved && (saved === "en" || saved === "ur" || saved === "hi")) {
      return saved
    }
  }
  return currentLanguage
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
