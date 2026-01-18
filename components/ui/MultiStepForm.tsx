"use client"

import type React from "react"
import { sendMultiStepContactMessage } from "@/app/actions/contact"
import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  MessageSquare,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  X,
  Clock,
  Briefcase,
  Bug,
  Check,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface FormData {
  // Step 1: Basic Info
  name: string
  email: string
  company: string
  phone: string

  // Step 2: Project Details
  projectType: string
  budget: string
  timeline: string
  description: string

  // Step 3: Requirements
  technologies: string[]
  features: string[]
  additionalInfo: string

  // Step 4: Files & Final Details
  files: File[]
  preferredContact: string
  urgency: string
  hearAbout: string
}

interface StepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

const PROJECT_TYPES = [
  { id: "mobile-app", label: "Mobile App", icon: "📱" },
  { id: "web-app", label: "Web Application", icon: "🌐" },
  { id: "website", label: "Website", icon: "💻" },
  { id: "consultation", label: "Consultation", icon: "💡" },
  { id: "maintenance", label: "Maintenance", icon: "🔧" },
  { id: "other", label: "Other", icon: "❓" },
]

const BUDGET_RANGES = [
  { id: "under-5k", label: "Under Rs 5,000", icon: "💰" },
  { id: "5k-15k", label: "Rs 5,000 - Rs 15,000", icon: "💰💰" },
  { id: "15k-50k", label: "Rs 15,000 - Rs 50,000", icon: "💰💰💰" },
  { id: "50k-plus", label: "Rs 50,000+", icon: "💰💰💰💰" },
  { id: "discuss", label: "Let's Discuss", icon: "💬" },
]

const TIMELINE_OPTIONS = [
  { id: "asap", label: "ASAP", icon: "🚀" },
  { id: "1-month", label: "Within 1 Month", icon: "📅" },
  { id: "3-months", label: "Within 3 Months", icon: "📅" },
  { id: "6-months", label: "Within 6 Months", icon: "📅" },
  { id: "flexible", label: "Flexible", icon: "⏰" },
]

const TECHNOLOGIES = [
  "Flutter",
  "Android (Kotlin)",
  "Cross Platform Application",
  "Other",
]

const FEATURES = [
  "User Authentication",
  "Push Notifications",
  "Real-time Chat",
  "Geolocation",
  "Camera/Photo",
  "Social Media Integration",
  "Analytics",
  "Admin Dashboard",
  "API Integration",
  "Offline Functionality",
  "Multi-language Support",
]

// Step 1: Basic Information
const BasicInfoStep = ({ formData, updateFormData, errors }: StepProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div className="text-center mb-8">
      <User className="w-12 h-12 text-primary mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">Let's Get to Know You</h3>
      <p className="text-muted-foreground">Tell us about yourself and your organization</p>
    </div>

    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name *
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="John Doe"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email Address *
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="john@example.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>
    </div>

    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium">
          Company/Organization
        </label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => updateFormData({ company: e.target.value })}
          placeholder="Acme Inc."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          placeholder="+92 123 4567890"
        />
      </div>
    </div>
  </motion.div>
)

// Step 2: Project Details
const ProjectDetailsStep = ({ formData, updateFormData, errors }: StepProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div className="text-center mb-8">
      <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">Project Overview</h3>
      <p className="text-muted-foreground">Help us understand your project requirements</p>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Project Type *</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PROJECT_TYPES.map((type) => (
          <motion.button
            key={type.id}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateFormData({ projectType: type.id })}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
              formData.projectType === type.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="text-2xl mb-2">{type.icon}</div>
            <div className="text-sm font-medium">{type.label}</div>
          </motion.button>
        ))}
      </div>
      {errors.projectType && <p className="text-sm text-red-600">{errors.projectType}</p>}
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Budget Range *</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BUDGET_RANGES.map((budget) => (
          <motion.button
            key={budget.id}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateFormData({ budget: budget.id })}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left flex items-center gap-3 ${
              formData.budget === budget.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <span className="text-xl">{budget.icon}</span>
            <span className="font-medium">{budget.label}</span>
          </motion.button>
        ))}
      </div>
      {errors.budget && <p className="text-sm text-red-600">{errors.budget}</p>}
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Timeline *</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TIMELINE_OPTIONS.map((timeline) => (
          <motion.button
            key={timeline.id}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateFormData({ timeline: timeline.id })}
            className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
              formData.timeline === timeline.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="text-lg mb-1">{timeline.icon}</div>
            <div className="text-sm font-medium">{timeline.label}</div>
          </motion.button>
        ))}
      </div>
      {errors.timeline && <p className="text-sm text-red-600">{errors.timeline}</p>}
    </div>

    <div className="space-y-2">
      <label htmlFor="description" className="text-sm font-medium">
        Project Description *
      </label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => updateFormData({ description: e.target.value })}
        placeholder="Describe your project, goals, and any specific requirements..."
        rows={4}
        className={errors.description ? "border-red-500" : ""}
      />
      {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
    </div>
  </motion.div>
)

// Step 3: Technical Requirements
const RequirementsStep = ({ formData, updateFormData }: StepProps) => {
  const toggleTechnology = (tech: string) => {
    const current = formData.technologies || []
    const updated = current.includes(tech) ? current.filter((t) => t !== tech) : [...current, tech]
    updateFormData({ technologies: updated })
  }

  const toggleFeature = (feature: string) => {
    const current = formData.features || []
    const updated = current.includes(feature) ? current.filter((f) => f !== feature) : [...current, feature]
    updateFormData({ features: updated })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Technical Requirements</h3>
        <p className="text-muted-foreground">Select the technologies and features you need</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Preferred Technologies</label>
        <div className="flex flex-wrap gap-2">
          {TECHNOLOGIES.map((tech) => (
            <motion.button
              key={tech}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleTechnology(tech)}
              className="transition-all duration-200"
            >
              <Badge
                variant={formData.technologies?.includes(tech) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {tech}
              </Badge>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Required Features</label>
        <div className="flex flex-wrap gap-2">
          {FEATURES.map((feature) => (
            <motion.button
              key={feature}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFeature(feature)}
              className="transition-all duration-200"
            >
              <Badge
                variant={formData.features?.includes(feature) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {feature}
              </Badge>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="additionalInfo" className="text-sm font-medium">
          Additional Information
        </label>
        <Textarea
          id="additionalInfo"
          value={formData.additionalInfo}
          onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
          placeholder="Any additional requirements, constraints, or information you'd like to share..."
          rows={4}
        />
      </div>
    </motion.div>
  )
}

// Step 4: Files and Final Details
const FilesStep = ({ formData, updateFormData, errors }: StepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const currentFiles = formData.files || []
    const updatedFiles = [...currentFiles, ...files]
    updateFormData({ files: updatedFiles })
  }

  const removeFile = (index: number) => {
    const updatedFiles = formData.files.filter((_, i) => i !== index)
    updateFormData({ files: updatedFiles })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Files & Final Details</h3>
        <p className="text-muted-foreground">Upload any relevant files and complete your request</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Upload Files (Optional)</label>
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop files here</p>
          <p className="text-xs text-muted-foreground">Supported: PDF, DOC, DOCX, PNG, JPG, ZIP (Max 10MB each)</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {formData.files && formData.files.length > 0 && (
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium">Uploaded Files:</p>
            {formData.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="preferredContact" className="text-sm font-medium">
            Preferred Contact Method
          </label>
          <select
            id="preferredContact"
            value={formData.preferredContact}
            onChange={(e) => updateFormData({ preferredContact: e.target.value })}
            className="w-full p-2 border border-border rounded-md bg-background"
          >
            <option value="">Select method</option>
            <option value="email">Email</option>
            <option value="phone">Phone Call</option>
            <option value="video">Video Call</option>
            <option value="meeting">In-Person Meeting</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="urgency" className="text-sm font-medium">
            Urgency Level
          </label>
          <select
            id="urgency"
            value={formData.urgency}
            onChange={(e) => updateFormData({ urgency: e.target.value })}
            className="w-full p-2 border border-border rounded-md bg-background"
          >
            <option value="">Select urgency</option>
            <option value="low">Low - No rush</option>
            <option value="medium">Medium - Standard timeline</option>
            <option value="high">High - Need quick response</option>
            <option value="urgent">Urgent - ASAP</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="hearAbout" className="text-sm font-medium">
          How did you hear about me?
        </label>
        <select
          id="hearAbout"
          value={formData.hearAbout}
          onChange={(e) => updateFormData({ hearAbout: e.target.value })}
          className="w-full p-2 border border-border rounded-md bg-background"
        >
          <option value="">Select source</option>
          <option value="google">Google Search</option>
          <option value="linkedin">LinkedIn</option>
          <option value="github">GitHub</option>
          <option value="referral">Referral</option>
          <option value="social">Social Media</option>
          <option value="portfolio">Direct Portfolio Visit</option>
          <option value="other">Other</option>
        </select>
      </div>
    </motion.div>
  )
}

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    technologies: [],
    features: [],
    additionalInfo: "",
    files: [],
    preferredContact: "",
    urgency: "",
    hearAbout: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    success: boolean
    message: string
    debugInfo?: any // Added for debugging
  } | null>(null)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    // Clear errors for updated fields
    const updatedFields = Object.keys(data)
    setErrors((prev) => {
      const newErrors = { ...prev }
      updatedFields.forEach((field) => {
        delete newErrors[field]
      })
      return newErrors
    })
  }, [])

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = "Name is required"
        } else if (formData.name.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters"
        }
        if (!formData.email.trim()) {
          newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address"
        }
        break
      case 2:
        if (!formData.projectType) {
          newErrors.projectType = "Please select a project type"
        }
        if (!formData.budget) {
          newErrors.budget = "Please select a budget range"
        }
        if (!formData.timeline) {
          newErrors.timeline = "Please select a timeline"
        }
        if (!formData.description.trim()) {
          newErrors.description = "Project description is required"
        } else if (formData.description.trim().length < 10) {
          newErrors.description = "Description must be at least 10 characters"
        }
        break
      case 3:
        // Optional validation for step 3 - no required fields
        break
      case 4:
        // Optional validation for step 4 - no required fields
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => {
        const next = Math.min(prev + 1, totalSteps)
        // Scroll to top of form when changing steps
        window.scrollTo({ top: 0, behavior: "smooth" })
        return next
      })
    } else {
      // Scroll to first error if validation fails
      const firstErrorField = Object.keys(errors)[0]
      if (firstErrorField) {
        const errorElement = document.getElementById(firstErrorField) || document.querySelector(`[name="${firstErrorField}"]`)
        errorElement?.scrollIntoView({ behavior: "smooth", block: "center" })
        errorElement?.focus()
      }
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => {
      const previous = Math.max(prev - 1, 1)
      // Scroll to top of form when changing steps
      window.scrollTo({ top: 0, behavior: "smooth" })
      return previous
    })
  }

  const handleSubmit = async () => {
    // Validate current step first
    if (!validateStep(currentStep)) {
      // Scroll to first error if validation fails
      setTimeout(() => {
        const firstErrorField = Object.keys(errors)[0]
        if (firstErrorField) {
          const errorElement = document.getElementById(firstErrorField) || document.querySelector(`[name="${firstErrorField}"]`)
          errorElement?.scrollIntoView({ behavior: "smooth", block: "center" })
          errorElement?.focus()
        }
      }, 100)
      return
    }

    // Validate all steps before submission
    let allValid = true
    let firstInvalidStep = 0
    const allErrors: Record<string, string> = {}

    for (let step = 1; step <= totalSteps; step++) {
      const stepErrors: Record<string, string> = {}
      
      switch (step) {
        case 1:
          if (!formData.name.trim()) {
            stepErrors.name = "Name is required"
            allValid = false
          } else if (formData.name.trim().length < 2) {
            stepErrors.name = "Name must be at least 2 characters"
            allValid = false
          }
          if (!formData.email.trim()) {
            stepErrors.email = "Email is required"
            allValid = false
          } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            stepErrors.email = "Please enter a valid email address"
            allValid = false
          }
          break
        case 2:
          if (!formData.projectType) {
            stepErrors.projectType = "Please select a project type"
            allValid = false
          }
          if (!formData.budget) {
            stepErrors.budget = "Please select a budget range"
            allValid = false
          }
          if (!formData.timeline) {
            stepErrors.timeline = "Please select a timeline"
            allValid = false
          }
          if (!formData.description.trim()) {
            stepErrors.description = "Project description is required"
            allValid = false
          } else if (formData.description.trim().length < 10) {
            stepErrors.description = "Description must be at least 10 characters"
            allValid = false
          }
          break
      }

      if (Object.keys(stepErrors).length > 0) {
        Object.assign(allErrors, stepErrors)
        if (firstInvalidStep === 0) {
          firstInvalidStep = step
        }
      }
    }

    if (!allValid) {
      // Set all errors and navigate to first invalid step
      setErrors(allErrors)
      if (firstInvalidStep > 0 && firstInvalidStep !== currentStep) {
        setCurrentStep(firstInvalidStep)
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        // Scroll to first error
        setTimeout(() => {
          const firstErrorField = Object.keys(allErrors)[0]
          if (firstErrorField) {
            const errorElement = document.getElementById(firstErrorField) || document.querySelector(`[name="${firstErrorField}"]`)
            errorElement?.scrollIntoView({ behavior: "smooth", block: "center" })
            errorElement?.focus()
          }
        }, 100)
      }
      
      setSubmitResult({
        success: false,
        message: "Please complete all required fields before submitting.",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      // Create FormData for file upload
      const submitData = new FormData()

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "files") {
          // Handle file uploads
          formData.files.forEach((file, index) => {
            submitData.append(`file_${index}`, file)
          })
          submitData.append("fileCount", formData.files.length.toString())
        } else if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value))
        } else {
          submitData.append(key, value.toString())
        }
      })

      // Debug: Log what we're sending
      console.log("Submitting form data:", {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        fileCount: formData.files.length,
      })

      // Call the actual server action
      const result = await sendMultiStepContactMessage(submitData)

      console.log("Server response:", result)

      setSubmitResult({
        ...result,
        debugInfo: {
          formDataKeys: Object.keys(formData),
          fileCount: formData.files.length,
          timestamp: new Date().toISOString(),
        },
      })

      // Reset form after successful submission
      if (result.success) {
        setTimeout(() => {
          setCurrentStep(1)
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            projectType: "",
            budget: "",
            timeline: "",
            description: "",
            technologies: [],
            features: [],
            additionalInfo: "",
            files: [],
            preferredContact: "",
            urgency: "",
            hearAbout: "",
          })
          setSubmitResult(null)
        }, 5000)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitResult({
        success: false,
        message: "Sorry, there was an error submitting your request. Please try again or contact me directly.",
        debugInfo: {
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    const stepProps = { formData, updateFormData, errors }

    switch (currentStep) {
      case 1:
        return <BasicInfoStep {...stepProps} />
      case 2:
        return <ProjectDetailsStep {...stepProps} />
      case 3:
        return <RequirementsStep {...stepProps} />
      case 4:
        return <FilesStep {...stepProps} />
      default:
        return <BasicInfoStep {...stepProps} />
    }
  }

  if (submitResult?.success) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Request Submitted!</h3>
            <p className="text-muted-foreground mb-6">{submitResult.message}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Expected response time: Within 24 hours</span>
            </div>
            {/* Debug info for testing */}
            {submitResult.debugInfo && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground flex items-center gap-2">
                  <Bug className="w-4 h-4" />
                  Debug Info (for testing)
                </summary>
                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                  {JSON.stringify(submitResult.debugInfo, null, 2)}
                </pre>
              </details>
            )}
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  // Step configuration for visual indicator
  const steps = [
    { number: 1, label: "Basic Info", icon: User },
    { number: 2, label: "Project Details", icon: Briefcase },
    { number: 3, label: "Requirements", icon: MessageSquare },
    { number: 4, label: "Files & Final", icon: Upload },
  ]

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-6">
          <CardTitle className="text-2xl">Project Request Form</CardTitle>
          <div className="text-sm text-muted-foreground font-medium">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
        
        {/* Visual Step Indicator */}
        <div className="relative mb-6">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isCompleted = currentStep > step.number
              const isCurrent = currentStep === step.number
              const isUpcoming = currentStep < step.number

              return (
                <div key={step.number} className="flex flex-col items-center flex-1 relative min-w-0">
                  {/* Connector Line - Hidden on mobile, shown on larger screens */}
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden sm:block absolute top-5 left-[50%] h-0.5 ${
                        isCompleted ? "bg-primary" : "bg-border"
                      }`}
                      style={{ width: "calc(100% - 2.5rem)", transform: "translateX(0.5rem)" }}
                    />
                  )}

                  {/* Step Circle */}
                  <motion.button
                    type="button"
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                    }}
                    whileHover={!isUpcoming ? { scale: 1.05 } : {}}
                    whileTap={!isUpcoming ? { scale: 0.95 } : {}}
                    onClick={() => {
                      // Allow clicking on completed steps to go back
                      if (isCompleted || isCurrent) {
                        setCurrentStep(step.number)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    }}
                    disabled={isUpcoming}
                    className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-primary text-primary-foreground border-primary cursor-pointer hover:bg-primary/90"
                        : isCurrent
                          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                          : "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-60"
                    }`}
                    aria-label={`Step ${step.number}: ${step.label}${isCompleted ? " - Completed" : isCurrent ? " - Current" : " - Upcoming"}`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <StepIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </motion.button>

                  {/* Step Label */}
                  <div className="mt-2 text-center w-full px-1">
                    <div
                      className={`text-[10px] sm:text-xs font-medium ${
                        isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      Step {step.number}
                    </div>
                    <div
                      className={`text-[10px] sm:text-xs mt-0.5 line-clamp-2 ${
                        isCurrent ? "text-foreground font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2.5" />
      </CardHeader>

      <CardContent className="p-8">
        {submitResult && !submitResult.success && (
          <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-950">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {submitResult.message}
              {/* Debug info for troubleshooting */}
              {submitResult.debugInfo && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm">Debug Info</summary>
                  <pre className="mt-1 text-xs overflow-auto">{JSON.stringify(submitResult.debugInfo, null, 2)}</pre>
                </details>
              )}
            </AlertDescription>
          </Alert>
        )}

        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-2"
            aria-label="Go to previous step"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="text-xs text-muted-foreground hidden sm:block">
            {currentStep === totalSteps ? "Review and submit your request" : "Fill in the required fields to continue"}
          </div>

          {currentStep < totalSteps ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              disabled={isSubmitting}
              className="flex items-center gap-2"
              aria-label="Go to next step"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={handleSubmit} 
              disabled={isSubmitting} 
              className="flex items-center gap-2"
              aria-label="Submit project request"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Request</span>
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
