<div align="center">

# Sleep R Us

### Premium Beds & Mattresses E-Commerce Platform

A modern, full-stack e-commerce storefront built for a sleep and furniture company — featuring a headless CMS, rich product management, and a seamless shopping experience.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Sanity](https://img.shields.io/badge/Sanity_CMS-4.22-F03E2F?logo=sanity)](https://www.sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## Overview

Sleep R Us is a fully responsive e-commerce platform designed for selling beds, mattresses, and sleep accessories. It combines a performant Next.js frontend with Sanity CMS as a headless content backend, giving editors full control over products, categories, SEO, and newsletters — all from an embedded studio.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **UI** | React 19, Tailwind CSS 4, Framer Motion |
| **CMS** | Sanity v4 (embedded Studio at `/studio`) |
| **Authentication** | Clerk |
| **Forms** | React Hook Form + Zod validation |
| **Content Rendering** | Portable Text (`@portabletext/react`) |
| **Icons** | Lucide React |
| **Data Export** | react-csv |

---

## Features

### Storefront
- Product browsing with category and subcategory filtering
- Dynamic product detail pages with image galleries
- Rich text product descriptions (bullet lists, paragraphs, bold text)
- Real-time search with typewriter animation
- Responsive design across all breakpoints
- Animated page transitions and scroll effects

### Product Management (Sanity Studio)
- Beds & Mattresses schemas with size variants, pricing, and specifications
- Hierarchical category system with showcase images
- SEO metadata management per page
- Newsletter subscriber management with CSV export
- Rich text editor for structured product descriptions

### Communication
- Product inquiry form with email notifications
- Contact form with server-side email delivery
- WhatsApp floating button for instant messaging
- Newsletter subscription with admin dashboard

### Authentication & Admin
- User sign-up / sign-in via Clerk
- Admin panel for newsletter management
- Protected admin routes

---

## Project Structure

```
sleep-r-us/
├── app/
│   ├── (pages)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── faqs/
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── testimonials/
│   ├── admin/
│   │   └── newsletter/
│   ├── products/
│   │   ├── bed-frames/[slug]/
│   │   └── mattresses/[slug]/
│   ├── product-inquiry/
│   ├── sign-in/
│   ├── sign-up/
│   ├── studio/[[...tool]]/        # Embedded Sanity Studio
│   └── api/
│       ├── contact-email/
│       ├── newsletter/subscribe/
│       └── send-email/
├── components/
│   ├── navigation/                # Header, Footer
│   ├── product/                   # ProductCard, ProductGrid, ProductDetail
│   ├── search/                    # SearchBar
│   ├── newsletter/                # NewsletterForm, NewsletterSection
│   ├── testimonials/              # TestimonialCard, TestimonialsSection
│   ├── whatsapp-button/
│   └── ui/                        # Reusable UI primitives
├── sanity/
│   ├── schemaTypes/               # Bed, Mattress, Category, Newsletter, SEO
│   ├── structure.ts               # Studio sidebar configuration
│   ├── lib/                       # Sanity client utilities
│   └── env.ts                     # Environment config
├── lib/
│   ├── client/                    # Sanity client, GROQ queries, services
│   ├── constants/                 # Brand colors
│   └── animations/                # Motion/animation utilities
└── types/                         # Shared TypeScript definitions
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** (or yarn / pnpm)
- A **Sanity** project ([create one here](https://www.sanity.io/manage))
- A **Clerk** application ([create one here](https://dashboard.clerk.com/))

### 1. Clone the repository

```bash
git clone <repository-url>
cd sleep-r-us
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-16

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Email (for contact/inquiry forms)
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
EMAIL_TO=recipient_email
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.

Open [http://localhost:3000/studio](http://localhost:3000/studio) to access Sanity Studio.

### 5. Deploy the Sanity schema

```bash
npx sanity@latest schema deploy
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create optimized production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Sanity Studio

The CMS is embedded at `/studio` and organized into:

| Section | Content |
|---|---|
| Mattress Management | Mattress products with sizes, thickness, construction details |
| Bed Management | Bed frames with storage types, headboard styles, size variants |
| Category Management | Hierarchical categories with showcase images |
| Newsletter Management | Subscriber list with export capabilities |
| SEO Management | Per-page meta titles, descriptions, OG images, keywords |

---

## Deployment

### Vercel (Recommended)

```bash
npx vercel
```

Set the environment variables in the Vercel dashboard under **Settings > Environment Variables**.

### Other Platforms

Any platform supporting Node.js 18+ and Next.js App Router works. Ensure environment variables are configured and the build command is:

```bash
npm run build && npm run start
```

---

## License

This project is proprietary software. All rights reserved.

---

<div align="center">

**Built with care for better sleep.**

</div>
