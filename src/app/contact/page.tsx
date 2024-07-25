import React from "react";
import { Header } from "../../components";

import Footer from "../../components/footer";
import LearnTogeather from "../../components/contact/learn-togeather";
import { Box, Container, Grid } from "@mui/material";
import GetInTouch from "../../components/contact/get-in-touch";
import Info from "../../components/contact/info";

const Contact: React.FC = () => {
  return (
    <>
      <Header
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
          <LearnTogeather />
        </Container>
      </Box>
      <GetInTouch />

      <Container sx={{ maxWidth: { lg: "1450px" } }}>
        <Info />
      </Container>
      <Footer />
    </>
  );
};

export default Contact;

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
