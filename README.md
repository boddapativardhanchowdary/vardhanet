# Vardhan Boddapati — THE SERIES 🎬

A cinematic, streaming-platform-inspired developer portfolio built with React 18, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and Lenis.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

---

## 🏗️ Project Structure

```
vardhan-portfolio/
├── public/
│   ├── assets/
│   │   ├── portrait.jpg          ← Developer portrait
│   │   └── resume.pdf            ← [REPLACE] Your resume PDF
│   └── vb-favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── AnimatedText.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   └── Badge.tsx
│   │   ├── OpeningSequence.tsx   ← Cinematic intro
│   │   ├── ProfileSelection.tsx  ← Who's Watching?
│   │   ├── IntroModal.tsx        ← Highlight reel
│   │   ├── Navbar.tsx
│   │   └── ProjectModal.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx             ← The Pilot
│   │   ├── Journey.tsx           ← Seasons & Episodes
│   │   ├── Projects.tsx          ← Originals
│   │   ├── TopPicks.tsx          ← Featured Picks
│   │   ├── Skills.tsx            ← Technical Genres
│   │   ├── Achievements.tsx      ← Certifications
│   │   └── Contact.tsx           ← To Be Continued…
│   ├── hooks/
│   │   ├── useLenis.ts           ← Smooth scroll
│   │   ├── useReducedMotion.ts   ← a11y
│   │   └── useScrollProgress.ts
│   ├── data/
│   │   └── portfolio.ts          ← ✏️ EDIT YOUR INFO HERE
│   ├── types/
│   │   └── portfolio.ts          ← TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
└── package.json
```

---

## ✏️ Personalizing Your Portfolio

All personal information lives in one file: **`src/data/portfolio.ts`**

### 1. Personal Information
```ts
export const personalInfo = {
  name: 'Vardhan Boddapati',       // Your full name
  email: 'your@email.com',          // Your email
  resumePdf: '/assets/resume.pdf',  // Place resume PDF in public/assets/
}
```

### 2. Add Your Resume PDF
Place your resume PDF at: **`public/assets/resume.pdf`**

### 3. Update Social Links
Update the `socialLinks` array with your real profile URLs.

### 4. Add Project Screenshots
Place project images in `public/assets/` and reference them in the `projects` array:
```ts
thumbnail: '/assets/project-1-thumb.jpg',
```

### 5. Update GitHub Repo Links
Replace placeholder GitHub links in the `projects` array.

### 6. Add Certification Verification Links
In the `achievements` array, add `verifyUrl` for each certification.

---

## 🎨 Customization

### Colors
Edit `src/index.css` CSS custom properties:
```css
:root {
  --color-red: #e50914;    /* Primary accent color */
}
```

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Lenis | Smooth Scroll |
| Lucide React | Icons |

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload the dist/ folder
```

---

## ♿ Accessibility
- Keyboard navigation supported throughout
- Respects `prefers-reduced-motion`
- Visible focus indicators
- Touch-friendly on mobile
- Semantic HTML

---

## 📋 Pre-Launch Checklist

- [ ] Replace `public/assets/resume.pdf` with your actual resume
- [ ] Update all `[REPLACE]` URLs in `src/data/portfolio.ts`
- [ ] Add project screenshots to `public/assets/`
- [ ] Update GitHub repository links for each project
- [ ] Add certification verification URLs
- [ ] Test on mobile devices
- [ ] Run `npm run build` successfully

---

*Built with ❤️ and Java — Vardhan Boddapati*
