# Quick Reference Guide - UI Enhancements

## 🎯 Keyboard Shortcuts

- **Cmd+K / Ctrl+K** - Open search modal
- **/** - Open quick jump menu
- **Esc** - Close modals/menus
- **Arrow Keys** - Navigate in search/jump menus
- **Enter** - Select item in search/jump menus

## 🎨 Component Quick Reference

### Buttons
```tsx
// Enhanced button with ripple and loading
<EnhancedButton 
  loading={isLoading}
  ripple={true}
  gradient={true}
>
  Submit
</EnhancedButton>
```

### Cards
```tsx
// Enhanced card with hover effects
<EnhancedCard
  hoverEffect="tilt" // lift | glow | scale | tilt | none
  imageOverlay={true}
  showStats={true}
  stats={[{ label: "Views", value: 1000 }]}
>
  Content
</EnhancedCard>
```

### Forms
```tsx
// Enhanced form field
<EnhancedFormField
  label="Email"
  name="email"
  type="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  autoSave={true}
  onSave={handleSave}
/>
```

### Tooltips
```tsx
<Tooltip content="Helpful information" side="top">
  <Button>Hover me</Button>
</Tooltip>
```

### Animations
```tsx
// Stagger container
<StaggerContainer>
  {items.map(item => (
    <motion.div key={item.id}>{item.content}</motion.div>
  ))}
</StaggerContainer>

// Scroll reveal
<ScrollReveal>
  <div>Content that reveals on scroll</div>
</ScrollReveal>

// Magnetic hover
<Magnetic strength={0.3}>
  <Button>Hover for magnetic effect</Button>
</Magnetic>
```

### Loading States
```tsx
// Skeleton loaders
<CardSkeleton />
<TextSkeleton lines={3} />
<EnhancedSkeleton variant="circular" width={40} height={40} />
```

### Ratings & Stats
```tsx
// Animated rating
<AnimatedRating rating={4.5} maxRating={5} showValue={true} />

// Client stats
<ClientStats />
```

### Modals
```tsx
// Project preview
<ProjectPreviewModal
  project={project}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>
```

### Reading Features
```tsx
// Reading progress (add to blog pages)
<ReadingProgress />

// Reading time
<ReadingTime content={blogContent} />

// Table of contents
<TableOfContents items={tocItems} />
```

### Celebrations
```tsx
// Confetti
<Confetti trigger={showConfetti} count={50} />
```

## 🎨 CSS Classes

### Animations
- `.gradient-animated` - Animated gradient background
- `.card-3d` - 3D tilt effect
- `.glass-enhanced` - Enhanced glassmorphism
- `.text-gradient-animated` - Animated text gradient
- `.magnetic` - Magnetic hover effect
- `.particle-bg` - Particle background
- `.skeleton-enhanced` - Enhanced skeleton
- `.ripple` - Ripple effect

### Accessibility
- `[data-font-size="small|medium|large"]` - Font size
- `.high-contrast` - High contrast mode
- `.reduce-motion` - Reduced motion

## 📱 Mobile Features

- **Bottom Navigation** - Automatically appears on mobile
- **Touch Targets** - All buttons are 44x44px minimum
- **Swipe Gestures** - Infrastructure ready

## ♿ Accessibility

- **Accessibility Controls** - Bottom-right button
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader** - Announcements for dynamic content
- **Focus Indicators** - Enhanced focus states

## 🎯 Common Patterns

### Replace Button
```tsx
// Before
<Button>Click me</Button>

// After
<EnhancedButton ripple gradient>Click me</EnhancedButton>
```

### Add Tooltip
```tsx
<Tooltip content="This button does something">
  <Button>Click me</Button>
</Tooltip>
```

### Add Loading State
```tsx
{isLoading ? (
  <CardSkeleton />
) : (
  <Card>Content</Card>
)}
```

### Add Animation
```tsx
<ScrollReveal>
  <Card>Animated card</Card>
</ScrollReveal>
```

## 🔧 Configuration

### Accessibility Settings
- Access via bottom-right button
- Settings persist in localStorage
- Options: Font size, High contrast, Reduced motion

### Theme
- Use `ThemeSelector` component
- Supports: Light, Dark, System
- Smooth transitions

## 📚 Import Paths

All components are in `@/components/ui/`:
```tsx
import { EnhancedButton } from "@/components/ui/EnhancedButton"
import { Tooltip } from "@/components/ui/Tooltip"
import { StaggerContainer } from "@/components/ui/AnimationUtils"
```

## 🎨 Design Tokens

Use CSS variables for theming:
- `hsl(var(--primary))` - Primary color
- `hsl(var(--background))` - Background
- `hsl(var(--foreground))` - Text color
- `hsl(var(--muted))` - Muted background

## 🚀 Performance Tips

1. Use `StaggerContainer` for list animations
2. Use `ScrollReveal` for scroll-triggered animations
3. Use `EnhancedSkeleton` for loading states
4. Respect `prefers-reduced-motion` (automatic)

## 🐛 Troubleshooting

### Component not rendering
- Check import path
- Verify component is exported
- Check for TypeScript errors

### Animations not working
- Check `prefers-reduced-motion` setting
- Verify Framer Motion is installed
- Check browser console for errors

### Styles not applying
- Verify Tailwind classes
- Check CSS file is imported
- Verify class names are correct

---

**Need Help?** Check `IMPLEMENTATION_SUMMARY.md` for detailed documentation.
