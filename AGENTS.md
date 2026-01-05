<div align="center">

# 🤖 Agent Development Guide

**Vyoma UI • Spatial Wisdom in Code**

*For AI Assistants, Developers, and Contributors*

---

</div>

## Philosophy

> **"Design is not just what it looks like and feels like. Design is how it works."**  
> — Steve Jobs

Vyoma UI is built on the principle that **beautiful design and flawless functionality are inseparable**. Every component, every animation, every pixel serves a purpose. We don't compromise on either.

### Core Values

1. **Simplicity** — Complex problems deserve elegant solutions
2. **Consistency** — Patterns you learn once, use everywhere
3. **Craft** — Every detail matters, no exceptions
4. **Performance** — Beauty that doesn't burden
5. **Accessibility** — Design that includes everyone

---

## 🎯 Project Identity

**Name:** Vyoma UI (VUI)  
**Philosophy:** Truly Beyond UI. Designed with Spatial Wisdom Inside.  
**Foundation:** Enhanced shadcn/ui with modern design patterns  
**Approach:** Copy & paste components, not npm packages  

### Tech Stack

```
Framework:       Next.js 16.1.1 (App Router)
Runtime:         React 19.2.3
Language:        TypeScript 5.9.3
Styling:         Tailwind CSS 4.1.18
Animation:       Framer Motion (motion) + GSAP 3.14.2
Primitives:      Radix UI
Linting:         Biome 2.3.11 (ultracite/biome config)
Package Manager: pnpm (preferred), yarn, npm
```

---

## 📁 Architecture

### Directory Structure

```
vui/
├── app/                    # Next.js App Router
│   ├── [...slug]/         # Dynamic component routes
│   ├── showcase/          # Component showcase pages
│   ├── Themes/            # Theme configurations
│   └── api/               # API routes (OG images, etc.)
├── components/
│   ├── ui/                # shadcn/ui base components
│   └── vui/               # VUI enhanced components
│       ├── ai/            # AI-focused components
│       ├── backgrounds/   # Animated backgrounds
│       ├── buttons/       # Button variants
│       └── text/          # Text animations
├── data/
│   └── ComponentMapping.ts # Component registry
├── hooks/                 # Custom React hooks
├── lib/
│   └── utils.ts          # Utility functions (cn, etc.)
├── contexts/             # React contexts
└── providers/            # React providers
```

### Path Aliases

```typescript
@/*          → Root directory
@/components → components/
@/lib        → lib/
@/hooks      → hooks/
@/ui         → components/ui/
```

---

## 🎨 Design System

### Color System

**Format:** OKLCH (perceptually uniform color space)  
**Variables:** CSS custom properties with light/dark modes  
**Naming:** Semantic, not descriptive (e.g., `primary` not `blue`)

```css
:root {
  --background: oklch(0.99 0 0);
  --foreground: oklch(0 0 0);
  --primary: oklch(0 0 0);
  --primary-foreground: oklch(1 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.44 0 0);
  /* ... */
}
```

### Spacing & Layout

**Base Unit:** 4px (0.25rem)  
**Scale:** 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64  
**Approach:** Mobile-first, responsive by default

### Typography

**Sans:** Geist (primary)  
**Mono:** Geist Mono (code)  
**Serif:** Georgia (fallback)  
**Features:** `rlig`, `calt` (ligatures enabled)  
**Rendering:** Antialiased, subpixel-antialiased

### Border Radius

```typescript
--radius-sm: calc(var(--radius) - 4px)   // ~2px
--radius-md: calc(var(--radius) - 2px)   // ~6px
--radius-lg: var(--radius)                // ~8px (0.5rem)
--radius-xl: calc(var(--radius) + 4px)   // ~12px
```

### Shadows

**System:** Layered, elevation-based  
**Range:** `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`  
**Consistency:** Match theme (light/dark)

---

## 💻 Component Development Rules

### 1. Component Structure

**Every component MUST:**

```typescript
"use client";  // If using hooks or interactivity

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
// ... other imports

interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  // ... other props
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ 
    variant = "default",
    size = "md",
    children,
    className,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles (always applied)
          "relative flex items-center justify-center",
          // Variant styles
          variants[variant],
          // Size styles
          sizes[size],
          // User className (highest priority)
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = "ComponentName";
```

### 2. File Naming Conventions

```
Components:  PascalCase.tsx    (ShimmerButton.tsx)
Utilities:   camelCase.ts      (useDebounce.ts)
Types:       Inline or types.ts
Constants:   SCREAMING_SNAKE   (MAX_RETRIES)
```

### 3. TypeScript Requirements

**NEVER use `any`** — Use `unknown` or proper types  
**Props MUST have interfaces** — No inline types  
**Export types** — Make them reusable  
**Strict mode** — No bypassing type safety

### 4. Styling Rules

✅ **DO:**
- Use Tailwind utility classes
- Use `cn()` for conditional classes
- Support dark mode with `dark:` prefix
- Mobile-first responsive design
- Use CSS variables for theme values
- Include hover/focus/active states

❌ **DON'T:**
- Write inline styles (use CSS vars instead)
- Use arbitrary values without reason
- Hardcode colors (use semantic tokens)
- Forget accessibility states
- Use pixel values (use rem/em)

### 5. Animation Guidelines

**Library Preference:** Framer Motion > GSAP > CSS  
**Duration:** 150ms (micro), 300ms (default), 500ms (dramatic)  
**Easing:** `ease-in-out` (default), `cubic-bezier()` for custom  
**Performance:** Use `transform` and `opacity` only when possible

```typescript
// Framer Motion preferred pattern
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
>
  {children}
</motion.div>
```

### 6. Accessibility Checklist

Every component MUST have:

- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Focus indicators (`:focus-visible`)
- [ ] Screen reader support
- [ ] Color contrast ≥ 4.5:1 (AA standard)
- [ ] Reduced motion support (`@media (prefers-reduced-motion)`)

---

## 🔧 Development Workflow

### Adding a New Component

1. **Create component file** in appropriate directory
   ```bash
   components/vui/ComponentName.tsx
   ```

2. **Implement component** following structure rules

3. **Add to ComponentMapping.ts**
   ```typescript
   {
     name: "Component Name",
     component: ComponentNameShowcase,
     theme: ComponentNameTheme,
     route: "/category/component-name",
     path: "components/vui/ComponentName.tsx",
     description: "🎯 <b>One-liner</b> - Detailed description...",
   }
   ```

4. **Test thoroughly**
   - Light/dark mode
   - All variants
   - Mobile/tablet/desktop
   - Keyboard navigation
   - Screen reader

5. **Document usage** in showcase component

### Code Quality Standards

```bash
# Before committing
pnpm lint              # Run Biome linter
pnpm build            # Ensure no build errors
pnpm dev              # Manual testing
```

**Commit Messages:**
```
feat: add ShimmerButton component
fix: resolve dark mode contrast in Card
docs: update Installation guide
refactor: simplify animation logic in WavingText
perf: optimize BentoGrid render performance
```

---

## 🎭 Component Categories & Patterns

### AI Components

**Purpose:** Chat interfaces, AI interactions  
**Key Features:** Real-time updates, streaming support, animations  
**Examples:** MagicalChatInput, AIChat

### Backgrounds

**Purpose:** Immersive, animated backgrounds  
**Key Features:** Canvas/WebGL, performance-optimized, themeable  
**Pattern:** Full-screen, absolute positioning, low z-index

### Buttons

**Purpose:** Interactive CTAs and actions  
**Key Features:** Multiple variants, loading states, icons  
**Pattern:** Forwardable refs, disabled states, aria-labels

### Text Animations

**Purpose:** Engaging text reveals and effects  
**Key Features:** Character/word-level control, stagger effects  
**Pattern:** Configurable speed, direction, triggers

---

## 📐 Spatial Design Principles

### Spacing Hierarchy

```
Micro:    0-8px    (Internal padding, tight elements)
Small:    12-16px  (Related elements)
Medium:   24-32px  (Component sections)
Large:    48-64px  (Major sections)
XLarge:   80-120px (Page sections)
```

### Visual Rhythm

**Consistency > Variety** — Use spacing scale, don't invent  
**White Space is Design** — Breathing room enhances focus  
**Alignment Matters** — Grid-based layouts, optical alignment

### Component Composition

```typescript
// ✅ Good: Composable, flexible
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

// ❌ Bad: Monolithic, inflexible
<Card 
  title="Title" 
  description="Description" 
  content="Content"
  footer="Footer"
/>
```

---

## ⚡ Performance Guidelines

### Bundle Size

- **Tree-shakeable** — Export individual components
- **Code splitting** — Dynamic imports for heavy components
- **No unnecessary deps** — Audit regularly

### Runtime Performance

```typescript
// ✅ Optimize re-renders
const Component = memo(({ value }) => {
  const computed = useMemo(() => expensiveCalc(value), [value]);
  const callback = useCallback(() => doSomething(), []);
  return <div>{computed}</div>;
});

// ✅ Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

### Animation Performance

- Use `transform` and `opacity` for animations
- Enable hardware acceleration: `will-change`, `transform: translateZ(0)`
- Debounce/throttle scroll/resize handlers
- Use `IntersectionObserver` for scroll triggers

---

## 🛡️ Security & Best Practices

### API Keys & Secrets

**NEVER hardcode secrets** — Use environment variables  
**Client-side APIs** — Validate and rate-limit on server  
**User input** — Sanitize and validate always

### Data Handling

```typescript
// ✅ Sanitize user input
import DOMPurify from 'isomorphic-dompurify';
const clean = DOMPurify.sanitize(userInput);

// ✅ Type-safe data fetching
const data = await fetch('/api/endpoint')
  .then(res => res.json())
  .then(ComponentSchema.parse); // Zod validation
```

---

## 🧪 Testing Strategy

### Manual Testing Checklist

For every component:

- [ ] All variants render correctly
- [ ] Props work as expected
- [ ] Dark mode styling correct
- [ ] Responsive on mobile/tablet/desktop
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces correctly
- [ ] Animations smooth (60fps)
- [ ] No console errors/warnings

### Browser Support

**Primary:** Chrome, Safari, Firefox (latest 2 versions)  
**Mobile:** iOS Safari, Chrome Android  
**Fallbacks:** Graceful degradation for older browsers

---

## 📖 Documentation Standards

### Component Documentation

Every component showcase MUST include:

```typescript
export function ComponentShowcase() {
  return (
    <div className="space-y-8">
      {/* 1. Hero example */}
      <ComponentName />
      
      {/* 2. Variants demo */}
      <div className="grid gap-4">
        <ComponentName variant="default" />
        <ComponentName variant="outline" />
      </div>
      
      {/* 3. Code example */}
      <Snippet code={codeExample} />
      
      {/* 4. Props table */}
      <PropsTable />
    </div>
  );
}

// Theme customization component
export function ComponentTheme() {
  return <ThemeCustomizer options={...} />;
}
```

### Code Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Using requestAnimationFrame to sync with browser paint cycle
// This prevents layout thrashing in Safari
requestAnimationFrame(() => {
  element.style.transform = `translateY(${offset}px)`;
});

// ❌ Bad: States the obvious
// Set the transform style
element.style.transform = `translateY(${offset}px)`;
```

---

## 🚀 Release Process

### Version Bumps

```bash
pnpm version:patch  # 1.3.2 → 1.3.3 (bug fixes)
pnpm version:minor  # 1.3.2 → 1.4.0 (new features)
pnpm version:major  # 1.3.2 → 2.0.0 (breaking changes)
```

### Changelog Format

```markdown
## [1.4.0] - 2024-01-15

### ✨ Added
- New MagneticDock component with physics-based interactions
- BlurText animation with directional blur support

### 🐛 Fixed
- Dark mode contrast in Card component
- Mobile touch interactions in BeforeAfterSlider

### 🔧 Changed
- Improved animation performance in WavingText
- Updated TypeScript to 5.9.3

### ⚠️ Breaking Changes
- None
```

---

## 🎯 Decision Framework

When building or modifying components, ask:

### 1. Is it necessary?
**Simplicity first** — Can we solve this without adding complexity?

### 2. Is it consistent?
**Patterns over novelty** — Does it fit our existing design system?

### 3. Is it accessible?
**Inclusive by default** — Can everyone use this?

### 4. Is it performant?
**Speed matters** — Does it impact load time or runtime?

### 5. Is it beautiful?
**Craft counts** — Would Jony Ive approve?

If you can't answer "yes" to all five, reconsider the approach.

---

## 🤝 For AI Assistants

### When Helping Users

1. **Understand context** — Read existing code before suggesting
2. **Follow patterns** — Match the codebase style exactly
3. **Suggest, don't decide** — Offer options, explain tradeoffs
4. **Think holistically** — Consider accessibility, performance, maintainability
5. **Be precise** — No vague suggestions, provide exact code

### Code Generation Rules

```typescript
// ✅ Generate code that:
- Follows TypeScript strictly
- Uses existing utilities (cn, hooks)
- Matches file structure conventions
- Includes proper types and interfaces
- Has accessibility attributes
- Supports dark mode
- Is responsive

// ❌ Never generate code that:
- Uses 'any' type
- Hardcodes colors/spacing
- Ignores accessibility
- Uses inline styles without reason
- Copies patterns from other libraries
- Breaks existing conventions
```

### Common Tasks

**Adding component:**
1. Check ComponentMapping.ts for patterns
2. Match naming conventions exactly
3. Include showcase + theme components
4. Add to appropriate category

**Fixing bugs:**
1. Reproduce the issue
2. Check related components for similar patterns
3. Fix root cause, not symptoms
4. Test in light/dark mode

**Optimizing:**
1. Measure first (don't assume)
2. Use React DevTools, Lighthouse
3. Optimize bottlenecks, not everything
4. Document performance improvements

---

## 📚 Essential Resources

### Internal

- `data/ComponentMapping.ts` — Component registry
- `lib/utils.ts` — Utility functions
- `app/globals.css` — Design tokens, theme variables
- `components.json` — shadcn/ui configuration

### External

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Radix UI Docs](https://www.radix-ui.com/)
- [OKLCH Color Picker](https://oklch.com/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## ✨ The Vyoma Way

> **"Innovation distinguishes between a leader and a follower."**  
> — Steve Jobs

We don't just build components. We craft experiences.

Every component is an opportunity to delight developers and end-users alike. We obsess over the details others ignore. We question every decision. We iterate until it's not just good, but exceptional.

**This is not just code. This is craft.**

---

<div align="center">

**Questions?** Open an issue or discussion  
**Ideas?** We'd love to hear them  
**Contributing?** Read CONTRIBUTING.md

Made with ❤️ and spatial wisdom

</div>
