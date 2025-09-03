// Mapping functions to convert Arabic values to English for tutor filtering

// Curriculum mapping from Arabic to English
const curriculumMapping: Record<string, string> = {
  // Arabic curriculum names mapped to English
  "البكالوريا الدولية": "IB",
  "المنهج البريطاني": "British Curriculum", 
  "IGCSE": "IGCSE",
  "A Level": "A Level",
  "AS Level": "AS Level",
  "منهج أمريكي": "American Curriculum",
  "منهج كندي": "Canadian Curriculum",
  // Add more mappings as needed
};

// Subject mapping from Arabic to English  
const subjectMapping: Record<string, string> = {
  // Arabic subject names mapped to English
  "الرياضيات": "Mathematics",
  "رياضيات": "Mathematics", 
  "Math": "Mathematics",
  "Maths": "Mathematics",
  "الفيزياء": "Physics",
  "فيزياء": "Physics",
  "الكيمياء": "Chemistry", 
  "كيمياء": "Chemistry",
  "الأحياء": "Biology",
  "أحياء": "Biology", 
  "اللغة الإنجليزية": "English",
  "إنجليزي": "English",
  "English": "English",
  "العلوم": "Science",
  "علوم": "Science",
  "Science": "Science",
  // Add more mappings as needed
};

/**
 * Maps Arabic curriculum name to English equivalent
 * Returns the original value if no mapping found
 */
export const mapCurriculumToEnglish = (curriculum: string): string => {
  if (!curriculum) return "";
  
  // Check direct mapping
  const mapped = curriculumMapping[curriculum];
  if (mapped) return mapped;
  
  // Check case-insensitive partial matches
  const lowerCurriculum = curriculum.toLowerCase();
  for (const [arabic, english] of Object.entries(curriculumMapping)) {
    if (lowerCurriculum.includes(arabic.toLowerCase()) || 
        lowerCurriculum.includes(english.toLowerCase())) {
      return english;
    }
  }
  
  // Return original if no mapping found (assume it's already in English)
  return curriculum;
};

/**
 * Maps Arabic subject name to English equivalent  
 * Returns the original value if no mapping found
 */
export const mapSubjectToEnglish = (subject: string): string => {
  if (!subject) return "";
  
  // Check direct mapping
  const mapped = subjectMapping[subject];
  if (mapped) return mapped;
  
  // Check case-insensitive partial matches
  const lowerSubject = subject.toLowerCase();
  for (const [arabic, english] of Object.entries(subjectMapping)) {
    if (lowerSubject.includes(arabic.toLowerCase()) || 
        lowerSubject.includes(english.toLowerCase())) {
      return english;
    }
  }
  
  // Return original if no mapping found (assume it's already in English)
  return subject;
};

/**
 * Enhanced getTutorsByFilter that handles Arabic to English mapping
 */
export const getTutorsByFilterWithMapping = async (
  curriculum: string,
  subject: string
): Promise<any[]> => {
  // Import the original function
  const { getTutorsByFilter } = await import('./grade-subject-level');
  
  // Map Arabic values to English
  const mappedCurriculum = mapCurriculumToEnglish(curriculum);
  const mappedSubject = mapSubjectToEnglish(subject);
  
  console.log(`Mapping: ${curriculum} -> ${mappedCurriculum}, ${subject} -> ${mappedSubject}`);
  
  // Call original function with mapped English values
  return getTutorsByFilter(mappedCurriculum, mappedSubject);
};