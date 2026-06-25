---
Task ID: 8
Agent: full-stack-developer
Task: Rewrite PricingPage, HowItWorksPage, ContactPage with polished design system

Work Log:
- Read worklog.md and existing page files for context
- Read globals.css to understand available CSS classes (pro-card, section-divider, gradient-text)
- Standardized AnimatedSection helper across all 3 files: y:16, duration:0.5, margin:"-60px"
- Standardized container to max-w-[1200px] mx-auto px-6 sm:px-8 across all sections
- Rewrote PricingPage.tsx: refined comparison cards with emerald Check circles, improved border colors, centered ShieldCheck in emerald bg circle
- Rewrote HowItWorksPage.tsx: replaced faded text step numbers with emerald circle + number, added gradient connector lines between steps, added subtitle to CTA, improved caption text
- Rewrote ContactPage.tsx: added emerald bg icon containers for benefits, refined form label to "Message", improved spacing and border colors, refined success state animation
- ESLint: zero errors
- Dev server: compiles successfully (200 responses)

Stage Summary:
- Rewrote 3 page components (PricingPage, HowItWorksPage, ContactPage) with consistent professional design system
- All use identical AnimatedSection helper (y:16, 0.5s fade-up)
- All use max-w-[1200px] container with responsive padding
- Emerald circle step indicators in HowItWorksPage with gradient connector lines
- Clean, professional, trustworthy aesthetic throughout