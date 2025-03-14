"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import tutors from "../../../public/assets/images/static/tutoring.webp";
import icon from "../../../public/assets/images/svg/blueminusicon.svg";
import { PageData } from "@/types/grade-subject-level.types";
import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "../pop-up-button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

interface IProps {
  data: PageData["demo_pointers"];
}

const DemoPointers: React.FunctionComponent<IProps> = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | false>(0); // Default to first index
  const handleChange =
    (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedIndex(isExpanded ? index : false); // Update the expanded index
    };
  return (
    <>
      <Box sx={style.contanier}>
        <Grid
          container
          spacing={{
            xs: 0, // No spacing for extra-small and small screens
            sm: 0, // No spacing for small screens
            md: 2, // No spacing for medium screens
            lg: 2, // Apply spacing for large screens and above
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            sx={{
              mb: { xs: 2, sm: 2, md: 2 }, // Add margin-bottom for medium and smaller screens
            }}
          >
            <Box sx={style.imgDiv}>
              <Typography
                sx={style.tutorheading}
                variant={data?.headerTag as any}
                className={leagueSpartan.className}
                component={data?.headerTag as keyof JSX.IntrinsicElements}
                dangerouslySetInnerHTML={{
                  __html: data?.header,
                }}
              ></Typography>
              <Box sx={style.imageContanier}>
                <Image
                  src={tutors.src}
                  alt="image"
                  style={style.image}
                  width={tutors.width}
                  height={tutors.height}
                />
              </Box>
              <PopUpButton
                sx={style.containButton}
                href={data.buttonLink}
                text={data?.buttonText}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Grid
              container
              spacing={{
                xs: 0, // No spacing for extra-small and small screens
                sm: 2, // No spacing for small screens
                md: 2, // No spacing for medium screens
                lg: 2, // Apply spacing for large screens and above
              }}
            >
              {/* {data?.demoPointersData?.map(
                (box, index: React.Key | null | undefined) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={style.boxes}>
                      <Box>
                        <Typography
                          sx={style.titlebox}
                          className={leagueSpartan.className}
                          component={"p"}
                          variant="subtitle2"
                          dangerouslySetInnerHTML={{
                            __html: box.header,
                          }}
                        ></Typography>
                        {expandedIndex === index && (
                          <Typography
                            sx={{
                              ...style.desc,
                              animation: "fadeIn 0.3s ease-in-out",
                            }}
                            className={leagueSpartan.className}
                            component={"p"}
                            variant="body2"
                            dangerouslySetInnerHTML={{
                              __html: box.body,
                            }}
                          ></Typography>
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: {
                            xs: "block",
                            sm: "block",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => toggleExpand(index)}
                      >
                        <Image
                          src={icon}
                          alt="icon"
                          style={{ height: "5vh", width: "5vh" }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                )
              )} */}
              {data?.demoPointersData?.map((box, index) => (
                <Accordion
                  key={index}
                  expanded={expandedIndex === index} // Check if the current index matches expandedIndex
                  onChange={handleChange(index)}
                  sx={{
                    background: "#D3EFFF",
                    borderRadius: "12px",
                    boxShadow:
                      "0px -5px 15px 0px rgba(56, 182, 255, 0.2) inset",
                    marginBottom: "16px",
                    minHeight: "72px", // Increase height of accordion
                    "&:before": { display: "none" }, // Removes default divider
                    "& .MuiAccordionSummary-root": {
                      minHeight: "72px", // Ensure the summary matches the accordion height
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        sx={{
                          background: "#30AFFF", // Set your desired color
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {expandedIndex === index ? (
                          <RemoveOutlinedIcon sx={{ color: "white" }} />
                        ) : (
                          <AddOutlinedIcon sx={{ color: "white" }} />
                        )}
                      </Box>
                    }
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        margin: "12px 0",
                      },
                    }}
                  >
                    <Typography
                      className={leagueSpartan.className}
                      component="p"
                      variant="subtitle2"
                      dangerouslySetInnerHTML={{ __html: box.header }}
                    ></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{
                        // color: "#505050",
                        animation: "fadeIn 0.3s ease-in-out",
                      }}
                      className={leagueSpartan.className}
                      component="p"
                      variant="body2"
                      dangerouslySetInnerHTML={{ __html: box.body }}
                    ></Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DemoPointers;

const style = {
  contanier: {
    //  margin: { lg: "6vh 7vh", xs: "3vh 3vw" }
    width: { lg: "auto", sm: "auto" },
    margin: {
      xs: "0vh 3vw",
      lg: "0vh 5vw",
    },
  },

  imgDiv: {},
  tutorheading: {
    width: {
      xs: "auto",
    },
    textAlign: { xs: "center", sm: "left", lg: "left" },
  },
  image: {
    width: "80%",
    height: "100%",
  },
  imageContanier: { textAlign: { xs: "center", sm: "left" } },
  boxes: {
    height: "auto",
    padding: 3,
    display: "flex",
    flexDirection: { xs: "row", sm: "row" },
    justifyContent: "space-between",
    background: "#D3EFFF",
    backdropFilter: "blur(10px)",
    borderRadius: "2vh",
    mb: { xs: 2, sm: 0 },
    alignItems: { xs: "flex-start", lg: "center" },

    boxShadow: "0px -5px 15px 0px rgba(56, 182, 255, 0.2) inset",
  },
  titlebox: {
    marginBottom: 1,
  },
  desc: {
    color: "#505050",

    width: "90%",
    textWrap: "pretty",
  },
  containButton: {
    backgroundColor: "#38B6FF",
    color: "#FFF",
    width: { xs: "88%", sm: "60%" },
    height: "8vh",
    borderRadius: "2vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // fontSize: "2vh",
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    marginLeft: { xs: "auto", md: "6vw" },
    marginRight: { xs: "auto" },
    marginTop: "2vh",
    ":hover": {
      boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
      backgroundColor: "#38B6FF",
    },
  },
};
