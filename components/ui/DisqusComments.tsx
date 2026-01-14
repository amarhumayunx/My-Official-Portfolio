"use client"

interface Comment {
  id: number
  author: string
  date: string
  text: string
}

interface DisqusCommentsProps {
  slug: string
  title: string
}

export function DisqusComments({ slug, title }: DisqusCommentsProps) {
  // Updated hardcoded comments for each project slug with more realistic content and adjusted dates
  const allDummyComments: { [key: string]: Comment[] } = {
    "deep-dive-balancebite-mobile-app": [
      {
        id: 1,
        author: "Aisha Khan",
        date: "March 10, 2025",
        text: "This project is truly innovative! The AI chatbot for personalized nutrition sounds like a game-changer. How did you handle the data privacy aspects, especially with sensitive health data?",
      },
      {
        id: 2,
        author: "Usman Ali",
        date: "April 5, 2025",
        text: "BalanceBite looks amazing! As someone who struggles with meal planning, this app would be incredibly useful. The UI/UX is very intuitive. Great work!",
      },
      {
        id: 3,
        author: "Fatima Ahmed",
        date: "May 20, 2025",
        text: "The integration of machine learning for adaptive recommendations is brilliant. What was the most challenging part of developing the ML model and ensuring its accuracy across diverse user needs?",
      },
      {
        id: 4,
        author: "Omar Farooq",
        date: "June 15, 2025",
        text: "I'm really impressed with the comprehensive features. Did you consider integrating with wearable devices for real-time data? That would be a fantastic addition!",
      },
    ],
    "deep-dive-safecrypt-password-manager": [
      {
        id: 1,
        author: "Zainab Malik",
        date: "June 1, 2025",
        text: "Security is paramount, and SafeCrypt seems to address it perfectly with AES-256 encryption. How user-friendly is the biometric authentication across different devices and operating systems?",
      },
      {
        id: 2,
        author: "Ahmed Raza",
        date: "July 3, 2025",
        text: "A much-needed cross-platform solution! I'm always looking for secure password managers. Any plans for browser extensions or integration with popular web services in the future?",
      },
      {
        id: 3,
        author: "Sana Tariq",
        date: "July 18, 2025",
        text: "The secure cloud synchronization feature is a huge plus. It's great to see such a robust security app built with Flutter. How do you handle recovery in case of lost master passwords?",
      },
      {
        id: 4,
        author: "Hamza Khan",
        date: "August 1, 2025",
        text: "This looks like a solid alternative to existing solutions. The focus on local-first encryption is commendable. What's your strategy for long-term maintenance and security updates?",
      },
    ],
    "deep-dive-surah-yaseen-app": [
      {
        id: 1,
        author: "Imran Khan",
        date: "March 22, 2025",
        text: "Masha'Allah, a beautiful and thoughtful app. The ruku-by-ruku division is very helpful for understanding. May Allah bless your efforts! The recitation quality is excellent.",
      },
      {
        id: 2,
        author: "Hafsa Noor",
        date: "April 14, 2025",
        text: "The audio synchronization with text highlighting is a fantastic feature for learning and memorization. This app will be very beneficial for many. Jazakallah Khair!",
      },
      {
        id: 3,
        author: "Ali Hassan",
        date: "May 5, 2025",
        text: "Simple, clean, and highly functional. This is exactly what's needed for daily recitation. Excellent work! Is there an option for different reciters?",
      },
      {
        id: 4,
        author: "Mariam Siddiqui",
        date: "June 2, 2025",
        text: "Subhanallah, this app is a blessing. The translation options are very clear and easy to follow. Thank you for creating such a valuable resource.",
      },
    ],
    "deep-dive-toolkit-app": [
      {
        id: 1,
        author: "Sara Ejaz",
        date: "June 10, 2025",
        text: "The Toolkit App sounds incredibly versatile! OCR and PDF operations in one place are super convenient. How accurate is the multi-language text extraction, especially for less common languages?",
      },
      {
        id: 2,
        author: "Bilal Sheikh",
        date: "July 1, 2025",
        text: "This is a true utility powerhouse. I'm particularly interested in the image processing capabilities. Great job on combining so many features seamlessly. Any plans for video editing features?",
      },
      {
        id: 3,
        author: "Hina Riaz",
        date: "July 20, 2025",
        text: "Document management is always a hassle, but this app seems to simplify it. The batch processing feature sounds like a huge time-saver! What kind of file formats does it support for conversion?",
      },
      {
        id: 4,
        author: "Faisal Mahmood",
        date: "August 5, 2025",
        text: "The UI looks very clean and functional for such a feature-rich app. How do you ensure performance with so many tools integrated? Excellent concept!",
      },
    ],
    // Default comments if a slug doesn't have specific comments
    default: [
      {
        id: 1,
        author: "Guest User",
        date: "July 27, 2025",
        text: "This is a general comment for posts without specific discussions. Great content!",
      },
      {
        id: 2,
        author: "Anonymous Reader",
        date: "August 1, 2025",
        text: "Very insightful article. I learned a lot from this. Keep up the good work!",
      },
    ],
  }

  const commentsForSlug = allDummyComments[slug] || allDummyComments["default"]

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <div id="disqus_thread" className="card-bg p-6 rounded-lg shadow-lg border border-border space-y-6">
        {commentsForSlug.map((comment) => (
          <div key={comment.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                {comment.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground">{comment.author}</p>
                <p className="text-xs text-muted-foreground">{comment.date}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
