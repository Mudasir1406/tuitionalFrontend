"use client";
import React, { useEffect, useState } from "react";
import { useI18n } from "@/context/language-context";
import { getFooterData, FooterData } from "@/services/footer/footer";
import Footer from "./footer";

const FooterWrapper: React.FC = () => {
  const { locale } = useI18n();
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const data = await getFooterData(locale);
        
        // Validate the data structure
        if (data && typeof data === 'object') {
          setFooterData(data);
        } else {
          console.warn("Invalid footer data structure received:", data);
          // Set a default empty structure to prevent errors
          setFooterData({
            id: "",
            aboutUs: [],
            curriculums: [],
            getHelp: [],
            subjects: [],
            link: {
              facebook: "",
              insta: "",
              linkdin: "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
        // Set default empty structure on error
        setFooterData({
          id: "",
          aboutUs: [],
          curriculums: [],
          getHelp: [],
          subjects: [],
          link: {
            facebook: "",
            insta: "",
            linkdin: "",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, [locale]);

  if (loading) {
    return null; // Don't show anything while loading
  }

  return <Footer footerData={footerData} />;
};

export default FooterWrapper;