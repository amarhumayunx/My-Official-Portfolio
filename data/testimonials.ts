export interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company?: string
  rating?: number
  image?: string
  featured?: boolean
  date?: string
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Humayun is an exceptional Flutter developer. His ability to translate complex designs into pixel-perfect, high-performance mobile applications is truly impressive. He's a great communicator and a valuable asset to any team.",
    name: "Hayan Haroon",
    title: "CEO",
    company: "HAACHI Technologies Pvt Ltd",
    rating: 5,
    featured: true,
    date: "2024-12-15",
  },
  {
    id: "2",
    quote:
      "Working with Humayun was a fantastic experience. He delivered our mobile app ahead of schedule, with outstanding quality and attention to detail. His problem-solving skills and dedication are top-notch.",
    name: "Muhammad Sabir",
    title: "Project Manager & Developer",
    company: "HAACHI Technologies Pvt Ltd",
    rating: 5,
    featured: true,
    date: "2024-11-20",
  },
  {
    id: "3",
    quote:
      "Humayun's expertise in Flutter and his understanding of user experience made a significant impact on our project. He's proactive, innovative, and consistently goes the extra mile to ensure client satisfaction.",
    name: "Mubashra Jabeen",
    title: "HR Executive",
    company: "HAACHI Technologies Pvt Ltd",
    rating: 5,
    date: "2024-10-10",
  },
  {
    id: "4",
    quote:
      "I highly recommend Humayun for any mobile development needs. His dedication to clean code and efficient solutions is remarkable. He transformed our ideas into a beautiful and functional app.",
    name: "Hafiz Muhammad Bilal Shahid",
    title: "Senior Lecturer of Computer Science",
    company: "University of Central Punjab (UCP)",
    rating: 5,
    featured: true,
    date: "2024-09-05",
  },
  {
    id: "5",
    quote:
      "Humayun's problem-solving approach is truly commendable. He tackled complex challenges in our project with ease and delivered a robust solution that exceeded our expectations. A pleasure to work with!",
    name: "Nida Fatima",
    title: "Senior Software Engineer",
    rating: 5,
    date: "2024-08-15",
  },
  {
    id: "6",
    quote:
      "His attention to detail in UI/UX implementation is outstanding. Humayun has a keen eye for design and ensures the user experience is always top-notch. Very impressed with his work ethic.",
    name: "Kamran Khan",
    title: "Product Designer",
    rating: 5,
    date: "2024-07-20",
  },
]

// Helper functions
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured)
}

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find((t) => t.id === id)
}

export function getTestimonialsByCompany(company: string): Testimonial[] {
  return testimonials.filter((t) => t.company === company)
}
