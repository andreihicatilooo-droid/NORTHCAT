# 🎨 NORTHCAT Styles

**Global CSS Framework for Dark Gothic Tattoo Studio Brand**

---

## 📁 File Structure

```
styles/
├── main.css              # Main stylesheet (imports all others)
├── variables.css         # CSS Custom Properties (variables)
├── colors.css            # Color palette & themes
├── typography.css        # Typography & text styles
├── animations.css        # Animations & transitions
└── README.md             # This file
```

---

## 🚀 Quick Start

### Import in HTML

```html
<head>
  <!-- Main stylesheet (imports all) -->
  <link rel="stylesheet" href="/resources/styles/main.css">
</head>
```

### Or import individual files

```html
<link rel="stylesheet" href="/resources/styles/variables.css">
<link rel="stylesheet" href="/resources/styles/colors.css">
<link rel="stylesheet" href="/resources/styles/typography.css">
<link rel="stylesheet" href="/resources/styles/animations.css">
```

### Import in CSS

```css
@import url('/resources/styles/main.css');
```

### Import in SCSS/SASS

```scss
@import 'variables';
@import 'colors';
@import 'typography';
@import 'animations';
```

---

## 📋 Files Overview

### 1. **main.css** — Master Stylesheet
- Imports all other CSS files
- Global element styles (html, body, buttons, inputs)
- Layout utilities (container, grid, flex)
- Spacing, borders, shadows
- Visibility and positioning helpers
- Responsive breakpoints
- Accessibility styles

**Use for**: Complete styling framework

### 2. **variables.css** — CSS Custom Properties
- **Colors**: Primary, secondary, neutral palettes
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: 8px based scale (xs, sm, md, lg, xl, 2xl, 3xl, etc.)
- **Borders**: Border radius values
- **Shadows**: Box shadows and glow effects
- **Transitions**: Duration and timing functions
- **Breakpoints**: Responsive screen sizes
- **Z-Index**: Stacking order scale
- **Opacity**: Transparency levels
- **Aspect Ratios**: Common aspect ratios

**Use for**: Consistent design tokens across the app

**Example**:
```css
:root {
  --color-primary-pink: #f4587e;
  --font-size-xl: 24px;
  --space-lg: 24px;
  --transition-base: 0.3s ease-in-out;
}

/* Use in your styles */
h1 {
  color: var(--color-primary-pink);
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-lg);
  transition: all var(--transition-base);
}
```

### 3. **colors.css** — Color System
- **Primary Colors**: Hot Pink (#f4587e) + variants
- **Secondary Colors**: Purple (#9d4edd) + variants
- **Accent Colors**: Magenta (#e0aaff) + variants
- **Neutral Colors**: White, grays, black
- **Gradients**: Primary, dark, ghost, purple, radial
- **Theme Variants**: Dark (default), light, high-contrast
- **Utility Classes**: `.bg-primary`, `.text-pink`, `.border-secondary`, etc.
- **Status Colors**: Success, warning, error, info

**Use for**: Color management and theme switching

**Example**:
```html
<div class="bg-gradient-primary text-white p-lg border-primary">
  Hot content here!
</div>
```

**Dark/Light Theme Switching**:
```html
<!-- Add data-theme attribute to switch -->
<html data-theme="dark"><!-- Dark theme -->
<html data-theme="light"><!-- Light theme -->
<html data-theme="high-contrast"><!-- High contrast -->
```

### 4. **typography.css** — Text & Font Styles
- **Headings**: h1–h6 with consistent styling
- **Paragraphs**: Default text styles
- **Inline Elements**: strong, em, code, kbd, abbr, del, ins
- **Links**: Styled anchors with hover/visited states
- **Lists**: ul, ol, dl styling
- **Blockquotes**: Citation and quote styling
- **Tables**: Table, thead, tbody styling
- **Utility Classes**: Font weight, style, color, alignment, etc.

**Use for**: Semantic text markup and typography

**Example**:
```html
<h1>Main Heading</h1>
<p>Body text with <strong>bold</strong> and <em>italic</em></p>
<blockquote cite="#source">
  Quote text here
  <cite>— Source</cite>
</blockquote>
```

### 5. **animations.css** — Motion & Effects
- **Fade**: `fadeIn`, `fadeOut`, `fadeInUp`, `fadeInLeft`, etc.
- **Slide**: `slideUp`, `slideDown`, `slideLeft`, `slideRight`
- **Scale**: `scaleIn`, `scaleOut`, `bounce`, `pulse`
- **Glow**: `glow`, `glowPurple`, `flicker`, `shimmer`
- **Rotation**: `spin`, `spinReverse`, `sway`
- **Float**: `float`, `floatSlow`, `drift`
- **Special**: `typewriter`, `gradientShift`, `burst`, `popIn`
- **Utility Classes**: `.animate-fadeIn`, `.animate-spin`, etc.

**Use for**: Animations and interactive effects

**Example**:
```html
<div class="animate-fadeInUp">Content fades in and slides up</div>
<div class="animate-glow">Glowing effect</div>
<div class="animate-spin">Spinning animation</div>

<style>
  .my-element {
    animation: slideUp var(--duration-500) ease-out;
  }

  .my-element:hover {
    animation: glow var(--duration-1000) ease-in-out infinite;
  }
</style>
```

---

## 🎨 Color Reference

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Hot Pink** | `#f4587e` | 244, 88, 126 | Main brand color, links, accents |
| **Pink Dark** | `#d63d67` | 214, 61, 103 | Hover states, dark mode variant |
| **Pink Light** | `#ff7a96` | 255, 122, 150 | Light backgrounds, highlights |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Purple** | `#9d4edd` | 157, 78, 221 | Secondary accents, headings |
| **Magenta** | `#e0aaff` | 224, 170, 255 | Highlights, special elements |

### Neutrals

| Name | Hex | Usage |
|------|-----|-------|
| **Dark BG** | `#0c120e` | Main background |
| **White** | `#ffffff` | Text on dark backgrounds |
| **Gray** | `#999999` | Secondary text |

---

## 📏 Spacing Scale

All spacing uses a base unit of **4px**:

```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

**Usage**:
```css
margin: var(--space-lg);
padding: var(--space-md);
gap: var(--space-sm);
```

---

## 🔤 Typography Scale

```
xs: 12px
sm: 14px
base: 16px
lg: 18px
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
5xl: 80px
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Size | Device |
|-----------|------|--------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Medium tablets |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Very large screens |

**Usage**:
```css
@media (min-width: 768px) {
  /* Tablet and up */
  body { font-size: 18px; }
}

@media (max-width: 640px) {
  /* Mobile only */
  .container { padding: 0 var(--space-sm); }
}
```

---

## 💡 Common Patterns

### Hero Section

```html
<section class="hero">
  <div class="container">
    <h1 class="animate-fadeInUp">Welcome to NORTHCAT</h1>
    <p class="text-lg animate-fadeInUp delay-200">Dark Gothic Tattoo Studio</p>
    <button class="btn-primary animate-scaleIn delay-300">Book Session</button>
  </div>
</section>

<style>
  .hero {
    background: var(--gradient-dark);
    padding: var(--space-3xl) 0;
    text-align: center;
  }
</style>
```

### Card Component

```html
<div class="card">
  <img src="portfolio.jpg" alt="Tattoo work">
  <h3 class="text-pink">Sacred Geometry</h3>
  <p class="text-gray">Modern geometric tattoo design</p>
</div>

<style>
  .card {
    background: var(--color-dark-50);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    transition: all var(--transition-base);
  }

  .card:hover {
    box-shadow: var(--shadow-glow-lg);
    transform: translateY(-4px);
  }
</style>
```

### Button

```html
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
<button class="btn-outline">Outline Button</button>

<style>
  .btn-primary {
    background: var(--color-primary-pink);
    color: var(--color-dark-bg);
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--radius-sm);
    transition: all var(--transition-base);
  }

  .btn-primary:hover {
    background: var(--color-primary-dark);
    box-shadow: var(--shadow-glow-md);
  }
</style>
```

---

## 🔗 Related Files

- **[docs/VISUAL_IDENTITY.md](../../docs/VISUAL_IDENTITY.md)** — Brand guidelines
- **[resources/README.md](../README.md)** — Resources structure
- **[services/website/](../../services/website/)** — Website implementation

---

## 📚 Usage Tips

1. **Use CSS Variables** — Always use `var(--color-*)` instead of hardcoded colors
2. **Mobile First** — Write mobile styles first, then override for larger screens
3. **Semantic HTML** — Use proper heading levels (h1, h2, h3) for accessibility
4. **Accessible Colors** — Maintain sufficient contrast (WCAG AA standard)
5. **Animations** — Use for emphasis, not distraction; respect `prefers-reduced-motion`
6. **Utility Classes** — Combine utility classes for quick styling (`.flex .flex-center .gap-lg`)

---

## 🎯 Best Practices

### ✅ DO

```css
/* Use variables */
color: var(--color-primary-pink);
font-size: var(--font-size-lg);
margin: var(--space-md);

/* Use semantic HTML */
<h1>Main Heading</h1>
<h2>Subheading</h2>

/* Animate with purpose */
.btn { transition: all var(--transition-fast); }
.btn:hover { transform: scale(1.05); }
```

### ❌ DON'T

```css
/* Don't hardcode values */
color: #f4587e; /* Use variable instead */
font-size: 24px; /* Use variable instead */

/* Don't use too many animations */
.element { animation: slideUp, fadeIn, bounce; } /* Confusing */

/* Don't ignore accessibility */
button { background: #0c120e; color: #000; } /* No contrast */
```

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 18.06.2026 | Initial release |

---

**Brand**: NORTHCAT  
**Designer**: Dark Voio Studio  
**Last Updated**: 18.06.2026
