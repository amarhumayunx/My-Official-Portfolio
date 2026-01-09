// Export all utility functions for easy access

// Analytics
export { analytics } from "./analytics"
export type { AnalyticsEvent } from "./analytics"

// Form Validation
export { FormValidator, ValidationPatterns, CommonValidators } from "./form-validation"
export type { ValidationRule, ValidationError } from "./form-validation"
export { createContactFormValidator, createPasswordValidator, handleFormSubmit } from "./form-utils"

// Performance
export { trackWebVitals, debounce, throttle, prefetchData, requestIdleCallback } from "./performance"

// Image Optimization
export { getOptimizedImageUrl, imageSizes, getResponsiveImageSizes } from "./image-optimization"

// Accessibility
export {
  prefersReducedMotion,
  prefersDarkMode,
  announceToScreenReader,
  addFocusVisibleStyle,
  updateAriaLiveRegion,
} from "./accessibility"
