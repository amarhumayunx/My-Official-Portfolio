/**
 * Shared liquid-smooth animation config for Framer Motion and CSS.
 * Use these values across all components for consistent, fluid motion.
 * Tuned for softer springs and higher damping = more liquid, less bouncy.
 */

/** Soft spring: gentle entrance/exit (sections, modals, page transitions) */
export const liquidSpring = { type: "spring" as const, stiffness: 80, damping: 22 }

/** Slightly snappier: nav pills, buttons, toasts */
export const liquidSpringFast = { type: "spring" as const, stiffness: 140, damping: 24 }

/** Responsive hover/tap: buttons, cards, FAB */
export const liquidSpringHover = { type: "spring" as const, stiffness: 200, damping: 26 }

/** Very soft: parallax, scroll-in content, lazy sections */
export const liquidSpringSoft = { type: "spring" as const, stiffness: 60, damping: 20 }

/** Scroll-linked / progress UI (e.g. loading bar, scroll indicator) */
export const liquidSpringScroll = { type: "spring" as const, stiffness: 70, damping: 26 }

/** CSS cubic-bezier for liquid ease (use in transition-timing-function) */
export const liquidEase = [0.33, 1, 0.68, 1] as const

/** Ease-out liquid */
export const liquidEaseOut = [0.25, 0.46, 0.45, 0.94] as const

/** Ease-in-out for programmatic scroll (smoother than cubic) */
export const liquidEaseInOut = [0.65, 0, 0.35, 1] as const

/** Duration in seconds for tween-based transitions */
export const liquidDuration = 0.55
export const liquidDurationFast = 0.38
