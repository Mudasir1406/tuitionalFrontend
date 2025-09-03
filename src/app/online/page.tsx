
import React from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { SITE_URL } from "@/utils/env";
import { getDocumentsByName } from "@/services/grade-subject-level/grade-subject-level";
import { Metadata } from "next";

// Dynamic imports for optimization
const Header = dynamic(() => import("@/components").then(mod => ({ default: mod.Header })), { ssr: true });
const ServerFooter = dynamic(() => import("@/components/server-footer"), { ssr: true });

export const metadata: Metadata = {
  title: "Online Tutoring Services - Tuitional",
  description: "Get personalized online tutoring from qualified teachers for British curriculum subjects across the Gulf region",
  alternates: {
    canonical: `${SITE_URL}/online`,
  },
  openGraph: {
    title: "Online Tutoring Services - Tuitional",
    description: "Get personalized online tutoring from qualified teachers for British curriculum subjects across the Gulf region",
    url: `${SITE_URL}/online`,
    locale: "en",
  },
};

const OnlinePage = async () => {
  const data = await getDocumentsByName("grade-subject-level-en");
  
  return (
    <>
      <Header />
      <Box sx={{ 
        minHeight: "100vh", 
        paddingTop: "120px",
        paddingX: { xs: "3vw", md: "5vw" },
        paddingY: { xs: "2vh", md: "4vh" }
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
            Personalized Online Learning
          </h1>
          <p style={{ 
            fontSize: "1.2rem", 
            color: "#666",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            Get personalized online tutoring from qualified teachers for British curriculum subjects across the Gulf region
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
                href={`/online/${course.id}`}
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
                  Learn More
                </Box>
              </Box>
            ))}
          </Box>
        )}
        
        {(!data || data.length === 0) && (
          <Box sx={{ textAlign: "center", marginTop: 8 }}>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              No online courses available at the moment.
            </p>
          </Box>
        )}
      </Box>
      <ServerFooter />
    </>
  );
};

export default OnlinePage;