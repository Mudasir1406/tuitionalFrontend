import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import pic from "../../../public/assets/images/svg/EllipseCore.svg";
import img1 from "../../../public/assets/images/static/weightimg1.png";
import img2 from "../../../public/assets/images/static/weightimg1.png";

const AssessmentObjective = () => {
  const CoreAos = [
    {
      Elipse: pic,
      heading: "Core Qualification of the AQS",
      desc: [
        "Assessment objectives as a percentage of the Core qualification",
        "Assessment objectives",
        "AO1 Demonstrate knowledge and understanding of mathematical techniques",
        "AO2 Reason, interpret and communicate mathematically when solving problems"
      ],
      weight: img1,
    },
    {
      Elipse: pic,
      heading: "Extended Qualification of the AQs",
      desc: [
        "Assessment objectives as a percentage of the Core qualification",
        "Assessment objectives",
        "AO1 Demonstrate knowledge and understanding of mathematical techniques",
        "AO2 Reason, interpret and communicate mathematically when solving problems"
      ],
      weight: img2,
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "auto",
          margin: { lg: "11vh 6vh" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginY: { lg: "4vh" },
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ width: { lg: "50%" }, margin: "0 auto" }}>
                <Typography sx={style.Obj}>
                  Assessment Objective (AQs) in The Cambridge IGCSE Math
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={1}>
            {CoreAos.map((item, index) => (
              <Grid item xs={12} sm={12} md={12} lg={6} key={index}>
                <Box sx={style.Boxes}>
                  <Typography sx={style.heading}>{item.heading}</Typography>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row", lg: "row" },
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: { lg: "60%", sm: "100%", md: "90%" },
                      }}
                    >
                      {item.desc.map((desc, descIndex) => (
                        <Box sx={style.textBox} key={descIndex}>
                          <Typography>
                            <Image src={item.Elipse} alt="circle" style={{ height: "3vh" }} />
                          </Typography>
                          <Typography sx={style.textBoxdes1}>{desc}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ width: { lg: "40%", sm: "49%", md: "90%" } }}>
                      <Image
                        src={item.weight}
                        alt="weight"
                        style={{
                          width: "auto",
                          height: "30vh",
                          paddingTop: "2vh",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AssessmentObjective;

const style = {
  Obj: {
    fontWeight: "600",
    fontSize: { xs: "3vh", lg: "6vh" },
    lineHeight: { xs: "7vh", lg: "7vh" },
    textAlign: "center",
  },

  Boxes: {
    marginX: { lg: "1vh", sm: "1.5vh", md: "1.5" },
    border: "1px solid #BEBEBE",
    borderRadius: "3vh",
    paddingX: { lg: "5vh", sm: "2.5vh" },
    paddingBottom: { lg: "6vh", sm: "0vh" },
  },

  heading: {
    fontWeight: "600",
    fontSize: { lg: "4vh", sm: "2.5vh" },
    lineHeight: { xs: "7vh", lg: "17vh" },
  },

  textBox: {
    paddingY: { xs: "2vh", sm: "1vh", md: "2vh", lg: "1vh" },
    display: "flex",
  },

  textBoxdes1: {
    fontSize: { lg: "2.2vh" },
    paddingX: { lg: "2vh", sm: "1.5vh" },
  },
};
