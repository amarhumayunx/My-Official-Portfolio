"use server"

import { z } from "zod"
import { Resend } from "resend"

const RESEND_API_KEY_DEMO = "re_6NDc9ymU_9sLrmCNYgQK5p4d8nWGJU4wg"
const resend = new Resend(RESEND_API_KEY_DEMO)

const multiStepContactSchema = z.object({
  // Step 1: Basic Info
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),

  // Step 2: Project Details
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().min(1, "Budget range is required"),
  timeline: z.string().min(1, "Timeline is required"),
  description: z.string().min(10, "Project description must be at least 10 characters"),

  // Step 3: Requirements
  technologies: z.string().optional(), // JSON string
  features: z.string().optional(), // JSON string
  additionalInfo: z.string().optional(),

  // Step 4: Files & Final Details
  fileCount: z.string().optional(),
  preferredContact: z.string().optional(),
  urgency: z.string().optional(),
  hearAbout: z.string().optional(),
})

export async function sendMultiStepContactMessage(formData: FormData) {
  console.log("Server Action: sendMultiStepContactMessage started.")

  try {
    // Extract and validate form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      description: formData.get("description"),
      technologies: formData.get("technologies"),
      features: formData.get("features"),
      additionalInfo: formData.get("additionalInfo"),
      fileCount: formData.get("fileCount"),
      preferredContact: formData.get("preferredContact"),
      urgency: formData.get("urgency"),
      hearAbout: formData.get("hearAbout"),
    }

    const validatedFields = multiStepContactSchema.safeParse(rawData)

    if (!validatedFields.success) {
      console.error("Server Action: Form validation failed.", validatedFields.error.flatten().fieldErrors)
      return {
        success: false,
        message: "Please check your form data and try again.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const data = validatedFields.data

    // Parse JSON fields
    const technologies = data.technologies ? JSON.parse(data.technologies) : []
    const features = data.features ? JSON.parse(data.features) : []
    const fileCount = data.fileCount ? Number.parseInt(data.fileCount) : 0

    // Process uploaded files
    const fileInfo = []
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file_${i}`) as File
      if (file) {
        fileInfo.push({
          name: file.name,
          size: file.size,
          type: file.type,
        })
      }
    }

    // Map project type to readable format
    const projectTypeMap: Record<string, string> = {
      "mobile-app": "Mobile App",
      "web-app": "Web Application",
      website: "Website",
      consultation: "Consultation",
      maintenance: "Maintenance",
      other: "Other",
    }

    // Map budget to readable format
    const budgetMap: Record<string, string> = {
      "under-5k": "Under Rs 5,000",
      "5k-15k": "Rs 5,000 - Rs 15,000",
      "15k-50k": "Rs 15,000 - Rs 50,000",
      "50k-plus": "Rs 50,000+",
      discuss: "Let's Discuss",
    }

    // Map timeline to readable format
    const timelineMap: Record<string, string> = {
      asap: "ASAP",
      "1-month": "Within 1 Month",
      "3-months": "Within 3 Months",
      "6-months": "Within 6 Months",
      flexible: "Flexible",
    }

    // Map urgency to readable format
    const urgencyMap: Record<string, string> = {
      low: "Low - No rush",
      medium: "Medium - Standard timeline",
      high: "High - Need quick response",
      urgent: "Urgent - ASAP",
    }

    // Map contact method to readable format
    const contactMap: Record<string, string> = {
      email: "Email",
      phone: "Phone Call",
      video: "Video Call",
      meeting: "In-Person Meeting",
    }

    // Map hear about source to readable format
    const hearAboutMap: Record<string, string> = {
      google: "Google Search",
      linkedin: "LinkedIn",
      github: "GitHub",
      referral: "Referral",
      social: "Social Media",
      portfolio: "Direct Portfolio Visit",
      other: "Other",
    }

    // Create the email HTML content with proper escaping
    const createEmailHTML = () => {
      const currentDate = new Date()
      const formattedDate = currentDate.toLocaleDateString()
      const formattedDateTime = currentDate.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Karachi",
      })

      // Helper function to escape HTML
      const escapeHtml = (text: string) => {
        const div = { innerHTML: text }
        return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;")
      }

      // Helper function to format description with line breaks
      const formatDescription = (text: string) => {
        return escapeHtml(text).replace(/\n/g, "<br>")
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Request</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f8fafc;
    }
    .container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0 0;
      opacity: 0.9;
      font-size: 16px;
    }
    .section {
      padding: 25px 30px;
      border-bottom: 1px solid #e2e8f0;
    }
    .section:last-child {
      border-bottom: none;
    }
    .section-title {
      color: #1e293b;
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 20px 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 15px;
    }
    .info-item {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
    }
    .info-label {
      font-weight: 600;
      color: #475569;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .info-value {
      color: #1e293b;
      font-size: 16px;
      font-weight: 500;
    }
    .description-box {
      background: #f0f9ff;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #0ea5e9;
      margin: 15px 0;
    }
    .badge-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 15px 0;
    }
    .badge {
      background: #dcfce7;
      color: #166534;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      border: 1px solid #bbf7d0;
    }
    .badge-tech {
      background: #dbeafe;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }
    .file-list {
      background: #fefce8;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #eab308;
    }
    .file-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #fef3c7;
    }
    .file-item:last-child {
      border-bottom: none;
    }
    .priority-high {
      background: #fef2f2;
      border-left-color: #ef4444;
    }
    .priority-urgent {
      background: #fef2f2;
      border-left-color: #dc2626;
    }
    .footer {
      background: #1e293b;
      color: white;
      padding: 30px;
      text-align: center;
    }
    .footer h3 {
      color: #f1f5f9;
      margin-top: 0;
    }
    .action-list {
      list-style: none;
      padding: 0;
      margin: 15px 0;
    }
    .action-list li {
      padding: 8px 0;
      padding-left: 20px;
      position: relative;
    }
    .action-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
    }
    .timestamp {
      text-align: center;
      color: #64748b;
      font-size: 14px;
      padding: 20px;
      border-top: 1px solid #e2e8f0;
      background: #f8fafc;
    }
    
    /* Mobile Portrait Styles */
    @media (max-width: 600px) {
      body { 
        padding: 10px; 
        font-size: 14px;
      }
      .container {
        margin: 0;
        border-radius: 8px;
      }
      .header {
        padding: 20px 15px;
      }
      .header h1 {
        font-size: 22px;
        line-height: 1.2;
      }
      .header p {
        font-size: 14px;
      }
      .section { 
        padding: 20px 15px; 
      }
      .section-title {
        font-size: 18px;
        margin-bottom: 15px;
      }
      .info-grid { 
        grid-template-columns: 1fr;
        gap: 10px;
      }
      .info-item {
        padding: 12px;
      }
      .info-label {
        font-size: 13px;
      }
      .info-value {
        font-size: 15px;
      }
      .description-box {
        padding: 15px;
        font-size: 14px;
      }
      .badge-container {
        gap: 6px;
      }
      .badge {
        padding: 4px 8px;
        font-size: 12px;
      }
      .footer {
        padding: 20px 15px;
      }
      .footer h3 {
        font-size: 18px;
      }
      .action-list {
        font-size: 14px;
      }
      .file-list {
        padding: 12px;
      }
      .file-item {
        padding: 6px 0;
        font-size: 14px;
      }
      .timestamp {
        padding: 15px;
        font-size: 12px;
      }
    }
    
    /* Mobile Landscape Styles */
    @media (max-width: 900px) and (orientation: landscape) {
      body {
        padding: 15px 20px;
        font-size: 15px;
      }
      .container {
        max-width: 100%;
        margin: 0;
      }
      .header {
        padding: 25px 20px;
      }
      .header h1 {
        font-size: 24px;
      }
      .section {
        padding: 20px 25px;
      }
      .section-title {
        font-size: 19px;
        margin-bottom: 18px;
      }
      .info-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 12px;
      }
      .info-item {
        padding: 14px;
      }
      .info-label {
        font-size: 13px;
      }
      .info-value {
        font-size: 15px;
      }
      .description-box {
        padding: 18px;
        font-size: 15px;
      }
      .badge {
        padding: 5px 10px;
        font-size: 13px;
      }
      .footer {
        padding: 25px 20px;
      }
      .footer h3 {
        font-size: 19px;
      }
      .action-list {
        font-size: 15px;
      }
      .badge-container {
        justify-content: flex-start;
        gap: 8px;
      }
      .file-list {
        padding: 15px;
      }
      .timestamp {
        padding: 18px;
        font-size: 13px;
      }
    }
    
    /* Tablet Landscape Styles */
    @media (min-width: 601px) and (max-width: 1024px) and (orientation: landscape) {
      body {
        padding: 20px 30px;
        max-width: 100%;
      }
      .container {
        max-width: 900px;
        margin: 0 auto;
      }
      .header {
        padding: 30px 25px;
      }
      .header h1 {
        font-size: 26px;
      }
      .section {
        padding: 25px 30px;
      }
      .info-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 15px;
      }
      .badge-container {
        gap: 10px;
      }
      .badge {
        padding: 6px 12px;
        font-size: 14px;
      }
      .footer {
        padding: 30px 25px;
      }
    }
    
    /* Small Mobile Landscape */
    @media (max-width: 480px) and (orientation: landscape) {
      .header h1 {
        font-size: 20px;
      }
      .section-title {
        font-size: 16px;
      }
      .info-grid {
        gap: 8px;
        grid-template-columns: 1fr;
      }
      .badge {
        font-size: 11px;
        padding: 3px 6px;
      }
    }
    
    /* Large Mobile Landscape */
    @media (min-width: 481px) and (max-width: 600px) and (orientation: landscape) {
      .info-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      .info-item {
        padding: 12px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 New Project Request</h1>
      <p>From ${escapeHtml(data.name)} • ${formattedDate}</p>
    </div>
    
    <div class="section">
      <h3 class="section-title">👤 Contact Information</h3>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Full Name</div>
          <div class="info-value">${escapeHtml(data.name)}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Email Address</div>
          <div class="info-value">${escapeHtml(data.email)}</div>
        </div>
        ${
          data.company
            ? `
        <div class="info-item">
          <div class="info-label">Company</div>
          <div class="info-value">${escapeHtml(data.company)}</div>
        </div>
        `
            : ""
        }
        ${
          data.phone
            ? `
        <div class="info-item">
          <div class="info-label">Phone Number</div>
          <div class="info-value">${escapeHtml(data.phone)}</div>
        </div>
        `
            : ""
        }
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">🚀 Project Details</h3>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Project Type</div>
          <div class="info-value">${escapeHtml(projectTypeMap[data.projectType] || data.projectType)}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Budget Range</div>
          <div class="info-value">${escapeHtml(budgetMap[data.budget] || data.budget)}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Timeline</div>
          <div class="info-value">${escapeHtml(timelineMap[data.timeline] || data.timeline)}</div>
        </div>
      </div>
      
      <div class="info-label" style="margin-top: 20px; margin-bottom: 10px;">Project Description</div>
      <div class="description-box">
        ${formatDescription(data.description)}
      </div>
    </div>

    ${
      technologies.length > 0 || features.length > 0 || data.additionalInfo
        ? `
    <div class="section">
      <h3 class="section-title">⚙️ Technical Requirements</h3>
      ${
        technologies.length > 0
          ? `
      <div class="info-label">Preferred Technologies</div>
      <div class="badge-container">
        ${technologies.map((tech: string) => `<span class="badge badge-tech">${escapeHtml(tech)}</span>`).join("")}
      </div>
      `
          : ""
      }
      
      ${
        features.length > 0
          ? `
      <div class="info-label">Required Features</div>
      <div class="badge-container">
        ${features.map((feature: string) => `<span class="badge">${escapeHtml(feature)}</span>`).join("")}
      </div>
      `
          : ""
      }
      
      ${
        data.additionalInfo
          ? `
      <div class="info-label" style="margin-top: 20px;">Additional Information</div>
      <div class="description-box">
        ${formatDescription(data.additionalInfo)}
      </div>
      `
          : ""
      }
    </div>
    `
        : ""
    }

    ${
      fileInfo.length > 0 || data.preferredContact || data.urgency || data.hearAbout
        ? `
    <div class="section">
      <h3 class="section-title">📋 Additional Details</h3>
      
      ${
        fileInfo.length > 0
          ? `
      <div class="info-label">Uploaded Files (${fileInfo.length})</div>
      <div class="file-list">
        ${fileInfo
          .map(
            (file) => `
        <div class="file-item">
          <div>
            <strong>📎 ${escapeHtml(file.name)}</strong><br>
            <small style="color: #6b7280;">${(file.size / 1024 / 1024).toFixed(2)} MB • ${escapeHtml(file.type)}</small>
          </div>
        </div>
        `,
          )
          .join("")}
      </div>
      `
          : ""
      }
      
      <div class="info-grid" style="margin-top: 20px;">
        ${
          data.preferredContact
            ? `
        <div class="info-item">
          <div class="info-label">Preferred Contact</div>
          <div class="info-value">${escapeHtml(contactMap[data.preferredContact] || data.preferredContact)}</div>
        </div>
        `
            : ""
        }
        
        ${
          data.urgency
            ? `
        <div class="info-item ${data.urgency === "urgent" ? "priority-urgent" : data.urgency === "high" ? "priority-high" : ""}">
          <div class="info-label">Urgency Level</div>
          <div class="info-value">${escapeHtml(urgencyMap[data.urgency] || data.urgency)}</div>
        </div>
        `
            : ""
        }
        
        ${
          data.hearAbout
            ? `
        <div class="info-item">
          <div class="info-label">How They Found You</div>
          <div class="info-value">${escapeHtml(hearAboutMap[data.hearAbout] || data.hearAbout)}</div>
        </div>
        `
            : ""
        }
      </div>
    </div>
    `
        : ""
    }

    <div class="footer">
      <h3>📞 Next Steps</h3>
      <p>This is a comprehensive project request that requires your attention. Please respond within 24 hours to maintain your professional reputation.</p>
      
      <div style="text-align: left; max-width: 400px; margin: 0 auto;">
        <p><strong>Recommended Actions:</strong></p>
        <ul class="action-list">
          <li>Review the project requirements carefully</li>
          <li>Prepare initial questions for the client</li>
          <li>Schedule a consultation call if needed</li>
          <li>Provide a detailed proposal with timeline and pricing</li>
        </ul>
      </div>
    </div>

    <div class="timestamp">
      <em>📧 Sent from Muhammad Humayun Amar's Portfolio Website</em><br>
      <em>⏰ Submitted on ${formattedDateTime}</em>
    </div>
  </div>
</body>
</html>`
    }

    // Generate the email HTML
    const emailContent = createEmailHTML()

    // Send the email
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "amarhumayun@outlook.com",
      subject: `🚀 New Project Request: ${projectTypeMap[data.projectType]} from ${data.name}${data.urgency === "urgent" ? " [URGENT]" : data.urgency === "high" ? " [HIGH PRIORITY]" : ""}`,
      html: emailContent,
      reply_to: data.email,
    })

    if (error) {
      console.error("Server Action: Resend email error:", error)
      return {
        success: false,
        message: `Failed to send message: ${error.message || "Unknown error"}`,
      }
    }

    console.log("Server Action: Email sent successfully:", emailData)

    return {
      success: true,
      message:
        "Thank you for your detailed project request! I'll review everything and get back to you within 24 hours with next steps.",
    }
  } catch (error) {
    console.error("Server Action: Unexpected error:", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return {
      success: false,
      message: `Sorry, there was an unexpected error: ${errorMessage}. Please try again or contact me directly.`,
    }
  }
}
