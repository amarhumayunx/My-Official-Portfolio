"use client"

import { projects } from "@/data/projects"

// Dynamic import for jsPDF to avoid SSR issues
async function loadJsPDF() {
  if (typeof window === "undefined") return null
  const jspdfModule = await import("jspdf")
  return jspdfModule.jsPDF || jspdfModule.default
}

interface PortfolioData {
  name: string
  title: string
  email: string
  phone?: string
  location?: string
  bio: string
  skills: Array<{ category: string; items: string[] }>
  experiences: Array<{
    title: string
    company: string
    period: string
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    period: string
    grade?: string
    description: string
  }>
  projects: Array<{
    title: string
    subtitle: string
    description: string
    technologies: string[]
    features: string[]
    period: string
  }>
}

const portfolioData: PortfolioData = {
  name: "Muhammad Humayun Amar",
  title: "Full-Stack Flutter & Mobile App Developer",
  email: "amarhumayun@outlook.com",
  location: "Lahore, Pakistan",
  bio: "Full-Stack Flutter and Mobile App Developer with expertise in FlutterFlow, GetX, RESTful APIs, Android and iOS development. I hold a Bachelor's degree in Computer Science from the University of Central Punjab, where I earned an A grade in my Final Year Project, BalanceBite — an AI-powered health and nutrition mobile application.",
  skills: [
    {
      category: "Mobile Development",
      items: ["Flutter", "Dart", "Kotlin", "Android", "iOS", "Cross-platform"],
    },
    {
      category: "Backend & Services",
      items: ["Firebase", "Cloud Firestore", "REST APIs", "Node.js", "Cloud Functions"],
    },
    {
      category: "UI/UX & Design",
      items: ["Material Design", "FlutterFlow", "Responsive Design", "Animation"],
    },
    {
      category: "Tools & Frameworks",
      items: ["GetX", "Provider", "Git", "Agile", "CI/CD"],
    },
  ],
  experiences: [
    {
      title: "Freelance Full Stack Flutter Developer",
      company: "Fiverr",
      period: "Sep 2025 - Present",
      description:
        "Delivering custom cross-platform mobile applications using Flutter and Dart. Specializing in building scalable, high-performance apps, optimizing UI/UX and application performance.",
    },
    {
      title: "Full Stack Flutter Developer",
      company: "Zee Palm Pvt. Ltd.",
      period: "Aug 2025 - Sep 2025",
      description:
        "Designed and developed high-performance, cross-platform mobile applications using Flutter and Dart. Focused on building responsive, user-friendly interfaces and robust application architectures.",
    },
    {
      title: "Full Stack Flutter Developer",
      company: "Haachi Technologies Pvt. Ltd.",
      period: "Jan 2025 - Jul 2025",
      description:
        "Responsible for designing and developing high-quality cross-platform mobile applications using Flutter and Dart. Created responsive UIs, wrote clean code, and integrated Firebase services.",
    },
    {
      title: "Flutter Developer Intern",
      company: "Haachi Technologies Pvt. Ltd.",
      period: "Jan 2025 - Mar 2025",
      description:
        "Contributed to cross-platform mobile application development. Designed responsive UI components, integrated Firebase services, and collaborated in an agile environment.",
    },
  ],
  education: [
    {
      degree: "B.Sc (Computer Science)",
      institution: "University of Central Punjab, Lahore",
      period: "Oct 2019 - Feb 2025",
      grade: "FYP A Grade",
      description:
        "Acquired comprehensive knowledge in Programming, OOP, Data Structures, and Algorithms. Gained hands-on experience in Mobile Development, AI, and Machine Learning.",
    },
    {
      degree: "F.Sc (Pre-Engineering)",
      institution: "Punjab College, Multan",
      period: "May 2017 - June 2019",
      description:
        "Built a solid foundation in Mathematics, Physics, and Chemistry with focus on analytical problem-solving and logical thinking.",
    },
  ],
  projects: projects.slice(0, 6).map((p) => ({
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    technologies: p.technologies,
    features: p.features.slice(0, 5),
    period: p.period,
  })),
}

export async function generatePortfolioPDF(): Promise<Blob> {
  const JsPDF = await loadJsPDF()
  if (!JsPDF) {
    throw new Error("jsPDF failed to load")
  }

  const doc = new JsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - margin * 2
  let yPos = margin

  // Helper function to add a new page if needed
  const checkPageBreak = (requiredHeight: number) => {
    if (yPos + requiredHeight > pageHeight - margin) {
      doc.addPage()
      yPos = margin
      return true
    }
    return false
  }

  // Helper function to add text with word wrap
  const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = "#000000") => {
    doc.setFontSize(fontSize)
    doc.setTextColor(color)
    if (isBold) {
      doc.setFont("helvetica", "bold")
    } else {
      doc.setFont("helvetica", "normal")
    }

    const lines = doc.splitTextToSize(text, contentWidth)
    const lineHeight = fontSize * 0.4

    if (checkPageBreak(lines.length * lineHeight + 5)) {
      // If new page was added, re-add the text
      const newLines = doc.splitTextToSize(text, contentWidth)
      doc.text(newLines, margin, yPos)
      yPos += newLines.length * lineHeight + 5
    } else {
      doc.text(lines, margin, yPos)
      yPos += lines.length * lineHeight + 5
    }
  }

  // Helper function to add a section header
  const addSectionHeader = (title: string) => {
    checkPageBreak(20)
    // Add spacing before section if not at top of page
    if (yPos > margin + 10) {
      yPos += 8
    }
    doc.setDrawColor(0, 102, 204)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 4
    addText(title, 16, true, "#0066cc")
    yPos += 5
  }

  // Cover Page - Only on first page
  doc.setFillColor(0, 102, 204)
  doc.rect(0, 0, pageWidth, 50, "F")
  
  doc.setTextColor("#FFFFFF")
  doc.setFontSize(28)
  doc.setFont("helvetica", "bold")
  const nameLines = doc.splitTextToSize(portfolioData.name, pageWidth - margin * 2)
  const nameY = 25
  doc.text(nameLines, pageWidth / 2, nameY, { align: "center" })
  
  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  const titleLines = doc.splitTextToSize(portfolioData.title, pageWidth - margin * 2)
  const titleY = nameY + (nameLines.length * 8) + 8
  doc.text(titleLines, pageWidth / 2, titleY, { align: "center" })
  
  doc.setTextColor("#000000")
  yPos = 70

  // Contact Information
  doc.setFontSize(10)
  doc.setTextColor("#000000")
  doc.setFont("helvetica", "normal")
  doc.text(`Email: ${portfolioData.email}`, margin, yPos)
  yPos += 6
  if (portfolioData.location) {
    doc.text(`Location: ${portfolioData.location}`, margin, yPos)
    yPos += 6
  }
  yPos += 5

  // Bio
  addSectionHeader("About Me")
  addText(portfolioData.bio, 11)
  yPos += 5

  // Skills
  addSectionHeader("Skills & Expertise")
  portfolioData.skills.forEach((skillGroup) => {
    checkPageBreak(15)
    addText(`${skillGroup.category}:`, 11, true)
    addText(skillGroup.items.join(" • "), 10)
    yPos += 2
  })
  yPos += 3

  // Experience
  addSectionHeader("Professional Experience")
  portfolioData.experiences.forEach((exp) => {
    checkPageBreak(25)
    addText(exp.title, 12, true)
    addText(`${exp.company} | ${exp.period}`, 10, false, "#666666")
    addText(exp.description, 10)
    yPos += 5
  })
  yPos += 3

  // Education
  addSectionHeader("Education")
  portfolioData.education.forEach((edu) => {
    checkPageBreak(20)
    addText(edu.degree, 12, true)
    addText(`${edu.institution} | ${edu.period}`, 10, false, "#666666")
    if (edu.grade) {
      addText(`Grade: ${edu.grade}`, 10, false, "#0066cc")
    }
    addText(edu.description, 10)
    yPos += 5
  })
  yPos += 3

  // Projects
  addSectionHeader("Featured Projects")
  portfolioData.projects.forEach((project, index) => {
    checkPageBreak(35)
    addText(`${index + 1}. ${project.title}`, 12, true)
    addText(project.subtitle, 10, false, "#666666")
    addText(`Period: ${project.period}`, 9, false, "#999999")
    addText(project.description, 10)
    
    doc.setFontSize(9)
    doc.setTextColor("#0066cc")
    doc.text(`Technologies: ${project.technologies.slice(0, 6).join(", ")}`, margin, yPos)
    yPos += 5
    
    doc.setFontSize(9)
    doc.setTextColor("#000000")
    doc.text(`Features: ${project.features.join(" • ")}`, margin, yPos)
    yPos += 8
  })

  // Footer on each page (skip cover page)
  const addFooter = () => {
    const totalPages = doc.getNumberOfPages()
    for (let i = 2; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor("#999999")
      doc.text(
        `Portfolio - ${portfolioData.name} | Page ${i - 1} of ${totalPages - 1}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      )
      doc.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        pageWidth / 2,
        pageHeight - 5,
        { align: "center" }
      )
    }
  }

  addFooter()

  // Generate blob
  const pdfBlob = doc.output("blob")
  return pdfBlob
}

export async function downloadPortfolioPDF(filename: string = "Muhammad_Humayun_Amar_Portfolio.pdf") {
  try {
    const blob = await generatePortfolioPDF()
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}
