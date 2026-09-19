# BharatAPI Design System

**Version:** 1.0

**Status:** Locked

**Last Updated:** September 2026

---

## Mission

BharatAPI should feel like a modern developer platform similar in quality to Vercel, Stripe, Cloudflare, and Resend—but built specifically for India-first APIs.

Design priorities:

1. Mobile First
2. Fast
3. Minimal
4. Accessible
5. Consistent
6. Developer-focused

No component is considered complete unless it follows this document.

---

# Core Principles

### Mobile First

Every component starts at **375px**.

Breakpoints:

| Device  | Width     | Tailwind |
| ------- | --------- | -------- |
| Mobile  | 320–639   | default  |
| Tablet  | 640–1023  | `sm:`    |
| Laptop  | 1024–1279 | `lg:`    |
| Desktop | 1280+     | `xl:`    |

Rule:

> Build for mobile first. Enhance upward.

---

# Layout System

## Container

Use the shared `Container` component.

Padding:

* Mobile → `px-4`
* Tablet → `px-6`
* Desktop → `px-8`

Maximum width:

`max-w-6xl`

Never hardcode page widths.

---

# Spacing System

Everything follows an **8px grid**.

| Tailwind | Pixels |
| -------- | ------ |
| 1        | 4      |
| 2        | 8      |
| 3        | 12     |
| 4        | 16     |
| 5        | 20     |
| 6        | 24     |
| 8        | 32     |
| 10       | 40     |
| 12       | 48     |
| 16       | 64     |
| 20       | 80     |
| 24       | 96     |

Avoid arbitrary spacing values unless absolutely necessary.

---

# Typography

## Font

Primary:

* Inter (current)

Future option:

* Geist

## Heading Scale

| Element | Class                              |
| ------- | ---------------------------------- |
| Hero    | `text-5xl sm:text-6xl lg:text-7xl` |
| Section | `text-3xl sm:text-4xl`             |
| Card    | `text-xl`                          |
| Body    | `text-base sm:text-lg`             |
| Small   | `text-sm`                          |
| Caption | `text-xs`                          |

Rules:

* Hero uses `tracking-[-0.05em]`
* Headings use `leading-[0.95]`
* Body uses `leading-8`

---

# Colors

Shadcn handles neutral colors.

Brand accent:

**Orange**

`#F97316`

Use orange only for:

* Primary CTA
* Links
* Active states
* Focus accents
* Highlights

Avoid making large backgrounds orange.

Success:

* Green

Errors:

* Shadcn destructive

---

# Border Radius

Standard radius values.

| Element  | Radius         |
| -------- | -------------- |
| Buttons  | `rounded-xl`   |
| Cards    | `rounded-3xl`  |
| Navbar   | `rounded-full` |
| Terminal | `rounded-3xl`  |
| Inputs   | `rounded-lg`   |

No random radius values.

---

# Shadows

Use subtle depth.

### Cards

```css
shadow-lg
```

Hover:

```css
hover:shadow-xl
```

### Terminal

Custom shadow:

```css
shadow-[0_30px_80px_rgba(0,0,0,.15)]
```

Dark mode:

```css
shadow-[0_30px_80px_rgba(0,0,0,.45)]
```

---

# Glassmorphism

Allowed only on:

* Navbar
* Terminal
* Floating surfaces

Recipe:

```css
bg-background/80
backdrop-blur-xl
border
```

Never overuse glass effects.

---

# Buttons

Use Shadcn's Button component.

Primary:

* Orange
* White text

Secondary:

* Outline

Mobile:

Buttons stack vertically.

Desktop:

Buttons sit horizontally.

Minimum touch target:

**44px**

---

# Cards

Every API card follows this structure.

1. Icon
2. Title
3. Description
4. Endpoint
5. CTA

Padding:

`p-6`

Hover:

* Lift slightly
* Stronger shadow
* Orange border tint

---

# Icons

Library:

Lucide.

Sizes:

| Usage   | Size     |
| ------- | -------- |
| Navbar  | `size-4` |
| Buttons | `size-4` |
| Cards   | `size-6` |
| Hero    | `size-5` |

Never mix icon libraries.

---

# Motion

Animations should feel subtle.

Default duration:

```css
duration-200
```

Hover:

* Slight lift
* Slight shadow
* Color fade

Avoid dramatic animations.

Respect:

`prefers-reduced-motion`

---

# Responsive Rules

Every component must satisfy:

* No horizontal scrolling.
* Works at 375px.
* Works at 768px.
* Works at 1440px.
* Text never below 12px.
* Buttons remain tappable.
* Images never overflow.

---

# Accessibility

Minimum requirements:

* Keyboard navigation.
* Visible focus ring.
* Proper contrast.
* ARIA labels.
* Semantic HTML.

Theme switching must preserve accessibility.

---

# Component Architecture

Generated components:

`components/ui/*`

Never modify generated files unless absolutely necessary.

Custom components live in:

```text
components/
├── landing/
├── shared/
└── features/
```

---

# Naming Convention

Files:

```text
api-card.tsx
theme-toggle.tsx
grid-background.tsx
```

Avoid:

```text
ApiCardNew.tsx
card2.tsx
```

Keep names descriptive.

---

# Homepage Order

Locked.

1. Navbar
2. Hero
3. Terminal
4. Featured APIs
5. Features
6. Stats
7. Footer

Future additions should respect this hierarchy.

---

# API Documentation Style

Every endpoint gets:

1. Title
2. Description
3. Endpoint
4. Parameters
5. Response
6. Error Codes
7. Copy Button
8. Playground

Example:

```text
GET /v1/pincode/421201
```

Code blocks use a dark terminal style regardless of page theme.

---

# Quality Checklist (Definition of Done)

Before merging any UI component:

* [ ] Mobile tested
* [ ] Tablet tested
* [ ] Desktop tested
* [ ] Dark mode verified
* [ ] Light mode verified
* [ ] No horizontal scroll
* [ ] Proper spacing
* [ ] Accessible
* [ ] Uses shared components
* [ ] Follows this design system

Only after every checkbox is complete is the component considered production-ready.
