# Tuitional Frontend - Project Context

## Overview
Tuitional is an online educational technology platform providing personalized tutoring services for students in the Gulf region. The frontend is built with Next.js 14 and focuses on British curriculum education (IGCSE, GCSE, A-Levels).

## Technology Stack

### Core Technologies
- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript 5
- **Styling**: Material-UI (MUI) 5.15.15 with custom CSS modules
- **State Management**: React Context API (DrawerProvider)
- **Backend**: Firebase Firestore
- **HTTP Client**: Axios 1.7.7

### Key Dependencies
- **UI Framework**: @mui/material, @mui/icons-material, @emotion/react, @emotion/styled
- **Authentication & Database**: Firebase 10.11.1
- **Utilities**: 
  - moment (date handling)
  - cheerio (web scraping)
  - react-hot-toast (notifications)
  - react-phone-number-input
  - sharp (image optimization)
  - swiper (carousels)
  - wavesurfer.js (audio visualization)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (pages)/
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog with dynamic routing
│   │   ├── careers/       # Careers page
│   │   ├── contact/       # Contact page
│   │   ├── testimonials/  # Testimonials page
│   │   └── online/        # Dynamic tutoring pages
│   ├── api/               # API routes
│   ├── assets/            # Static assets (CSS, icons)
│   ├── metrics/           # Analytics components
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── context/               # React Context providers
├── services/              # Data fetching & API services
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions & constants
└── axios/                 # Axios configuration
```

## Key Features

### Routing Structure
- **Static Routes**: `/`, `/about`, `/contact`, `/careers`, `/testimonials`, `/blog`
- **Dynamic Routes**: 
  - `/online/[slug]` - Subject/grade specific tutoring pages
  - `/blog/[slug]` - Individual blog posts
  - `/blog/category/[slug]` - Blog categories
  - `/blog/tag/[slug]` - Blog tags

### Core Components

#### Layout Components
- **Header** (`src/components/header.tsx`): Navigation bar with responsive menu
- **Footer** (`src/components/footer.tsx`): Site-wide footer with links and contact info
- **Drawer** (`src/components/drawer.tsx`): Mobile navigation drawer

#### Business Logic Components
- **Filter System**: Subject/grade/curriculum filtering for tutoring services
- **Contact Forms**: Lead generation and enrollment forms
- **Testimonials**: Customer review display system
- **Blog System**: Content management with categories and tags

### State Management
- **DrawerContext**: Manages mobile navigation drawer state
- **Firebase Integration**: Real-time data fetching for:
  - Filter data (subjects, grades, curricula)
  - Testimonials
  - Blog content
  - Contact form submissions

### Data Layer (`src/services/`)
- **filter-data**: Curriculum, grade, and subject filtering
- **testimonials**: Customer review management
- **contact-form**: Lead capture and form handling
- **grade-subject-level**: Dynamic page content
- **email-service**: Email template and sending logic

### Styling Approach
- **Material-UI theming** with custom theme (`src/app/assets/css/theme.ts`)
- **CSS Modules** for component-specific styling
- **Responsive design** with mobile-first approach
- **Custom fonts**: League Spartan from Google Fonts

## Configuration Files

### Next.js Configuration (`next.config.mjs`)
- Audio file handling (mp3, wav)
- Image optimization for Firebase Storage and external sources
- Extensive redirect rules for SEO migration
- File loader configuration

### TypeScript Configuration
- Strict mode enabled
- Path aliases: `@/*` maps to `./src/*`
- Modern module resolution with bundler

## Business Context

### Target Market
- Students in Gulf region (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman)
- British curriculum education (IGCSE, GCSE, A-Levels)
- Grades 4-8 and higher secondary education

### Core Services
- 1-on-1 online tutoring
- Live interactive classes
- Personalized learning plans
- Multi-curriculum support (Cambridge, Pearson Edexcel, AQA)

### Key Pages
- **Home**: Lead generation with filtering and contact forms
- **Online Tutoring**: Dynamic pages for each subject/grade combination
- **About**: Company information and values
- **Testimonials**: Social proof and customer reviews
- **Contact**: Multiple contact methods and enrollment
- **Blog**: Educational content and SEO
- **Careers**: Hiring and talent acquisition

### Analytics & Tracking
- Google Analytics integration
- Google Tag Manager
- Microsoft Clarity
- Custom metrics tracking

## Development Notes

### Performance Optimizations
- Dynamic imports for non-critical components
- Image optimization with Next.js Image component
- Lazy loading for testimonials and blog content
- Responsive image loading with multiple breakpoints

### SEO Implementation
- Dynamic sitemap generation
- Structured data (JSON-LD) for organization and services
- Meta tag management per page
- Canonical URLs and redirects

### Firebase Integration
- Firestore for content management
- Real-time data synchronization
- Collection-based data organization
- Error handling for offline scenarios

## Key Files to Reference

- `src/app/layout.tsx`: Root application layout and providers
- `src/app/page.tsx`: Home page implementation
- `src/components/header.tsx`: Main navigation component
- `src/components/footer.tsx`: Site footer with dynamic links
- `src/context/drawer-context.tsx`: Mobile navigation state
- `src/services/filter-data/filter-data.ts`: Core filtering logic
- `src/utils/env.ts`: Environment constants
- `next.config.mjs`: Next.js configuration and redirects