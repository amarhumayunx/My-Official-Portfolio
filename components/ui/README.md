# UI Components Documentation

## Enhanced Components

### EnhancedSkeleton
Reusable skeleton loaders with multiple variants for better loading states.

**Usage:**
\`\`\`tsx
import { EnhancedSkeleton, CardSkeleton, ImageSkeleton, TextSkeleton } from "@/components/ui/EnhancedSkeleton"

// Basic skeleton
<EnhancedSkeleton variant="text" width="100%" />

// Pre-built components
<CardSkeleton />
<ImageSkeleton />
<TextSkeleton lines={3} />
<AvatarSkeleton size={40} />
<ButtonSkeleton />
\`\`\`

**Variants:**
- `default` - Standard rounded rectangle
- `circular` - Circle (for avatars)
- `text` - Text line
- `card` - Card container
- `image` - Image placeholder

### MicroInteractions
Subtle interaction feedback components for enhanced UX.

**Usage:**
\`\`\`tsx
import { MicroInteraction, RippleButton, PulseEffect, ShimmerEffect, MagneticEffect } from "@/components/ui/MicroInteractions"

// Scale interaction
<MicroInteraction variant="scale" intensity="normal">
  <Button>Click me</Button>
</MicroInteraction>

// Lift interaction
<MicroInteraction variant="lift" intensity="strong">
  <Card>Content</Card>
</MicroInteraction>

// Ripple button
<RippleButton onClick={handleClick}>
  Click for ripple effect
</RippleButton>

// Pulse effect
<PulseEffect>
  <Badge>New</Badge>
</PulseEffect>

// Shimmer effect
<ShimmerEffect>
  <div>Shimmering content</div>
</ShimmerEffect>

// Magnetic effect (follows cursor)
<MagneticEffect strength={0.3}>
  <Button>Magnetic Button</Button>
</MagneticEffect>
\`\`\`

**Variants:**
- `scale` - Scale up on hover
- `lift` - Lift up with shadow
- `glow` - Add glow effect
- `ripple` - Ripple animation

**Intensity:**
- `subtle` - Minimal movement
- `normal` - Standard movement
- `strong` - Pronounced movement

### PageTransition
Smooth page transition animations.

**Usage:**
\`\`\`tsx
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/ui/PageTransition"

// Page transition wrapper
<PageTransition variant="fade">
  <YourPageContent />
</PageTransition>

// Stagger children
<StaggerContainer staggerDelay={0.1}>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
  <StaggerItem>Item 3</StaggerItem>
</StaggerContainer>
\`\`\`

**Variants:**
- `fade` - Fade in/out
- `slide` - Slide from side
- `scale` - Scale animation
- `blur` - Blur transition

## CSS Classes

### Hover Effects
- `hover-lift` - Lift element on hover
- `hover-glow` - Add glow effect
- `hover-scale` - Scale on hover
- `hover-rotate` - Rotate on hover

### Micro-interactions
- `micro-bounce` - Bounce on click
- `micro-pulse` - Pulse animation

### Transitions
- `smooth-transition` - Standard smooth transition
- `smooth-transition-fast` - Fast transition
- `smooth-transition-slow` - Slow transition
