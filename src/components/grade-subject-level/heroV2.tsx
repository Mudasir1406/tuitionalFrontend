import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import greenstar from "../../../public/assets/images/svg/greenstar.svg";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";
import Image from "next/image";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PageData } from "@/types/grade-subject-level.types";

type IProps = {
  data: PageData["hero_section"];
  withForm?: boolean;
};

const HeroV2: React.FC<IProps> = ({ data, withForm }) => {
  // console.log("heroComp", data);
  return (
    <>
      <Box
        sx={{
          height: { lg: "65vh" },
          paddingLeft: { lg: "5vw" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // marginX: { sm: "12px", lg: 0 },
        }}
      >
        <Typography
          sx={styles.heading}
          variant={data?.headerTag ? data?.headerTag : ("h1" as any)}
          className={leagueSpartan.className}
          // component={data?.headerTag}

          component={data?.headerTag ? data?.headerTag : ("h1" as any)}
          dangerouslySetInnerHTML={{
            __html: data?.header,
          }}
        ></Typography>

        <Typography
          sx={styles.desc}
          className={leagueSpartan.className}
          component={"p"}
          variant="body2"
        >
          {data?.paragraph}
        </Typography>

        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "100%",
              // lg: "70vh",
            },
          }}
        >
        </Box>

        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "75vh",
            },
          }}
        >
          {withForm ? (
            // IGCSE Bullet Points with Check Icons
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginTop: { xs: "2vh", md: "3vh" },
                  marginBottom: "2vh",
                }}
              >
                {[
                  "1:1 Live Tutors",
                  "Qualified, Vetted Tutors", 
                  "Interactive Learning",
                  "Flexible Scheduling",
                  "Parent & Student Portal"
                ].map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: {
                        xs: "center",
                        lg: "flex-start",
                      },
                    }}
                  >
                    <CheckCircleIcon
                      sx={{
                        color: "#22C55E",
                        fontSize: "1.2rem",
                        marginRight: "8px",
                      }}
                    />
                    <Typography
                      variant="body2"
                      className={leagueSpartan.className}
                      component="span"
                      sx={{
                        fontWeight: 500,
                        color: "#374151",
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              {/* Bottom tagline */}
             
            </Box>
          ) : (
            // Original Trustpilot section for other pages
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "row",
                  lg: "row",
                },
                alignItems: {
                  xs: "center",
                  lg: "flex-start",
                },
                justifyContent: {
                  xs: "center",
                  lg: "start",
                },
                marginTop: { xs: "1vh", md: "4vh" },
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  src={greenstar}
                  alt="img"
                  style={{ height: "3vh", width: "3vh" }}
                />
                <Typography
                  sx={{
                    padding: ".7vh 0 0 1vh",
                  }}
                  className={leagueSpartan.className}
                  component={"p"}
                  variant="subtitle2"
                >
                  Trustpilot
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    padding: "1vh 0 0 0",
                  }}
                  className={leagueSpartan.className}
                  component={"p"}
                  variant="caption"
                >
                  Excellent (4.7/5)
                </Typography>
                <Image
                  src={greenstars}
                  alt="img"
                  style={{
                    height: "3vh",
                    width: "14vh",
                    padding: ".7vh 0 0 2vh",
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
export default HeroV2;

const styles = {
  heading: {
    width: {
      xs: "100%",
      // lg: "35vw",
      sm: "100%",
    },
    letterSpacing: "-0.5px", // Reduced letter spacing
    textAlign: {
      xs: "center",
      sm: "center",
      md: "center",
      lg: "start",
    },
    // fontSize: {
    //   xs: "24px",
    //   sm: "32px",
    //   md: "42px",
    //   lg: "5.5vh",
    // },
    // fontWeight: 700,
    // lineHeight: {
    //   xs: "28px",
    //   sm: "36px",
    //   md: "46px",
    //   lg: "5.5vh",
    // },
    marginTop: {
      xs: "3vh",
      sm: "3vh",
      md: "3vh",
      lg: "0vh",
    },
    color: "#000000",
  },
  desc: {
    width: {
      sm: "100%",
      lg: "90%",
    },
    // fontSize: {
    //   xs: "12px",
    //   sm: "12px",
    //   md: "14px",
    //   lg: "17px",
    // },
    // fontWeight: 400,
    // lineHeight: {
    //   xs: "2.5vh",
    //   sm: "2.4vh",
    //   md: "2.8vh",
    //   lg: "2.8vh",
    // },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    marginTop: "2vh",
  },
};
