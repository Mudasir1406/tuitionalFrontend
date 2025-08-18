"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";
import { Filter_Data } from "../../services/filter-data/filter-data";
import { FormType } from "./form-dialouge";
import dynamic from "next/dynamic";
import useGeoLocation from "@/utils/slugHelper";

const TranslatableDropDown = dynamic(() => import("../DropDown/TranslatableDropDown"));
const PopUpButton = dynamic(() => import("../pop-up-button"));

interface FilterProps {
  data: Filter_Data;
}

const ArFilter: React.FC<FilterProps> = ({ data }) => {
  const [formData, setFormData] = useState<FormType>({
    FirstName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Grade: "",
    Curriculum: "",
    Subject: "",
    message: "",
    sheetName: "Lead Forms",
  });

  const handleChange = (key: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const geoData = useGeoLocation();

  React.useEffect(() => {
    if (!geoData.isLoading && !geoData.error) {
      const browser = navigator.userAgent;
      const pageURL = window.location.href;
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const params = new URLSearchParams(window.location.search);
      setFormData((prev) => ({
        ...prev,
        IP: geoData.ip || "",
        Country: geoData.country || "",
        Browser: browser,
        SourcePageURL: pageURL,
        Date: currentDate,
        Time: currentTime,
        UTMSource: params.get("utm_source") || "Direct",
        UTMMedium: params.get("utm_medium") || "Direct",
        UTMCampaign: params.get("utm_campaign") || "Direct",
        LeadSource: params.get("utm_source")
          ? "facebook"
          : "SEO",
      }));
    }
  }, [geoData]);

  return (
    <Box sx={styles.filter}>
      <Typography sx={styles.heading} component={"h1"} variant="h1">
        منصة التدريس الإلكترونية{" "}
        <Typography sx={styles.expertText} component={"span"} variant="h1">
          المصممة خصيصاً <br />{" "}
        </Typography>
        لجلسات التدريس الفردي المباشر
      </Typography>
      <Typography sx={styles.desc} component={"p"} variant="body2">
        تيوشنال هي منصة تدريس إلكترونية تقدم تعليماً عالي الجودة من خلال جلسات مباشرة
        للصفوف 6-8، شهادات IGCSE و GCSE، والمستويات المتقدمة. ابدأ رحلتك التعليمية.
      </Typography>
      <Box sx={styles.filterBox}>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={12} xs={12} md={12}>
            <TranslatableDropDown
              placeholder="اختر المنهج"
              data={data?.curriculum || []}
              value={formData.Curriculum}
              onChange={handleChange}
              name="Curriculum"
              locale="ar"
              isSubjectField={false}
            />
          </Grid>
          <Grid item lg={6} sm={12} xs={12} md={12}>
            <TranslatableDropDown
              placeholder="اختر الصف"
              data={data?.grade || []}
              value={formData.Grade}
              onChange={handleChange}
              name="Grade"
              locale="ar"
              isSubjectField={false}
            />
          </Grid>
          <Grid item lg={7} sm={12} xs={12} md={12}>
            <TranslatableDropDown
              placeholder="اختر المواد"
              data={data?.subject || []}
              value={formData.Subject}
              onChange={handleChange}
              name="Subject"
              multiple
              locale="ar"
              isSubjectField={true}
            />
          </Grid>
          <Grid item lg={5} sm={12} xs={12} md={12}>
            <PopUpButton
              text="ابدأ الآن"
              href="popup"
              values={formData}
              sx={styles.containedBtn}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ArFilter;

const styles = {
  filter: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    maxHeight: "700px",
    direction: "rtl",
  },
  heading: {
    width: {
      lg: "90%",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    marginTop: {
      xs: "2vh",
      sm: "3vh",
      md: "4vh",
    },
    color: "#000000",
    fontSize: {
      xs: "24px",
      sm: "24px",
      md: "28px",
      lg: "3.1rem",
    },
  },
  expertText: {
    color: "#51B893",
    display: "inline",
    position: "relative",
    fontSize: {
      xs: "24px",
      sm: "24px",
      md: "28px",
      lg: "3.1rem",
    },
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      left: {
        md: 0,
        lg: -45,
      },
      top: {
        xs: -20.5,
        sm: -20.5,
        md: -30.5,
        lg: -30.5,
      },
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesMobile.src})`,
        md: `url(${lines.src})`,
        lg: `url(${lines.src})`,
      },
      height: {
        xs: linesMobile.height,
        sm: linesMobile.height,
        md: lines.height,
        lg: lines.height,
      },
      width: {
        xs: linesMobile.width,
        sm: linesMobile.width,
        md: lines.width,
        lg: lines.width,
      },
      backgroundPosition: "end",
      backgroundRepeat: "no-repeat",
    },
  },
  desc: {
    textAlign: {
      xs: "center",
      lg: "start",
    },
    paddingX: {
      xs: "2vh",
      lg: "0vh",
    },
    marginTop: {
      xs: "2vh",
      sm: "3vh",
      md: "4vh",
    },
    color: "#000000",
    fontSize: {
      xs: "13px",
      sm: "15px",
      md: "16px",
      lg: "1.6rem",
    },
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "2vh",
    fontWeight: 700,
    lineHeight: "1.6vh",
    textAlign: "center",
    width: "100%",
    padding: "2vh",
    textTransform: "none",
    letterSpacing: "-2%",
    color: "white",
    borderRadius: "10px",
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
    },
  },
  filterBox: {
    backgroundColor: "#D7F0FF",
    paddingY: {
      xs: "3vh",
      sm: "3vh",
      md: "2vh",
      lg: "2vh",
    },
    paddingX: {
      xs: "3vh",
      sm: "3vh",
      md: "2vh",
      lg: "2vh",
    },
    borderRadius: {
      xs: "2vh",
      sm: "2vh",
      md: "1vh",
      lg: "1vh",
    },
    marginTop: "4vh",
    maxHeight: "70vh",
    animation: "rotateAnimation 1s ease-in-out infinite",
    transformOrigin: "center",
  },
};