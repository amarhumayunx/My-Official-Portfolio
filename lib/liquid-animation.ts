/**
 * Shared liquid-smooth animation config for Framer Motion and CSS.
 * Use these values across all components for consistent, fluid motion.
 */

/** Soft spring: gentle entrance/exit (sections, modals, page transitions) */
export const liquidSpring = { type: "spring" as const, stiffness: 100, damping: 24 }

/** Slightly snappier: nav pills, buttons, toasts */
export const liquidSpringFast = { type: "spring" as const, stiffness: 180, damping: 26 }

/** Responsive hover/tap: buttons, cards, FAB */
export const liquidSpringHover = { type: "spring" as const, stiffness: 260, damping: 28 }

/** Very soft: parallax, subtle floats */
export const liquidSpringSoft = { type: "spring" as const, stiffness: 80, damping: 22 }

/** CSS cubic-bezier for liquid ease (use in transition-timing-function) */
export const liquidEase = [0.33, 1, 0.68, 1] as const

/** Ease-out liquid */
export const liquidEaseOut = [0.25, 0.46, 0.45, 0.94] as const

/** Duration in seconds for tween-based transitions */
export const liquidDuration = 0.5
export const liquidDurationFast = 0.35
