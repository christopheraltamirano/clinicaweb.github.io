# AGENTS.md - Clínica Excelencia Website

## Project Overview

This is a static website for a medical clinic (Clínica Excelencia) built with vanilla HTML, CSS, and JavaScript. No build tools, frameworks, or package managers are used.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JavaScript  
**No Build System:** Plain static files served directly

---

## Project Structure

```
├── index.html          # Main landing page
├── servicios.html      # Services page
├── equipo.html         # Medical team page
├── galeria.html        # Gallery page
├── contacto.html       # Contact page
├── privacidad.html     # Privacy policy page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── AGENTS.md           # This file
```

---

## Commands

Since this is a static site, there are **no build commands**. To preview:

- Open `index.html` directly in a browser, or
- Use a simple HTTP server: `npx serve` or `python -m http.server`

**No lint/test commands available** - this is a plain static site.

---

## Code Style Guidelines

### General Principles

1. Keep JavaScript minimal - use vanilla DOM APIs only
2. Use CSS custom properties (`:root` variables) for theming
3. No external frameworks - pure HTML/CSS/JS
4. Mobile-first responsive design

### HTML Conventions

- Use semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<footer>`)
- Include `alt` attributes on all images
- Use `aria-label` for icon-only buttons
- Keep inline styles to a minimum; use CSS classes

### CSS Conventions

**Variables (in `:root`):**
```css
:root {
  /* Colors - semantic naming */
  --primary: #004295;
  --secondary: #006c50;
  --surface: #f9f9f9;
  
  /* Typography - rem-based */
  --font-family: 'Plus Jakarta Sans', sans-serif;
  
  /* Spacing - consistent scale */
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
}
```

**Naming:**
- Use kebab-case for classes (`.nav-links`, `.btn-primary`)
- BEM-ish naming for complex components (`.expert-card`, `.availability-tag`)
- Prefix utility classes (`mt-8`, `text-center`)

**Organization:**
1. CSS variables
2. Base reset
3. Typography
4. Layout/containers
5. Components
6. Utilities
7. Animations

### JavaScript Conventions

**Structure:**
- IIFE pattern with `DOMContentLoaded` for initialization
- Modular functions with single responsibilities
- No external libraries

**Functions:**
```javascript
// Init pattern - call all initializers from DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initFormValidation();
    initWhatsAppButtons();
});

// Helper functions - clear, focused purpose
function showNotification(message, type = 'success') { ... }
```

**Naming:**
- camelCase for functions and variables
- Prefix with `init` for initialization functions
- Prefix with `is`, `has`, `get` for predicates/getters

**Error Handling:**
- Early returns for missing elements (`if (!navbar) return;`)
- Use try/catch for operations that may fail (optional)
- Always check element existence before manipulating

**DOM:**
- Use `document.querySelector` / `querySelectorAll`
- Prefer `addEventListener` over inline handlers
- Clean up observers when done

### Formatting

**CSS:**
- 2-space indentation
- One property per line in rule sets
- Alphabetical order for shorthand properties optional
- Use semicolons

**JavaScript:**
- 4-space indentation (as existing in `script.js`)
- Semicolons required
- Use template literals for strings
- Prefer `const` over `let`, avoid `var`

### Accessibility

- Color contrast minimum 4.5:1
- Focus visible states on interactive elements
- Keyboard navigation support
- ARIA labels where needed

---

## Common Tasks

### Adding a New Page
1. Copy an existing HTML file as template
2. Update navigation links in all pages
3. Add corresponding link in navbar

### Modifying Styles
- Edit `styles.css` - changes apply immediately on refresh
- Use browser DevTools to test, then commit to CSS

### Adding JavaScript
- Add function to `script.js` following init pattern
- Call from main `DOMContentLoaded` handler

---

## WhatsApp Integration

The site includes WhatsApp button integration. The phone number is defined in `initWhatsAppButtons()` function in `script.js:65`:
```javascript
const whatsappNumber = '51900000000';
```

---

## Notes for AI Agents

- This is a simple static site - no complex tooling
- Do not add frameworks (React, Vue, etc.) without user request
- Test in mobile and desktop viewports
- Preserve existing design system (colors, typography, spacing)