// Centralized project data
export const projects = [
  {
    title: "BalanceBite Mobile App",
    subtitle: "Final Year Project",
    period: "Jan 2024 - Feb 2025",
    description:
      "A comprehensive nutritional application developed using Kotlin in Android Studio, featuring personalized nutrition plans and exercise routines.",
    longDescription:
      "BalanceBite is my final year project that combines nutrition science with modern mobile technology. The app provides users with personalized nutrition plans based on their health goals, dietary preferences, and lifestyle. It features an integrated AI chatbot for personalized assistance, meal tracking, exercise routines, and progress monitoring. The application uses machine learning algorithms to adapt recommendations based on user behavior and feedback. This project was a significant undertaking, involving extensive research into dietary guidelines, user behavior patterns, and the implementation of a robust backend to support real-time data synchronization. The AI chatbot was developed using a custom NLP model trained on nutritional datasets, providing intelligent and context-aware responses to user queries. The UI/UX was meticulously designed to be intuitive and engaging, ensuring a seamless user experience. Challenges included optimizing performance for large datasets and ensuring data privacy compliance, which were overcome through careful database design and secure API integrations.",
    technologies: ["Kotlin", "Android Studio", "AI/ML", "Firebase", "Material Design"],
    features: [
      "Personalized nutrition plans",
      "AI chatbot integration",
      "Exercise routine recommendations",
      "Progress tracking and analytics",
      "Meal planning and recipes",
      "Health goal setting",
    ],
    status: "Completed",
    image: "/images/balancebite-app.png",
    githubUrl: "https://github.com/amarhumayunx/BalanceBite",
    liveDemoUrl: "https://balancebite.vercel.app", // Example live demo URL
    categories: ["Mobile", "AI/ML", "Health", "Android"],
  },
  {
    title: "SafeCrypt Password Manager",
    subtitle: "Cross-Platform Security App",
    period: "Dec 2024 - Present",
    description:
      "A secure, cross-platform password manager built with Flutter and Firebase, featuring AES-256 encryption and biometric authentication.",
    longDescription:
      "SafeCrypt is a comprehensive password management solution designed with security as the top priority. Built using Flutter for cross-platform compatibility, it runs seamlessly on mobile, desktop, and web platforms. The app implements AES-256 encryption to protect user credentials and features biometric authentication for enhanced security. Users can generate strong passwords, organize credentials by categories, and sync data securely across devices. Developing SafeCrypt involved deep dives into cryptographic best practices and secure data storage. We utilized Flutter's robust ecosystem to ensure a consistent experience across various platforms, while Firebase provided a scalable and secure backend for data synchronization. A key challenge was balancing strong encryption with user convenience, which was addressed by integrating native biometric authentication methods. The project also focused on a modular architecture to allow for future expansion, such as multi-factor authentication and secure sharing features.",
    technologies: ["Flutter", "Firebase", "AES-256 Encryption", "Biometric Auth", "Cross-platform"],
    features: [
      "AES-256 encryption for data security",
      "Biometric authentication support",
      "Cross-platform compatibility",
      "Password strength indicators",
      "Secure cloud synchronization",
      "Auto-fill capabilities",
    ],
    status: "Active Development",
    image: "/images/safecrypt-app.png",
    githubUrl: "https://github.com/amarhumayunx/SafeCrypt",
    liveDemoUrl: null, // No live demo for this one yet
    categories: ["Mobile", "Security", "Cross-Platform", "Flutter"],
  },
  {
    title: "Surah Yaseen App",
    subtitle: "Islamic Mobile Application",
    period: "April 2024 - May 2024",
    description:
      "An Islamic app for reading, listening, and learning Surah Yaseen with ruku-by-ruku division and audio playback features.",
    longDescription:
      "The Surah Yaseen App is designed to help Muslims engage with one of the most beloved chapters of the Quran. The app features a clean, intuitive interface that allows users to read, listen, and learn Surah Yaseen with ruku-by-ruku divisions for better comprehension. It includes high-quality audio recitations, bookmarking functionality, and visual highlights that sync with the audio playback for an immersive experience. This project emphasized meticulous attention to detail in UI/UX to create a serene and focused reading environment. Integrating audio playback with text highlighting required precise synchronization algorithms. The app was designed for offline functionality, ensuring users could access content without an internet connection. Challenges included optimizing audio file sizes for mobile devices and ensuring accurate Arabic text rendering across various screen sizes and densities.",
    technologies: ["Flutter", "Audio Processing", "UI/UX Design", "Local Storage"],
    features: [
      "Ruku-by-ruku text division",
      "High-quality audio playback",
      "Bookmarking and favorites",
      "Visual audio synchronization",
      "Clean, intuitive UI design",
      "Offline functionality",
    ],
    status: "Completed",
    image: "/images/surah-yaseen-app.png",
    githubUrl: "https://github.com/amarhumayunx/Surah-Yaseen",
    liveDemoUrl: "https://surahyaseen.vercel.app", // Example live demo URL
    categories: ["Mobile", "Islamic", "Flutter"],
  },
  {
    title: "Toolkit App",
    subtitle: "All-in-One Utility Application",
    period: "June 2024 - July 2024",
    description:
      "A powerful utility app for document management, OCR text recognition, and PDF operations with image processing capabilities.",
    longDescription:
      "Toolkit App is a comprehensive utility application that combines multiple document management and processing tools into a single, user-friendly interface. The app leverages OCR technology to extract text from images with high accuracy, supports multiple languages, and provides extensive PDF manipulation capabilities. Users can split, merge, compress, and rearrange PDF documents, as well as convert images to PDFs seamlessly. The development of Toolkit App involved integrating several complex third-party libraries for OCR and PDF processing. A significant challenge was ensuring cross-platform compatibility and performance for these computationally intensive tasks. The user interface was designed to be highly modular, allowing for easy addition of new utility features in the future. This project honed my skills in handling large files, optimizing image processing workflows, and creating a robust, extensible application architecture.",
    technologies: ["Flutter", "OCR Technology", "PDF Processing", "Image Processing", "Multi-language Support"],
    features: [
      "Optical Character Recognition (OCR)",
      "PDF split, merge, and compress",
      "Image to PDF conversion",
      "Multi-language text extraction",
      "Document organization tools",
      "Batch processing capabilities",
    ],
    status: "Completed",
    image: "/images/toolkit-app.png",
    githubUrl: "https://github.com/amarhumayunx/ToolKit-flutter",
    liveDemoUrl: "https://toolkit-app.vercel.app", // Example live demo URL
    categories: ["Mobile", "Utility", "Flutter", "AI/ML"],
  },
]
