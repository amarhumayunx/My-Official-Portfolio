// Form utility functions and helpers

import { FormValidator, CommonValidators } from "./form-validation"

/**
 * Create a contact form validator
 */
export const createContactFormValidator = () => {
  return new FormValidator({
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      required: true,
      custom: CommonValidators.email,
    },
    phone: {
      minLength: 10,
      custom: (value) => {
        if (!value) return true // Optional field
        return CommonValidators.phone(value)
      },
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 5000,
    },
  })
}

/**
 * Create a password form validator
 */
export const createPasswordValidator = () => {
  return new FormValidator({
    password: {
      required: true,
      minLength: 8,
      custom: CommonValidators.strongPassword,
    },
    confirmPassword: {
      required: true,
      custom: (value, formData?) => {
        if (value !== formData?.password) {
          return "Passwords do not match"
        }
        return true
      },
    },
  })
}

/**
 * Get field error message with icon
 */
export const getFieldErrorDisplay = (fieldName: string, error: string | null) => {
  return {
    hasError: !!error,
    message: error,
    icon: error ? "⚠️" : "✓",
  }
}

/**
 * Async form submission handler
 */
export const handleFormSubmit = async (
  formData: Record<string, string>,
  validator: FormValidator,
  onSubmit: (data: Record<string, string>) => Promise<void>,
  onError?: (error: Error) => void,
) => {
  const errors = validator.validateForm(formData)

  if (errors.length > 0) {
    console.error("Form validation failed:", errors)
    return false
  }

  try {
    await onSubmit(formData)
    return true
  } catch (error) {
    console.error("Form submission error:", error)
    if (onError && error instanceof Error) {
      onError(error)
    }
    return false
  }
}
