// Form validation utilities with real-time feedback

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => boolean | string
}

export interface ValidationError {
  field: string
  message: string
  type: "required" | "minLength" | "maxLength" | "pattern" | "custom"
}

export class FormValidator {
  private rules: Record<string, ValidationRule> = {}
  private errors: ValidationError[] = []

  constructor(rules: Record<string, ValidationRule>) {
    this.rules = rules
  }

  /**
   * Validate a single field
   */
  validateField(field: string, value: string): ValidationError[] {
    const errors: ValidationError[] = []
    const rule = this.rules[field]

    if (!rule) return errors

    // Required validation
    if (rule.required && !value.trim()) {
      errors.push({
        field,
        message: `${field} is required`,
        type: "required",
      })
      return errors
    }

    if (!value) return errors

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      errors.push({
        field,
        message: `${field} must be at least ${rule.minLength} characters`,
        type: "minLength",
      })
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      errors.push({
        field,
        message: `${field} must not exceed ${rule.maxLength} characters`,
        type: "maxLength",
      })
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      errors.push({
        field,
        message: `${field} format is invalid`,
        type: "pattern",
      })
    }

    // Custom validation
    if (rule.custom) {
      const result = rule.custom(value)
      if (result !== true) {
        errors.push({
          field,
          message: typeof result === "string" ? result : `${field} is invalid`,
          type: "custom",
        })
      }
    }

    return errors
  }

  /**
   * Validate entire form
   */
  validateForm(formData: Record<string, string>): ValidationError[] {
    this.errors = []

    Object.entries(formData).forEach(([field, value]) => {
      const fieldErrors = this.validateField(field, value)
      this.errors.push(...fieldErrors)
    })

    return this.errors
  }

  /**
   * Get errors for a specific field
   */
  getFieldErrors(field: string): ValidationError[] {
    return this.errors.filter((error) => error.field === field)
  }

  /**
   * Check if form has errors
   */
  hasErrors(): boolean {
    return this.errors.length > 0
  }

  /**
   * Clear errors
   */
  clearErrors() {
    this.errors = []
  }
}

// Common validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-+$$$$]{10,}$/,
  url: /^https?:\/\/.+/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
}

// Common validators
export const CommonValidators = {
  email: (value: string) => {
    return ValidationPatterns.email.test(value) || "Invalid email address"
  },
  phone: (value: string) => {
    return ValidationPatterns.phone.test(value) || "Invalid phone number"
  },
  url: (value: string) => {
    return ValidationPatterns.url.test(value) || "Invalid URL"
  },
  strongPassword: (value: string) => {
    const hasUpper = /[A-Z]/.test(value)
    const hasLower = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    const hasSpecial = /[!@#$%^&*]/.test(value)

    if (!(hasUpper && hasLower && hasNumber && hasSpecial)) {
      return "Password must contain uppercase, lowercase, number, and special character"
    }
    return true
  },
}
