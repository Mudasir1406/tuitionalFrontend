import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const FindingCambridge = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: "145vh", margin: "0 0 0 30vh" }}>
          <Typography sx={style.finding}>
            Finding Cambridge IGCSE Chemistry Challenging?
          </Typography>
          <Typography sx={style.description}>
            Learning this subject can be both exciting and tough. Many students
            look for extra help to do well in their studies.
          </Typography>
          <Typography sx={style.description}>
            Our Cambridge IGCSE Chemistry 0971 tutors are here to support you.
            With their knowledge and teaching skills, they&apos;ll help you
            understand the subject better and succeed in your exams.
          </Typography>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "15vh",
              width: "100%",
              maxWidth: "100%", // Ensure it adjusts correctly
            }}
          >
            <TextField
              placeholder="Mobile Number with Country Code"
              sx={{
                backgroundColor: "#FFFFFF",
                boxShadow:
                  "0px -5px 15px 0px rgba(0, 0, 0, 0.20), 0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
                width: "100%",
                borderRadius: "2vh",
                paddingRight: "7vw",
              }}
            />
            <Button
              sx={{
                position: "absolute",
                right: "0",
                backgroundColor: "#38B6FF",
                color: "#FFFFFF",
                width: "40%",
                height: "8.5vh",
                borderRadius: "2vh",
                border: "none",
                ":hover": {
                  backgroundColor: "#2694D6",
                },
              }}
            >
              Schedule Your Chemistry Demo!
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FindingCambridge;

const style = {
  finding: {
    fontSize: {
      lg: "4vh",
    },
    fontWeight: 600,
    textAlign: "center",
    padding: "2vh 0 0 0",
  },
  description: {
    fontSize: {
      lg: "2.2vh",
    },
    fontWeight: 400,
    textAlign: "center",
    padding: {
      lg: "2vh 0",
    },
  },
};
