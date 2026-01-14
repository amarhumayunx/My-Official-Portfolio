"use server"

import { z } from "zod"
import { Resend } from "resend"
import { checkRateLimit } from "@/lib/rate-limit"
import { headers } from "next/headers"

// Get API key from environment variables for security
const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY

if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set in environment variables")
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

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
    // Rate limiting - use email as identifier
    const email = formData.get("email") as string
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
    const identifier = email || ip

    const rateLimit = checkRateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 3, // Max 3 requests per 15 minutes
      identifier,
    })

    if (!rateLimit.allowed) {
      const resetMinutes = Math.ceil((rateLimit.resetTime - Date.now()) / 60000)
      return {
        success: false,
        message: `Too many requests. Please try again in ${resetMinutes} minute(s).`,
      }
    }

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

    // Create the enhanced email HTML content for light mode
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
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.7;
      color: #1a202c;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
    }
    
    .email-wrapper {
      max-width: 700px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      position: relative;
    }
    
    .email-wrapper::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 35px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .header-content {
      position: relative;
      z-index: 2;
    }
    
    .header h1 {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 12px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      letter-spacing: -0.5px;
    }
    
    .header .subtitle {
      font-size: 18px;
      opacity: 0.95;
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    .header .date-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    .section {
      padding: 35px 40px;
      border-bottom: 1px solid #e2e8f0;
      position: relative;
    }
    
    .section:last-of-type {
      border-bottom: none;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f7fafc;
    }
    
    .section-icon {
      font-size: 24px;
      margin-right: 12px;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
    
    .section-title {
      color: #2d3748;
      font-size: 22px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.3px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .info-card {
      background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
      padding: 24px;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      position: relative;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    
    .info-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
    
    .info-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    .info-label {
      font-weight: 600;
      color: #4a5568;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
    }
    
    .info-label::before {
      content: '●';
      color: #667eea;
      margin-right: 6px;
      font-size: 8px;
    }
    
    .info-value {
      color: #1a202c;
      font-size: 17px;
      font-weight: 600;
      line-height: 1.4;
    }
    
    .description-container {
      background: linear-gradient(135deg, #ebf8ff 0%, #f0fff4 100%);
      padding: 28px;
      border-radius: 16px;
      border: 1px solid #bee3f8;
      margin: 20px 0;
      position: relative;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
    }
    
    .description-container::before {
      content: '💬';
      position: absolute;
      top: -12px;
      left: 20px;
      background: #ffffff;
      padding: 8px;
      border-radius: 50%;
      font-size: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .description-text {
      color: #2d3748;
      font-size: 16px;
      line-height: 1.7;
      margin-top: 8px;
    }
    
    .badge-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 20px 0;
    }
    
    .badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 10px 18px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .badge::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    
    .badge:hover::before {
      left: 100%;
    }
    
    .badge-tech {
      background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
      box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
    }
    
    .badge-feature {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
    }
    
    .file-container {
      background: linear-gradient(135deg, #fffbeb 0%, #fef5e7 100%);
      padding: 25px;
      border-radius: 16px;
      border: 1px solid #fed7aa;
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(251, 191, 36, 0.1);
    }
    
    .file-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      color: #92400e;
      font-weight: 600;
    }
    
    .file-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0;
      border-bottom: 1px solid #fed7aa;
    }
    
    .file-item:last-child {
      border-bottom: none;
    }
    
    .file-info {
      display: flex;
      align-items: center;
    }
    
    .file-icon {
      margin-right: 12px;
      font-size: 20px;
    }
    
    .file-details h4 {
      color: #92400e;
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .file-meta {
      color: #a0aec0;
      font-size: 13px;
    }
    
    .priority-indicator {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      color: white;
      animation: pulse 2s infinite;
    }
    
    .priority-high .priority-indicator {
      background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    }
    
    .priority-urgent .priority-indicator {
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
      animation: urgentPulse 1s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }
    
    @keyframes urgentPulse {
      0%, 100% { transform: scale(1) rotate(0deg); }
      25% { transform: scale(1.2) rotate(90deg); }
      50% { transform: scale(1.1) rotate(180deg); }
      75% { transform: scale(1.2) rotate(270deg); }
    }
    
    .footer {
      background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
      color: white;
      padding: 40px 35px;
      text-align: center;
      position: relative;
    }
    
    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    }
    
    .footer h3 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .footer-description {
      font-size: 16px;
      opacity: 0.9;
      margin-bottom: 25px;
      line-height: 1.6;
    }
    
    .action-container {
      background: rgba(255, 255, 255, 0.1);
      padding: 25px;
      border-radius: 16px;
      margin: 20px auto;
      max-width: 500px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .action-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
      color: #ffffff;
    }
    
    .action-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .action-list li {
      padding: 12px 0;
      padding-left: 30px;
      position: relative;
      font-size: 15px;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.95);
    }
    
    .action-list li::before {
      content: '✨';
      position: absolute;
      left: 0;
      top: 12px;
      font-size: 16px;
    }
    
    .timestamp {
      text-align: center;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      color: #4a5568;
      font-size: 14px;
      padding: 25px;
      border-top: 1px solid #e2e8f0;
      position: relative;
    }
    
    .timestamp::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
    
    .timestamp-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    
    .timestamp-line {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }
    
    /* Mobile Portrait Styles */
    @media (max-width: 600px) {
      body { 
        padding: 10px; 
      }
      
      .email-wrapper {
        border-radius: 12px;
        margin: 0;
      }
      
      .header {
        padding: 30px 20px;
      }
      
      .header h1 {
        font-size: 26px;
        line-height: 1.2;
      }
      
      .header .subtitle {
        font-size: 16px;
      }
      
      .section { 
        padding: 25px 20px; 
      }
      
      .section-title {
        font-size: 20px;
      }
      
      .info-grid { 
        grid-template-columns: 1fr;
        gap: 15px;
      }
      
      .info-card {
        padding: 20px;
      }
      
      .info-value {
        font-size: 16px;
      }
      
      .description-container {
        padding: 20px;
      }
      
      .badge-container {
        gap: 8px;
      }
      
      .badge {
        padding: 8px 14px;
        font-size: 13px;
      }
      
      .footer {
        padding: 30px 20px;
      }
      
      .footer h3 {
        font-size: 20px;
      }
      
      .action-container {
        padding: 20px;
        margin: 15px auto;
      }
      
      .timestamp {
        padding: 20px;
        font-size: 13px;
      }
    }
    
    /* Mobile Landscape Styles */
    @media (max-width: 900px) and (orientation: landscape) {
      body {
        padding: 15px 20px;
      }
      
      .email-wrapper {
        max-width: 100%;
        margin: 0;
      }
      
      .header {
        padding: 25px 30px;
      }
      
      .header h1 {
        font-size: 28px;
      }
      
      .section {
        padding: 25px 30px;
      }
      
      .section-title {
        font-size: 21px;
      }
      
      .info-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
      }
      
      .info-card {
        padding: 20px;
      }
      
      .description-container {
        padding: 24px;
      }
      
      .badge {
        padding: 8px 16px;
        font-size: 13px;
      }
      
      .footer {
        padding: 30px;
      }
      
      .action-container {
        padding: 20px;
      }
      
      .timestamp {
        padding: 20px;
      }
    }
    
    /* Tablet Landscape Styles */
    @media (min-width: 601px) and (max-width: 1024px) and (orientation: landscape) {
      .email-wrapper {
        max-width: 900px;
        margin: 0 auto;
      }
      
      .header {
        padding: 35px 30px;
      }
      
      .section {
        padding: 30px 35px;
      }
      
      .info-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 18px;
      }
      
      .badge-container {
        gap: 10px;
      }
      
      .footer {
        padding: 35px 30px;
      }
    }
    
    /* Small Mobile Landscape */
    @media (max-width: 480px) and (orientation: landscape) {
      .header h1 {
        font-size: 22px;
      }
      
      .section-title {
        font-size: 18px;
      }
      
      .info-grid {
        gap: 12px;
        grid-template-columns: 1fr;
      }
      
      .badge {
        font-size: 12px;
        padding: 6px 12px;
      }
    }
    
    /* Large Mobile Landscape */
    @media (min-width: 481px) and (max-width: 600px) and (orientation: landscape) {
      .info-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      
      .info-card {
        padding: 18px;
      }
    }
    
    /* Print Styles */
    @media print {
      body {
        background: white !important;
        padding: 0 !important;
      }
      
      .email-wrapper {
        box-shadow: none !important;
        border: 1px solid #ccc !important;
      }
      
      .header::before,
      .badge::before,
      .priority-indicator {
        display: none !important;
      }
      
      .badge {
        background: #f0f0f0 !important;
        color: #333 !important;
        box-shadow: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <div class="header-content">
        <h1>🚀 New Project Request</h1>
        <div class="subtitle">Professional Inquiry Received</div>
        <div class="date-badge">📅 ${formattedDate}</div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <div class="section-icon">👤</div>
        <h3 class="section-title">Contact Information</h3>
      </div>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-label">Full Name</div>
          <div class="info-value">${escapeHtml(data.name)}</div>
        </div>
        <div class="info-card">
          <div class="info-label">Email Address</div>
          <div class="info-value">${escapeHtml(data.email)}</div>
        </div>
        ${
          data.company
            ? `
        <div class="info-card">
          <div class="info-label">Company</div>
          <div class="info-value">${escapeHtml(data.company)}</div>
        </div>
        `
            : ""
        }
        ${
          data.phone
            ? `
        <div class="info-card">
          <div class="info-label">Phone Number</div>
          <div class="info-value">${escapeHtml(data.phone)}</div>
        </div>
        `
            : ""
        }
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon">🚀</div>
        <h3 class="section-title">Project Details</h3>
      </div>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-label">Project Type</div>
          <div class="info-value">${escapeHtml(projectTypeMap[data.projectType] || data.projectType)}</div>
        </div>
        <div class="info-card">
          <div class="info-label">Budget Range</div>
          <div class="info-value">${escapeHtml(budgetMap[data.budget] || data.budget)}</div>
        </div>
        <div class="info-card">
          <div class="info-label">Timeline</div>
          <div class="info-value">${escapeHtml(timelineMap[data.timeline] || data.timeline)}</div>
        </div>
      </div>
      
      <div class="description-container">
        <div class="info-label" style="margin-bottom: 12px;">Project Description</div>
        <div class="description-text">
          ${formatDescription(data.description)}
        </div>
      </div>
    </div>

    ${
      technologies.length > 0 || features.length > 0 || data.additionalInfo
        ? `
    <div class="section">
      <div class="section-header">
        <div class="section-icon">⚙️</div>
        <h3 class="section-title">Technical Requirements</h3>
      </div>
      ${
        technologies.length > 0
          ? `
      <div class="info-label" style="margin-bottom: 15px;">Preferred Technologies</div>
      <div class="badge-container">
        ${technologies.map((tech: string) => `<span class="badge badge-tech">${escapeHtml(tech)}</span>`).join("")}
      </div>
      `
          : ""
      }
      
      ${
        features.length > 0
          ? `
      <div class="info-label" style="margin-bottom: 15px;">Required Features</div>
      <div class="badge-container">
        ${features.map((feature: string) => `<span class="badge badge-feature">${escapeHtml(feature)}</span>`).join("")}
      </div>
      `
          : ""
      }
      
      ${
        data.additionalInfo
          ? `
      <div class="description-container" style="margin-top: 25px;">
        <div class="info-label" style="margin-bottom: 12px;">Additional Information</div>
        <div class="description-text">
          ${formatDescription(data.additionalInfo)}
        </div>
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
      <div class="section-header">
        <div class="section-icon">📋</div>
        <h3 class="section-title">Additional Details</h3>
      </div>
      
      ${
        fileInfo.length > 0
          ? `
      <div class="file-container">
        <div class="file-header">
          📎 Uploaded Files (${fileInfo.length})
        </div>
        ${fileInfo
          .map(
            (file) => `
        <div class="file-item">
          <div class="file-info">
            <div class="file-icon">📄</div>
            <div class="file-details">
              <h4>${escapeHtml(file.name)}</h4>
              <div class="file-meta">${(file.size / 1024 / 1024).toFixed(2)} MB • ${escapeHtml(file.type)}</div>
            </div>
          </div>
        </div>
        `,
          )
          .join("")}
      </div>
      `
          : ""
      }
      
      <div class="info-grid" style="margin-top: 25px;">
        ${
          data.preferredContact
            ? `
        <div class="info-card">
          <div class="info-label">Preferred Contact</div>
          <div class="info-value">${escapeHtml(contactMap[data.preferredContact] || data.preferredContact)}</div>
        </div>
        `
            : ""
        }
        
        ${
          data.urgency
            ? `
        <div class="info-card ${data.urgency === "urgent" ? "priority-urgent" : data.urgency === "high" ? "priority-high" : ""}">
          <div class="info-label">Urgency Level</div>
          <div class="info-value">${escapeHtml(urgencyMap[data.urgency] || data.urgency)}</div>
          ${
            data.urgency === "urgent" || data.urgency === "high"
              ? `<div class="priority-indicator">${data.urgency === "urgent" ? "🚨" : "⚡"}</div>`
              : ""
          }
        </div>
        `
            : ""
        }
        
        ${
          data.hearAbout
            ? `
        <div class="info-card">
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
      <div class="footer-description">
        This is a comprehensive project request that requires your professional attention. 
        Respond promptly to maintain your excellent reputation and secure this opportunity.
      </div>
      
      <div class="action-container">
        <div class="action-title">🎯 Recommended Actions</div>
        <ul class="action-list">
          <li>Review all project requirements and technical specifications</li>
          <li>Prepare thoughtful questions for the initial consultation</li>
          <li>Schedule a discovery call within 24-48 hours</li>
          <li>Create a detailed proposal with timeline and investment</li>
          <li>Send a professional follow-up acknowledging receipt</li>
        </ul>
      </div>
    </div>

    <div class="timestamp">
      <div class="timestamp-content">
        <div class="timestamp-line">
          <span>📧</span>
          <em>Sent from Muhammad Humayun Amar's Portfolio Website</em>
        </div>
        <div class="timestamp-line">
          <span>⏰</span>
          <em>Submitted on ${formattedDateTime}</em>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
    }

    // Check if Resend is configured
    if (!resend) {
      console.error("Resend is not configured. Please set RESEND_API_KEY in environment variables.")
      return {
        success: false,
        message: "Email service is not configured. Please contact me directly at amarhumayun@outlook.com",
      }
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
