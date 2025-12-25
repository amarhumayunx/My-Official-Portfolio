export interface Project {
  title: string
  subtitle: string
  period: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  status: string
  image: string
  githubUrl: string
  liveDemoUrl?: string
  categories: string[]
  challenges?: string[]
  solutions?: string[]
  results?: string[]
}

export const projects: Project[] = [
  {
    title: "BalanceBite",
    subtitle: "Smart Health & Nutrition App",
    period: "Jan 2024 - Feb 2025",
    description:
      "An AI-powered mobile app that helps users make healthier food choices by analyzing nutritional content, scanning food items with OCR, and providing personalized meal recommendations.",
    longDescription:
      "BalanceBite is a comprehensive health and nutrition tracking application that leverages artificial intelligence and machine learning to help users maintain a balanced diet. The app features real-time nutritional analysis, OCR-based food scanning, personalized meal recommendations, and detailed health insights based on user preferences and dietary goals.",
    technologies: [
      "Flutter",
      "Dart",
      "TensorFlow",
      "Firebase",
      "ML Kit",
      "OCR",
      "Material Design",
      "REST APIs",
      "Cloud Functions",
    ],
    features: [
      "AI-powered nutritional analysis",
      "OCR food label scanning",
      "Personalized meal recommendations",
      "Health goal tracking",
      "Calorie and nutrient monitoring",
      "Recipe suggestions",
      "Progress visualization",
      "Multi-language support",
    ],
    status: "Completed",
    image: "/images/balancebite-app.png",
    githubUrl: "https://github.com/amarhumayunx/balancebite",
    categories: ["Mobile App", "AI/ML", "Health Tech"],
    challenges: [
      "Implementing accurate OCR for food labels with varying formats",
      "Training ML models for nutritional content prediction",
      "Designing an intuitive UI for complex nutritional data",
      "Ensuring real-time performance for food scanning",
    ],
    solutions: [
      "Integrated TensorFlow Lite for on-device ML processing",
      "Used Firebase ML Kit for reliable OCR with preprocessing",
      "Created custom data visualizations for nutritional insights",
      "Optimized image processing pipeline for quick scanning",
    ],
    results: [
      "Final Year Project awarded A Grade",
      "Successfully scans and analyzes 95% of food labels",
      "Provides personalized recommendations in under 2 seconds",
      "Positive feedback from 50+ beta testers",
    ],
  },
  {
    title: "SafeCrypt",
    subtitle: "Encrypted Password Manager",
    period: "Sep 2023 - Dec 2023",
    description:
      "A secure password management application using AES-256 encryption. Features include password generation, secure storage, biometric authentication, and cross-platform sync via Firebase.",
    longDescription:
      "SafeCrypt is a robust password manager built with security as the top priority. It uses industry-standard AES-256 encryption to protect user credentials, supports biometric authentication for quick access, and provides seamless synchronization across devices through Firebase. The app also includes a powerful password generator, breach detection, and secure sharing capabilities.",
    technologies: [
      "Flutter",
      "Dart",
      "AES-256 Encryption",
      "Firebase",
      "Biometric Auth",
      "SQLite",
      "Provider",
      "Material Design",
    ],
    features: [
      "AES-256 encryption for all stored data",
      "Biometric authentication (fingerprint/face)",
      "Strong password generator",
      "Auto-fill support",
      "Secure cloud sync",
      "Password breach detection",
      "Secure notes storage",
      "Offline access",
    ],
    status: "Completed",
    image: "/images/safecrypt-app.png",
    githubUrl: "https://github.com/amarhumayunx/safecrypt",
    categories: ["Mobile App", "Security", "Utility"],
    challenges: [
      "Implementing strong encryption without compromising performance",
      "Ensuring zero-knowledge architecture",
      "Managing secure key storage across devices",
      "Balancing security with user convenience",
    ],
    solutions: [
      "Used Flutter's isolates for encryption operations",
      "Implemented secure key derivation with PBKDF2",
      "Leveraged platform-specific secure storage (Keychain/Keystore)",
      "Added biometric authentication for seamless access",
    ],
    results: [
      "Successfully encrypts/decrypts data in under 100ms",
      "Zero reported security vulnerabilities",
      "4.8/5 rating from 200+ users",
      "Featured in university security showcase",
    ],
  },
  {
    title: "Surah Yaseen App",
    subtitle: "Islamic Prayer & Reading App",
    period: "Jun 2023 - Aug 2023",
    description:
      "A beautifully designed Islamic app for reading Surah Yaseen with Arabic text, translations, audio recitation, and prayer time notifications. Features offline access and customizable themes.",
    longDescription:
      "The Surah Yaseen app provides a serene and intuitive experience for Muslims to read and listen to Surah Yaseen. It includes high-quality Arabic text with multiple translations, professional audio recitations, prayer time notifications, and a bookmark system for easy navigation. The app works completely offline and offers both light and dark themes for comfortable reading.",
    technologies: ["Flutter", "Dart", "SQLite", "Audio Players", "Local Notifications", "Material Design", "Provider"],
    features: [
      "Beautiful Arabic typography",
      "Multiple language translations",
      "High-quality audio recitation",
      "Prayer time notifications",
      "Bookmark and progress tracking",
      "Night mode for comfortable reading",
      "Completely offline functionality",
      "Customizable text size and fonts",
    ],
    status: "Completed",
    image: "/images/surah-yaseen-app.png",
    githubUrl: "https://github.com/amarhumayunx/surah-yaseen",
    categories: ["Mobile App", "Religious", "Education"],
    challenges: [
      "Rendering complex Arabic typography correctly",
      "Managing large audio files efficiently",
      "Implementing accurate prayer time calculations",
      "Ensuring smooth scrolling with heavy text content",
    ],
    solutions: [
      "Used specialized fonts optimized for Arabic text",
      "Implemented streaming audio with caching",
      "Integrated location-based prayer time algorithm",
      "Optimized ListView with lazy loading",
    ],
    results: [
      "Downloaded by 1000+ users in the first month",
      "4.7/5 rating on app stores",
      "Positive reviews praising UI/UX design",
      "Featured in Islamic app recommendations",
    ],
  },
  {
    title: "Toolkit App",
    subtitle: "All-in-One Utility Application",
    period: "Mar 2023 - May 2023",
    description:
      "A comprehensive utility app featuring QR code generation/scanning, file conversion, calculator, unit converter, and other daily-use tools in a single elegant interface.",
    longDescription:
      "Toolkit is a versatile utility application that combines multiple everyday tools into one convenient app. It includes a QR code scanner and generator, document converter, scientific calculator, unit converter, flashlight, and more. The app is designed with simplicity and efficiency in mind, providing quick access to essential tools without the need for multiple apps.",
    technologies: [
      "Flutter",
      "Dart",
      "QR Code Scanner",
      "Camera",
      "File System",
      "Material Design",
      "Provider",
      "Local Storage",
    ],
    features: [
      "QR code scanner and generator",
      "PDF and image converter",
      "Scientific calculator",
      "Unit converter (length, weight, temperature)",
      "Flashlight with brightness control",
      "Color picker tool",
      "Text formatter and counter",
      "Quick notes with search",
    ],
    status: "Completed",
    image: "/images/toolkit-app.png",
    githubUrl: "https://github.com/amarhumayunx/toolkit",
    categories: ["Mobile App", "Utility", "Productivity"],
    challenges: [
      "Integrating multiple functionalities smoothly",
      "Ensuring fast switching between tools",
      "Managing memory efficiently with many features",
      "Creating a unified design language",
    ],
    solutions: [
      "Implemented lazy loading for tool modules",
      "Used efficient state management with Provider",
      "Optimized memory usage with proper disposal",
      "Created a consistent Material Design theme",
    ],
    results: [
      "500+ active users within two months",
      "4.6/5 average rating",
      "Low battery consumption despite multiple features",
      "Recognized for clean and intuitive design",
    ],
  },
  {
    title: "Pet Marketplace App",
    subtitle: "Pet Discovery & Community Platform",
    period: "Oct 2024 - Jan 2025",
    description:
      "A comprehensive Flutter-based marketplace app for discovering, listing, and managing pets. Features include onboarding, home feed with filters, in-app chat, admin dashboard, and QR functionality.",
    longDescription:
      "Pet Marketplace is a full-featured mobile and web application that connects pet lovers, breeders, and pet service providers. The app provides a seamless experience for browsing available pets with advanced filtering options, posting new listings with detailed information and images, communicating with sellers through in-app messaging, and managing the entire platform through an admin dashboard. Built with Flutter for cross-platform compatibility, it works smoothly on mobile, web, and desktop.",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "Cloud Firestore",
      "Firebase Storage",
      "Firebase Auth",
      "Push Notifications",
      "Material Design",
      "Provider",
      "QR Code",
    ],
    features: [
      "User onboarding and verification system",
      "Advanced search with filters (breed, age, location, price)",
      "Pet listing with multiple images and details",
      "Real-time in-app chat and messaging",
      "Push notifications for messages and updates",
      "Admin dashboard for user and content management",
      "QR code generation for pet profiles",
      "Favorites and saved searches",
      "User reviews and ratings",
      "Multi-platform support (iOS, Android, Web)",
    ],
    status: "Completed",
    image: "/modern-pet-marketplace-app-with-flutter-showing-pe.jpg",
    githubUrl: "https://github.com/amarhumayunx/pet-marketplace",
    liveDemoUrl: "https://pet-marketplace-demo.web.app",
    categories: ["Mobile App", "E-commerce", "Social"],
    challenges: [
      "Implementing real-time chat with message history",
      "Managing large image uploads efficiently",
      "Creating a responsive admin dashboard",
      "Ensuring smooth performance across platforms",
    ],
    solutions: [
      "Used Firebase Firestore for real-time messaging",
      "Implemented image compression and progressive loading",
      "Built responsive layouts with Flutter's adaptive widgets",
      "Optimized build configurations for web and mobile",
    ],
    results: [
      "Successfully deployed on iOS, Android, and Web",
      "Handles 100+ concurrent users smoothly",
      "Average page load time under 2 seconds",
      "Positive client feedback on UI/UX design",
    ],
  },
  {
    title: "Office Attendance Management System",
    subtitle: "QR-Based Attendance & Employee Management",
    period: "May 2024 - Sep 2024",
    description:
      "A full-stack attendance tracking system with Flutter frontend and Node.js backend. Features QR-based check-in/out, leave management, attendance analytics, and document viewing with Firebase integration.",
    longDescription:
      "Office Attendance Management System is an enterprise-grade solution for tracking employee attendance and managing HR workflows. The system uses QR code technology for quick and accurate check-in/checkout, provides real-time attendance statistics and reports, manages leave requests with approval workflows, and allows employees to view company policies and documents. The backend is built with Node.js and integrates with Firebase for authentication and data storage, while the Flutter frontend provides a beautiful and responsive interface across all devices.",
    technologies: [
      "Flutter",
      "Dart",
      "Node.js",
      "Express",
      "Firebase",
      "Firebase Auth",
      "Cloud Firestore",
      "QR Code Scanner",
      "PDF Viewer",
      "Push Notifications",
      "Material Design",
      "REST APIs",
    ],
    features: [
      "QR code-based check-in and checkout",
      "Real-time attendance tracking and statistics",
      "Employee profile management",
      "Leave request and approval system",
      "Company policy and document viewing (PDF)",
      "Attendance reports and analytics",
      "Push notifications for approvals and reminders",
      "Admin dashboard for HR management",
      "Multi-role authentication (Admin, Manager, Employee)",
      "Geofencing for location-based attendance",
    ],
    status: "Completed",
    image: "/professional-office-attendance-app-with-qr-code-sc.jpg",
    githubUrl: "https://github.com/amarhumayunx/office-attendance",
    categories: ["Mobile App", "Enterprise", "HR Tech"],
    challenges: [
      "Building a scalable Node.js backend from scratch",
      "Implementing complex authentication and authorization",
      "Creating efficient QR code generation and validation",
      "Managing real-time data synchronization",
    ],
    solutions: [
      "Architected RESTful API with Express and middleware",
      "Implemented JWT-based authentication with role management",
      "Used cryptographic signatures for secure QR codes",
      "Leveraged Firestore's real-time listeners for live updates",
    ],
    results: [
      "Successfully deployed for 50+ employee organization",
      "Reduced attendance tracking time by 80%",
      "99.9% accuracy in QR code validation",
      "High satisfaction from HR team and employees",
    ],
  },
  {
    title: "Love Connect",
    subtitle:
      "Full-Stack Flutter and Mobile App Developer | FlutterFlow | GetX | RESTful APIs | Android and iOS Expert",
    period: "Feb 2025 - Present",
    description:
      "A feature-rich Flutter application designed to bring couples closer together. It provides a dedicated space for couples to plan dates, share memories, and stay connected with an intuitive user interface.",
    longDescription:
      "Love Connect is a comprehensive dating and social connection platform featuring smart date planning, inspiration hub with curated ideas, surprise features with mystery wheels and scratch cards, shared journal for memories, smart notifications with daily quotes, and powerful settings. Built with Flutter and GetX for state management, it integrates Firebase for authentication and real-time database, uses shared_preferences for offline syncing, and features interactive UI components like flutter_fortune_wheel and scratcher. The app provides a beautiful, responsive experience on both iOS and Android.",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "Cloud Firestore",
      "Firebase Auth",
      "Firebase Storage",
      "GetX",
      "shared_preferences",
      "flutter_fortune_wheel",
      "scratcher",
      "google_fonts",
      "flutter_svg",
    ],
    features: [
      "Smart date planning with visual countdown",
      "Curated date ideas library with categories",
      "Mystery Date Wheel for random date selection",
      "Lucky Love Coupons with interactive scratch cards",
      "Shared digital journal for memories and love notes",
      "Smart reminders and daily romantic quotes",
      "User profile customization",
      "Data management and privacy controls",
      "Cross-platform support (iOS, Android)",
      "Offline syncing with shared_preferences",
    ],
    status: "In Development",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600&q=80",
    githubUrl: "https://github.com/amarhumayunx/Love-Connect",
    categories: ["Mobile App", "Social", "Dating"],
    challenges: [
      "Building interactive UI components for engaging user experience",
      "Managing real-time data synchronization for couple activities",
      "Implementing smooth animations and transitions",
      "Ensuring privacy and security for sensitive relationship data",
    ],
    solutions: [
      "Integrated Framer Motion and custom animations for fluid UX",
      "Leveraged Firebase Firestore for real-time couple sync",
      "Implemented GetX for efficient state management",
      "Applied encryption and secure authentication with Firebase Auth",
    ],
    results: [
      "Successfully deployed on both iOS and Android platforms",
      "Real-time features with <500ms latency",
      "Smooth animations and interactive UI elements",
      "Positive user feedback on couple connectivity features",
    ],
  },
]

export default projects
