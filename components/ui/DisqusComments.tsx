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
  // Hardcoded comments for each project slug with adjusted dates
  const allDummyComments: { [key: string]: Comment[] } = {
    "deep-dive-balancebite-mobile-app": [
      {
        id: 1,
        author: "Aisha Khan",
        date: "March 10, 2025",
        text: "This project is truly innovative! The AI chatbot for personalized nutrition sounds like a game-changer. How did you handle the data privacy aspects?",
      },
      {
        id: 2,
        author: "Usman Ali",
        date: "April 5, 2025",
        text: "BalanceBite looks amazing! As someone who struggles with meal planning, this app would be incredibly useful. Great work on the UI/UX.",
      },
      {
        id: 3,
        author: "Fatima Ahmed",
        date: "May 20, 2025",
        text: "The integration of machine learning for adaptive recommendations is brilliant. What was the most challenging part of developing the ML model?",
      },
    ],
    "deep-dive-safecrypt-password-manager": [
      {
        id: 1,
        author: "Zainab Malik",
        date: "June 1, 2025",
        text: "Security is paramount, and SafeCrypt seems to address it perfectly with AES-256 encryption. How user-friendly is the biometric authentication across different devices?",
      },
      {
        id: 2,
        author: "Ahmed Raza",
        date: "July 3, 2025",
        text: "A much-needed cross-platform solution! I'm always looking for secure password managers. Any plans for browser extensions in the future?",
      },
      {
        id: 3,
        author: "Sana Tariq",
        date: "July 18, 2025",
        text: "The secure cloud synchronization feature is a huge plus. It's great to see such a robust security app built with Flutter.",
      },
    ],
    "deep-dive-surah-yaseen-app": [
      {
        id: 1,
        author: "Imran Khan",
        date: "March 22, 2025",
        text: "Masha'Allah, a beautiful and thoughtful app. The ruku-by-ruku division is very helpful for understanding. May Allah bless your efforts!",
      },
      {
        id: 2,
        author: "Hafsa Noor",
        date: "April 14, 2025",
        text: "The audio synchronization with text highlighting is a fantastic feature for learning. This app will be very beneficial for many. Jazakallah Khair!",
      },
      {
        id: 3,
        author: "Ali Hassan",
        date: "May 5, 2025",
        text: "Simple, clean, and highly functional. This is exactly what's needed for daily recitation. Excellent work!",
      },
    ],
    "deep-dive-toolkit-app": [
      {
        id: 1,
        author: "Sara Ejaz",
        date: "June 10, 2025",
        text: "The Toolkit App sounds incredibly versatile! OCR and PDF operations in one place are super convenient. How accurate is the multi-language text extraction?",
      },
      {
        id: 2,
        author: "Bilal Sheikh",
        date: "July 1, 2025",
        text: "This is a true utility powerhouse. I'm particularly interested in the image processing capabilities. Great job on combining so many features seamlessly.",
      },
      {
        id: 3,
        author: "Hina Riaz",
        date: "July 20, 2025",
        text: "Document management is always a hassle, but this app seems to simplify it. The batch processing feature sounds like a time-saver!",
      },
    ],
    // Default comments if a slug doesn't have specific comments
    default: [
      {
        id: 1,
        author: "Guest User",
        date: "July 27, 2025",
        text: "This is a placeholder comment. Great post!",
      },
    ],
  }

  const commentsForSlug = allDummyComments[slug] || allDummyComments["default"]

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <div id="disqus_thread" className="bg-card p-6 rounded-lg shadow-lg border border-border space-y-6">
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
