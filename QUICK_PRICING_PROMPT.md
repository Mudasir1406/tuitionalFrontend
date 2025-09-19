# 🚀 Quick Pricing Component Implementation Prompt

Copy and paste this prompt to implement pricing components on your website:

---

## 🎯 Implementation Request

**Context:** I have a tutoring CMS that creates packages in Firebase Firestore collection `tutoring-packages` with this structure:

```javascript
{
  id: "auto-generated",
  name: "IGCSE Mathematics Premium",
  description: "Complete IGCSE Math tutoring",
  grades: ["Grade 9", "Grade 10", "IGCSE"],
  subjects: ["Mathematics"],
  curriculum: ["British", "IGCSE"],
  features: ["1-on-1 Sessions", "Practice Worksheets", "Progress Reports"],
  sessionsPerWeek: 2,
  sessionDuration: "60 minutes",
  pricing: {
    "UAE": { price: 200, currency: "AED" },
    "Saudi Arabia": { price: 190, currency: "SAR" },
    "USA": { price: 50, currency: "USD" }
  },
  isActive: true,
  order: 1
}
```

**Task:** Create a complete pricing section for my tutoring website that:

1. **Server-side renders** for SEO and performance
2. **Fetches data** from Firebase collection `tutoring-packages` 
3. **Filters packages** by user's country, grade, subject, curriculum
4. **Shows pricing** in user's local currency based on their location
5. **Responsive design** with modern UI/UX
6. **Client-side filtering** for instant results

**Requirements:**
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS (or specify your CSS framework)
- Firebase v10+
- Country detection and selection
- Mobile-responsive cards layout
- Filter by grade/subject/curriculum
- Professional pricing cards with features

**Deliverables:**
1. Complete file structure
2. All component code
3. Firebase service functions  
4. Types and utilities
5. Main page implementation
6. Styling with modern UI

Please provide production-ready code with proper error handling, loading states, and TypeScript types.

---

## 📋 Additional Context

- Firebase config: `{your-firebase-config}`
- Supported countries: UAE, Saudi Arabia, Qatar, USA, UK, Canada
- Currencies: AED, SAR, QAR, USD, GBP, CAD
- Package features: Should display as checkmark list
- Call-to-action: "Book Free Trial" and "Learn More" buttons
- SEO: Include proper meta tags and structured data

## 🎨 Design Preferences

- Clean, modern design
- Blue/indigo color scheme
- Card-based layout
- Hover effects and smooth transitions
- Clear pricing display with currency symbols
- Professional business look

Generate complete, copy-paste ready code for all components!