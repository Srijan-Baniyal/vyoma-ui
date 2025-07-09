# 🤝 Contributing to Vyoma UI

First off, **thank you** for considering contributing to Vyoma UI! 🎉

It's people like you who make open source such an amazing community. Every contribution, no matter how small, makes a difference and is deeply appreciated.

## 🌟 How You Can Contribute

We believe that everyone can contribute to making Vyoma UI better! Here are some ways you can help:

### 🐛 Found a Bug?

- **Check existing issues** first to avoid duplicates
- **Create a detailed bug report** with steps to reproduce
- **Include screenshots** or screen recordings if possible
- **Test on different devices/browsers** when relevant

### 💡 Have an Idea?

- **Browse our discussions** to see if someone else had the same idea
- **Open an issue** to discuss your feature before building
- **Share your vision** - we love hearing creative ideas!

### 🎨 Want to Add a Component?

- **Check our roadmap** to see what's planned
- **Follow our design principles** (beautiful, accessible, performant)
- **Include proper documentation** and examples

### 📝 Love Writing?

- **Improve documentation** - even fixing typos helps!
- **Write tutorials** or usage examples
- **Translate content** to other languages

## 🚀 Quick Start for Contributors

### 1. Set Up Your Environment

```bash
# Fork the repo and clone your fork
git clone https://github.com/your-username/vui.git
cd vui

# Install dependencies (we use yarn)
yarn install

# Start the development server
yarn dev
```

### 2. Create Your Branch

```bash
# Create a new branch for your feature/fix
git checkout -b feature/amazing-new-component
# or
git checkout -b fix/bug-description
```

### 3. Make Your Changes

- **Write clean, readable code**  
- **Follow our TypeScript conventions**
- **Test your changes thoroughly**
- **Add proper type definitions**

### 4. Test Everything

```bash
# Run the development server and test manually
yarn dev

# Build to ensure no build errors
yarn build

# Run linting
yarn lint
```

## 📋 Code Guidelines

### Component Structure

```typescript
// ✅ Good component structure
interface MyComponentProps {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export const MyComponent = ({ 
  variant = 'default', 
  size = 'md', 
  children, 
  className,
  ...props 
}: MyComponentProps) => {
  return (
    <div 
      className={cn(
        // base styles
        "relative flex items-center justify-center",
        // variants
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

### File Naming

- **Components**: `PascalCase.tsx` (e.g., `MagicalButton.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `componentHelpers.ts`)
- **Types**: Include in component file or `types.ts`

### Styling Guidelines

- **Use Tailwind CSS** for all styling
- **Follow mobile-first** responsive design
- **Support dark mode** with `dark:` prefixes
- **Include hover/focus states** for interactive elements
- **Use CSS variables** for theme customization

## 🎨 Design Principles

### ✨ Beautiful

- Clean, modern aesthetics
- Thoughtful use of animations
- Consistent spacing and typography

### ⚡ Performant

- Minimal bundle size impact
- Efficient re-renders
- Optimized animations

### ♿ Accessible

- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance

### 🔧 Developer-Friendly

- Excellent TypeScript support
- Clear, intuitive APIs
- Comprehensive documentation

## 📤 Submitting Your Contribution

### Pull Request Process

1. **Update documentation** for any new features
2. **Add/update examples** in the showcase
3. **Test across different browsers** if UI changes
4. **Write a clear PR description** explaining your changes

### PR Template

```markdown
## 🎯 What does this PR do?
Brief description of your changes

## 🔧 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing
- [ ] Tested in development
- [ ] Tested in production build
- [ ] Cross-browser testing (if applicable)
- [ ] Mobile testing (if applicable)

## 📷 Screenshots
Include before/after screenshots for UI changes

## 📝 Additional Notes
Any additional context or considerations
```

## 🎯 Component Contribution Checklist

When adding a new component:

- [ ] **Component file** in appropriate directory
- [ ] **TypeScript interface** with proper props
- [ ] **Responsive design** (mobile-first)
- [ ] **Dark mode support**
- [ ] **Accessibility features** (ARIA, keyboard nav)
- [ ] **Animation/transitions** using Framer Motion
- [ ] **Documentation** with usage examples
- [ ] **Add to component mapping** in `data/ComponentMapping.ts`
- [ ] **Test thoroughly** across devices

## 🌈 Community

### 💬 Need Help?

- **Open a discussion** for questions
- **Join our community** (Discord/Slack link if available)
- **Tag maintainers** in issues for urgent matters

### 🏆 Recognition

All contributors are featured in our:

- **README** acknowledgments
- **Release notes** for their contributions
- **Community showcase** (coming soon!)

## ⚡ Quick Tips for Success

1. **Start small** - Fix a typo, update docs, or tackle a "good first issue"
2. **Communicate early** - Open an issue before big changes
3. **Follow conventions** - Look at existing code for patterns
4. **Test thoroughly** - Your future self will thank you
5. **Have fun!** - This should be enjoyable, not stressful

---

## 🙏 Thank You

Your contributions make Vyoma UI better for everyone. Whether you're fixing a bug, adding a feature, or improving documentation, you're helping create something amazing.

**Happy coding!** 🚀

Questions? Reach out to [@srijanbaniyal](https://github.com/srijanbaniyal) or open an issue ✨.
