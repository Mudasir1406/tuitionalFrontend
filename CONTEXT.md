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
- **Arabic Static Routes**: `/ar`, `/ar/about`, `/ar/contact`, `/ar/testimonials`, `/ar/blog`
- **Dynamic Routes**: 
  - `/online/[slug]` - Subject/grade specific tutoring pages
  - `/blog/[slug]` - Individual blog posts (English)
  - `/blog/category/[slug]` - Blog categories (English)
  - `/blog/tag/[slug]` - Blog tags (English)
- **Arabic Dynamic Routes**:
  - `/ar/blog/[slug]` - Individual blog posts (Arabic)
  - `/ar/blog/category/[slug]` - Blog categories (Arabic)
  - `/ar/blog/tag/[slug]` - Blog tags (Arabic)

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

## Arabic Blog Implementation (Recent Update)

### Overview
Complete bilingual blog system implemented with Arabic translation, RTL support, and separate content collections.

### Architecture
- **URL-based Language Detection**: `/blog` for English, `/ar/blog` for Arabic
- **Separate Collections**: `blogs-v1-en` and `blogs-v1-ar` in Firebase
- **Bilingual Data Structure**: Categories and tags with `{id, name: {en, ar}}` format
- **Component Duplication Strategy**: Arabic-specific components (ArHeader, ArFooter, etc.)

### Key Files Created/Modified

#### Arabic Pages
- `src/app/ar/blog/page.tsx` - Arabic blog listing
- `src/app/ar/blog/[slug]/page.tsx` - Individual Arabic blog posts
- `src/app/ar/blog/category/[slug]/page.tsx` - Arabic category filtering
- `src/app/ar/blog/tag/[slug]/page.tsx` - Arabic tag filtering

#### Arabic Components
- `src/components/blog/hero/ArHero.tsx` - Arabic hero with Trustpilot
- `src/components/blog/search-bar/ArSearchBar.tsx` - Arabic search interface
- `src/components/blog/blogSequences/ar-blog-sequences.tsx` - Arabic blog layout
- `src/components/blog/hero-nested/ArHero.tsx` - Arabic nested hero
- `src/components/blog/postCTA/ArPostCTA.tsx` - Arabic call-to-action
- `src/components/blog/left-section/ar-left-section.tsx` - Arabic sidebar
- `src/components/blog/tags-social/ArTagsAndSocial.tsx` - Arabic tags section

#### Styling
- `src/app/ar/blog/rtl-blog.module.css` - RTL layout styles
- `src/app/ar/blog/category/[slug]/blog.module.css` - Arabic category styles
- `src/app/ar/blog/tag/[slug]/blog.module.css` - Arabic tag styles

#### Modified Services
- `src/services/grade-subject-level/grade-subject-level.ts`:
  - `getBlogData()` function updated with locale parameter
  - Supports fetching from language-specific collections

#### Updated Types
- `src/types/grade-subject-level.types.ts`:
  - Updated `AllBlogsData` type for new heroSection.category structure
  - Bilingual category/tag support: `{id, name: {ar, en}}`

### Technical Implementation

#### Bilingual Data Structure
```typescript
// Categories & Tags Structure
{
  id: string,
  name: {
    en: string,
    ar: string
  }
}

// Blog heroSection.category Structure  
{
  category: {
    data: [
      {
        id: string,
        name: {
          ar: string,
          en: string
        }
      }
    ]
  }
}
```

#### Translation Mappings
- **Search**: "Search Our Blog" → "ابحث في مدونتنا"
- **Search Button**: "Search" → "بحث"
- **Categories**: "Category" → "التصنيف", "Categories" → "التصنيفات"
- **Tags**: "Tag" → "العلامة", "Tags" → "العلامات"
- **Newsletter**: "Subscribe!" → "اشترك!"
- **Email Placeholder**: "Your Email*" → "بريدك الإلكتروني*"
- **Rating**: "Excellent (4.7/5)" → "ممتاز (4.7/5)"
- **Fallbacks**: "Our Blogs" → "مدوناتنا"

#### Key Features Implemented
1. **Complete RTL Support**: All Arabic pages flow right-to-left
2. **Arabic Hero Section**: Proper Trustpilot display with Arabic rating
3. **Bilingual Navigation**: Left sidebar works with both languages
4. **ID-based Routing**: Category/tag URLs use IDs instead of names
5. **Responsive Spacing**: CSS modules with viewport-based margins
6. **Consistent Filtering**: Both languages use same filtering logic

#### Routing Logic
- **Language Detection**: Based on URL path (`/ar/` prefix)
- **Collection Selection**: Automatic based on detected language
- **Cross-language Links**: Arabic sidebar redirects to Arabic pages
- **Fallback Handling**: Graceful degradation for missing translations

### Development Notes

#### Accordion Component Fix
- Updated to use ID-based routing instead of name-based
- Supports both English and Arabic title detection
- Routes to appropriate language-specific pages

#### CSS Modules Implementation
- Local CSS files for Arabic pages to ensure styling works
- `verticalMargin` class provides responsive spacing
- Desktop: 7vh margins, Mobile: 5vh margins

#### Firebase Collections
- **English**: `blogs-v1-en`, `categories`, `tags`
- **Arabic**: `blogs-v1-ar`, `categories`, `tags` (shared collections)
- **Bilingual Structure**: Same categories/tags serve both languages

### Testing URLs
- Arabic Category: `http://localhost:3001/ar/blog/category/resources`
- Arabic Tag: `http://localhost:3001/ar/blog/tag/exam-preparation`
- Arabic Blog: `http://localhost:3001/ar/blog`
- Arabic Individual: `http://localhost:3001/ar/blog/[slug]`

### Future Considerations
- All Arabic blog functionality is complete
- System handles bilingual content seamlessly
- Extensible for additional languages if needed
- Maintains performance with separate collections

## Arabic Online Tutoring Pages Implementation

### Architecture Overview
Extended the Arabic translation system to `/online` pages following the same bilingual approach:
- English online pages: `/online/*`
- Arabic online pages: `/ar/online/*`

### Key Components Created

#### Arabic Online Pages
1. **`/ar/online/page.tsx`** - Main Arabic online tutoring page
   - Arabic header and footer integration
   - RTL layout with proper styling
   - Semantic HTML structure for SEO

2. **`/ar/online/[slug]/page.tsx`** - Individual Arabic online tutoring pages
   - Fetches from `grade-subject-level-ar` collection
   - Uses `sortJsonObjectBySequenceNumber` for proper component ordering
   - Arabic metadata generation and canonical URLs

3. **`/ar/online/[slug]/layout.tsx`** - Arabic layout wrapper
   - Server-side metadata generation
   - Proper schema markup for Arabic pages
   - Canonical URL structure for SEO

#### Arabic Components for Online Pages
1. **`ArGradeSubjectLevel`** - Arabic version of main tutoring component
   - Replaces `Header` with `ArHeader` and `Footer` with `ArServerFooter`
   - Uses Arabic-translated sections (ArSectionsBox, ArForm)
   - Maintains same component sequence logic

2. **`ArGradeSubjectLevelV2`** - Arabic version of V2 tutoring component
   - Object.entries iteration with proper Arabic components
   - Arabic form integration for contact sections
   - RTL-compatible styling and layout

3. **`ArSectionsBox`** - Translated call-to-action section
   - Arabic text: "انضم إلى فصول تفاعلية مباشرة عبر الإنترنت مع مدرسينا المعتمدين!"
   - Button: "احجز تجربة مجانية" (Book a Free Demo)
   - RTL text alignment

4. **`ArForm`** - Complete Arabic contact form
   - All placeholders translated to Arabic
   - Error messages in Arabic
   - Dropdown options: "اختر الصف", "اختر المنهج", "اختر المادة"
   - Submit button: "إرسال الآن"
   - Toast notifications in Arabic

#### Service Layer Updates

##### Grade Subject Level Service
```typescript
export const getPageData = async (slug: string, locale: string = "en"): Promise<PageData | null> => {
  const collectionName = locale === "ar" ? "grade-subject-level-ar" : "grade-subject-level-en";
  // Fetch from language-specific collection
}
```

#### Database Collections
- **grade-subject-level-en**: English online tutoring content
- **grade-subject-level-ar**: Arabic online tutoring content

#### Component Sequencing
- **V2 Components**: Use `sortJsonObjectBySequenceNumber(data)` to sort by `sequenceNumber` property
- **Regular Components**: Use `sequence.sections.sort((a, b) => a.placment - b.placment)`
- Both approaches ensure consistent component ordering

#### CSS and Styling
- **RTL CSS Module**: `rtl-online.module.css`
- **Form RTL Support**: Proper text direction and alignment
- **Hero Section Padding**: Fixed RTL padding issues with container-level styling

### Implementation Status
✅ Arabic online tutoring pages with RTL support
✅ Translated form components with Arabic validation
✅ Proper component sequencing for both V1 and V2 layouts
✅ Database integration with Arabic collections
✅ SEO-optimized Arabic pages with metadata
✅ Server Footer integration with proper data fetching

## IGCSE Page Implementation

### Page Structure
Created dedicated IGCSE landing page at `/igcse` with comprehensive tutoring information and lead generation.

### Components Architecture

#### Core Components
1. **Header-V2** - Enhanced header for landing pages
2. **Hero Section with Form** - Two-column layout with content and lead form
3. **School Logos Section** - Partner institution display
4. **Tutor Section** - Expert tutor profiles with hardcoded data
5. **Benefits Section** - Program advantages
6. **Student Testimonials** - Video reviews integration
7. **Call-to-Action Sections** - Multiple conversion points
8. **Get Started Section** - Final conversion section
9. **FAQs** - Common questions and answers

#### Data Integration

##### Tutor Section with Hardcoded Data
- **TutorSectionV2** - Exact copy of original with hardcoded tutor profiles
- **4 Expert Tutors** with detailed profiles:
  - Sarah Johnson (Cambridge) - Math, Physics, Chemistry
  - Michael Chen (Oxford) - English, History, Geography  
  - Emma Williams (Imperial) - Biology, Chemistry, Environmental Science
  - David Thompson (LSE) - Economics, Business, Mathematics
- **Same styling and layout** as database-driven version
- **GridView/ListView** rendering options

##### Database Services Integration
- **Get Started Data** - `getStartedData()` service
- **Video Reviews** - `getVideoReviews()` service for testimonials
- **Benefits Section** - Hardcoded with proper data structure
- **FAQs** - Hardcoded IGCSE-specific questions

#### Sticky Countdown Timer

##### Database-Synchronized Countdown
- **Firebase Collection**: `countdown/igcse-offer`
- **Centralized Management**: All users see identical countdown
- **Data Structure**:
```typescript
interface CountdownData {
  targetDate: string;    // ISO string format
  title: string;         // Display title
  isActive: boolean;     // Enable/disable countdown
  createdAt: string;     // Creation timestamp
  updatedAt: string;     // Last update timestamp
}
```

##### Countdown Service (`src/services/countdown/countdown.ts`)
- **Auto-creation**: Creates 20-day default countdown if none exists
- **Fallback mechanism**: Client-side calculation if database fails
- **Admin controls**: Update functions for managing countdown

##### CountdownTimer Component Features
- **Real-time updates**: Updates every second
- **Format**: Days:Hours:Minutes:Seconds with zero-padding
- **Sticky positioning**: Fixed at top center of page
- **Responsive design**: Works across all device sizes
- **Loading states**: Proper handling of async data fetching

#### Styling and Layout
- **Professional design** with Material-UI components
- **Responsive grid system** for all sections
- **Consistent spacing** using `verticalMargin` utility
- **Call-to-action optimization** with multiple conversion points

### Current Implementation Status
✅ Complete IGCSE landing page structure
✅ Database-synchronized countdown timer
✅ Hardcoded tutor profiles with professional presentation
✅ Lead generation form with validation
✅ School logos and testimonials integration
✅ Benefits section with IGCSE-specific advantages
✅ FAQ section with relevant questions
✅ SEO-optimized structure and metadata
✅ Performance-optimized with dynamic imports

### Current Focus: Translation System
Working on extending the Arabic translation system to include IGCSE page and other components, following the established bilingual architecture pattern.