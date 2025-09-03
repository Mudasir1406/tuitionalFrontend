import React from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { Metadata } from "next/metadata";
import { SITE_URL } from "@/utils/env";
import { getDocumentsByName } from "@/services/grade-subject-level/grade-subject-level";

// Dynamic imports for optimization
const ArHeader = dynamic(() => import("@/components/ar-header"), { ssr: true });
const ArServerFooter = dynamic(() => import("@/components/ar-server-footer"), { ssr: true });

export const metadata: Metadata = {
  title: "دروس خصوصية عبر الإنترنت - تيوشنال",
  description: "احصل على دروس خصوصية عبر الإنترنت من أفضل المعلمين المؤهلين للمناهج البريطانية في منطقة الخليج",
  alternates: {
    canonical: `${SITE_URL}/ar/online`,
  },
  openGraph: {
    title: "دروس خصوصية عبر الإنترنت - تيوشنال",
    description: "احصل على دروس خصوصية عبر الإنترنت من أفضل المعلمين المؤهلين للمناهج البريطانية في منطقة الخليج",
    url: `${SITE_URL}/ar/online`,
    locale: "ar",
  },
};

const ArOnlinePage = async () => {
  const data = await getDocumentsByName("grade-subject-level-ar");
  
  return (
    <>
      <ArHeader />
      <Box sx={{ 
        minHeight: "100vh", 
        paddingTop: "120px",
        paddingX: { xs: "3vw", md: "5vw" },
        paddingY: { xs: "2vh", md: "4vh" },
        direction: "rtl"
      }}>
        <Box sx={{ 
          textAlign: "center", 
          marginBottom: { xs: "4vh", md: "6vh" }
        }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "bold", 
            color: "#1a1a1a",
            marginBottom: "1rem"
          }}>
            التعلم الإلكتروني المخصص
          </h1>
          <p style={{ 
            fontSize: "1.2rem", 
            color: "#666",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            احصل على دروس خصوصية عبر الإنترنت من أفضل المعلمين المؤهلين للمناهج البريطانية في منطقة الخليج
          </p>
        </Box>
        
        {data && data.length > 0 && (
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 3,
            marginTop: 4
          }}>
            {data.map((course: any) => (
              <Box
                key={course.id}
                component="a"
                href={`/ar/online/${course.id}`}
                sx={{
                  display: "block",
                  padding: 3,
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderColor: "#2196f3"
                  }
                }}
              >
                {course.hero_section?.image && (
                  <Box
                    component="img"
                    src={course.hero_section.image}
                    alt={course.hero_section.imageAltText || course.hero_section.title}
                    sx={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginBottom: 2
                    }}
                  />
                )}
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "#1a1a1a"
                }}>
                  {course.hero_section?.title || course.id}
                </h3>
                {course.hero_section?.subtitle && (
                  <p style={{
                    fontSize: "0.95rem",
                    color: "#666",
                    lineHeight: "1.4",
                    marginBottom: "1rem"
                  }}>
                    {course.hero_section.subtitle}
                  </p>
                )}
                <Box sx={{
                  display: "inline-block",
                  padding: "8px 16px",
                  backgroundColor: "#2196f3",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                  fontWeight: "500"
                }}>
                  تعرف أكثر
                </Box>
              </Box>
            ))}
          </Box>
        )}
        
        {(!data || data.length === 0) && (
          <Box sx={{ textAlign: "center", marginTop: 8 }}>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              لا توجد دورات عبر الإنترنت متاحة في الوقت الحالي.
            </p>
          </Box>
        )}
      </Box>
      <ArServerFooter />
    </>
  );
};

export default ArOnlinePage;