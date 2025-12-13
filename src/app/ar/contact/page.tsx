import React from "react";
import ArHeader from "../../../components/ar-header";

import ArServerFooter from "../../../components/ar-server-footer";
import ArLearnTogeather from "../../../components/contact/ar-learn-togeather";
import { Box, Container, Grid } from "@mui/material";
import ArGetInTouch from "../../../components/contact/get-in-touch/ArGetInTouch";
import ArInfo from "../../../components/contact/ar-info";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";

export const metadata: Metadata = {
  title: "تواصل مع دعم تيوشنال لاستفساراتك",
  description: `تواصل مع تيوشنال للحصول على الدعم الأكاديمي والحصول على إجابات لجميع استفساراتك. لا تتردد، نحن على بعد نقرة واحدة فقط.`,
  alternates: {
    canonical: `${SITE_URL}/ar/contact`,
  },
};

const ArContact: React.FC = () => {
  return (
    <div dir="rtl">
      <ArHeader
        background={{
          height: {
            xs: "100px",
            sm: "100px",
            md: "200px",
            lg: "200px",
          },
          background: "#D7F0FF",
        }}
      />
      <Box sx={styles.background}>
        <Container sx={styles.contanier}>
          <ArLearnTogeather />
        </Container>
      </Box>
      <ArGetInTouch />

      <Container
        sx={{ maxWidth: { lg: "1450px", margin: "auto" }, marginTop: "5vh", marginBottom: "3vh" }}
      >
        <ArInfo />
      </Container>
      <ArServerFooter />
    </div>
  );
};

export default ArContact;

const styles = {
  contanier: {
    maxWidth: { lg: "1450px" },
    paddingTop: {
      xs: "120px",
      sm: "150px",
      md: "200px",
      lg: "210px",
    },
  },
  background: {
    background: "#D7F0FF",
  },
};