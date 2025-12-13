// Frontend translation mapping for subjects only
export const subjectTranslations: Record<string, string> = {
  // Core Subjects
  "Mathematics": "الرياضيات",
  "Additional Mathematics": "الرياضيات الإضافية",
  "English": "اللغة الإنجليزية", 
  "English Literature": "الأدب الإنجليزي",
  "English First Language": "اللغة الإنجليزية كلغة أولى",
  "English Second Language": "اللغة الإنجليزية كلغة ثانية",
  "English first language": "اللغة الإنجليزية كلغة أولى",
  "English second language": "اللغة الإنجليزية كلغة ثانية",
  "English Second language": "اللغة الإنجليزية كلغة ثانية",
  "Arabic": "اللغة العربية",
  "Physics": "الفيزياء",
  "Chemistry": "الكيمياء",
  "Biology": "الأحياء",
  "Science": "العلوم",
  "Combined Science": "العلوم المدمجة",
  "Double Science": "العلوم المزدوجة",
  "Triple Science": "العلوم الثلاثية",
  
  // Advanced Sciences
  "Further Mathematics": "الرياضيات المتقدمة",
  "Environmental Science": "علوم البيئة",
  "Computer Science": "علوم الحاسوب",
  "Information Technology": "تقنية المعلومات",
  "ICT": "تقنية المعلومات والاتصالات",
  
  // Social Sciences  
  "History": "التاريخ",
  "Geography": "الجغرافيا",
  "Economics": "الاقتصاد",
  "Business Studies": "دراسات الأعمال",
  "Commerce": "التجارة",
  "Accounting": "المحاسبة",
  "Psychology": "علم النفس",
  "Sociology": "علم الاجتماع",
  "Global Perspectives": "المنظور العالمي",
  "Global perspectives": "المنظور العالمي", 
  "Global Prespective": "المنظور العالمي",
  "Global prespective": "المنظور العالمي",
  "Golobal Perspective": "المنظور العالمي",
  
  // Languages
  "French": "الفرنسية",
  "Spanish": "الإسبانية", 
  "German": "الألمانية",
  "Urdu": "الأردية",
  
  // Arts & Creative
  "Art & Design": "الفن والتصميم",
  "Music": "الموسيقى",
  "Drama": "المسرح",
  "Media Studies": "دراسات الإعلام",
  
  // Other Common Subjects
  "Religious Studies": "الدراسات الدينية",
  "Philosophy": "الفلسفة",
  "Physical Education": "التربية البدنية",
  "Food & Nutrition": "الغذاء والتغذية",
  "Nutrition": "التغذية",
  
  // Group Subjects
  "Group of 3": "مجموعة من 3",
  "Group of 5": "مجموعة من 5"
};

// Helper function to translate subject name
export const translateSubject = (subjectName: string, locale: string = 'en'): string => {
  if (locale === 'ar' && subjectTranslations[subjectName]) {
    return subjectTranslations[subjectName];
  }
  return subjectName; // Return original if no translation or English locale
};

// Helper function to get original English name (for form submission)
export const getOriginalSubjectName = (displayName: string): string => {
  // If it's already in English, return as-is
  if (!Object.values(subjectTranslations).includes(displayName)) {
    return displayName;
  }
  
  // Find the English key for the Arabic value
  const englishKey = Object.keys(subjectTranslations).find(
    key => subjectTranslations[key] === displayName
  );
  
  return englishKey || displayName;
};