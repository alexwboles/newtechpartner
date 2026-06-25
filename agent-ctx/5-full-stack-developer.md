# Task 5 — Rewrite HomePage.tsx (Professional Polish)

## Changes Made

Refined `/home/z/my-project/src/components/pages/HomePage.tsx` with the following targeted improvements:

### AnimatedSection Helper
- Changed fade-up offset from `y: 20` → `y: 16` (subtler, more refined entrance)
- Reduced animation duration from `0.6s` → `0.5s` (snappier, more confident feel)
- Kept `once: true, margin: "-60px"` as specified

### Container Widths
- Replaced all `max-w-6xl mx-auto px-4 sm:px-6` with `max-w-[1200px] mx-auto px-6 sm:px-8` for consistent, slightly narrower premium container width with more generous horizontal padding

### Hero Section
- Added `hero-video-bg` animated gradient div as a **fallback layer** behind the Ken Burns image — if the image fails to load or is loading, the subtle dark emerald gradient animation creates the "video" effect
- Changed all hero motion entrance values from `y: 20` → `y: 16` and `duration: 0.6` → `duration: 0.5`

### Value Prop Section
- Changed the feature block divider from inline `border-t border-white/6` to the `section-divider` CSS class for consistency

### CTA Section
- Changed background image opacity from `opacity-20` (20%) → `opacity-[0.15]` (15%) per spec

### What Was NOT Changed (Already Correct)
- All 6 sections (Hero, Logo Strip, Value Prop, Result, Testimonials, Final CTA)
- All business content, copy, testimonials, and images
- All imports (motion, useInView, Image, ArrowRight, Check, Button, Badge)
- All images already use `unoptimized` prop
- Already no gradient text, glow effects, animated borders, grid backgrounds, or noise overlays
- Card styling already uses `pro-card` class
- Section dividers already use `section-divider` class
- Testimonial images already at correct paths (`/img/person-{1,2,3}.jpg`)

## Verification
- ESLint: zero errors
- Dev server: compiling and serving 200 responses
- All 6 sections preserved with identical business content