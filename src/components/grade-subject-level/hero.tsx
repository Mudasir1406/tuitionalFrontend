import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import greenstar from "../../../public/assets/images/svg/greenstar.svg";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";
import Image from "next/image";
import CircleIcon from "@mui/icons-material/Circle";
import { PageData } from "@/types/grade-subject-level.types";

type IProps = {
  data: PageData["hero_section"];
};

const Hero: React.FC<IProps> = ({ data }) => {
  return (
    <>
      <Box
        sx={{
          height: { lg: "65vh" },
          paddingLeft: "5vw",
        }}
      >
        <Typography
          sx={styles.heading}
          className={leagueSpartan.className}
          component={"div"}
          // component={data.headerTag as keyof JSX.IntrinsicElements}
        >
          <div
            className={leagueSpartan.className}
            dangerouslySetInnerHTML={{
              __html: data?.header,
            }}
          ></div>
        </Typography>
        <Typography
          sx={styles.desc}
          className={leagueSpartan.className}
          // component={"p"}
          component={"div"}
        >
          <div
            className={leagueSpartan.className}
            dangerouslySetInnerHTML={{
              __html: data?.paragraph,
            }}
          ></div>
        </Typography>

        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "53vh",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                lg: "space-between",
              },
              marginTop: "3vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  lg: "start",
                },
                cursor: "pointer",
              }}
            >
              <CircleIcon
                sx={{
                  color: "#38B6FF",
                  fontSize: "1rem",
                  marginRight: "8px",
                }}
              />
              <Typography
                sx={{ fontSize: "2vh", color: "#797979" }}
                className={leagueSpartan.className}
                component={"p"}
              >
                9756 Active Students
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <CircleIcon
                sx={{
                  color: "#38B6FF",
                  fontSize: "1rem",
                  margin: {
                    xs: "0 0 0 8px",
                    lg: "0 8px 0 0",
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: "2vh",
                  color: "#797979",
                  margin: {
                    xs: "0 0 0 8px",
                  },
                }}
                className={leagueSpartan.className}
                component={"p"}
              >
                9756 Active Students
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                lg: "space-between",
              },
              marginTop: "3vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <CircleIcon
                sx={{
                  color: "#38B6FF",
                  fontSize: "1rem",
                  margin: "0 8px 0 0",
                }}
              />
              <Typography
                sx={{ fontSize: "2vh", color: "#797979" }}
                className={leagueSpartan.className}
                component={"p"}
              >
                9756 Active Students
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <CircleIcon
                sx={{
                  color: "#38B6FF",
                  fontSize: "1rem",
                  margin: {
                    xs: "0 0 0 8px",
                    lg: "0 8px 0 0 ",
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: "2vh",
                  color: "#797979",
                  margin: {
                    xs: "0 0 0 8px",
                  },
                }}
                className={leagueSpartan.className}
                component={"p"}
              >
                9756 Active Students
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "75vh",
            },
          }}
        >
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
              marginTop: "3vh",

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
                  fontSize: "2.3vh",
                  padding: ".7vh 0 0 1vh",
                  fontWeight: 600,
                }}
                className={leagueSpartan.className}
                component={"p"}
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
                  fontSize: { lg: "2vh", xs: "1.7vh" },
                  fontWeight: 400,
                  padding: "1vh 0 0 0",
                }}
                className={leagueSpartan.className}
                component={"p"}
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
        </Box>
      </Box>
    </>
  );
};
export default Hero;

const styles = {
  heading: {
    width: {
      xs: "100%",
      lg: "35vw",
      sm: "100%",
    },
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
      lg: "start",
    },
    fontSize: {
      xs: "24px",
      sm: "32px",
      md: "42px",
      lg: "5.5vh",
    },
    fontWeight: 700,
    lineHeight: {
      xs: "28px",
      sm: "36px",
      md: "46px",
      lg: "5.5vh",
    },
    marginTop: {
      xs: "3vh",
      sm: "3vh",
      md: "3vh",
      lg: "10vh",
    },
    color: "#000000",
  },
  desc: {
    width: {
      sm: "100%",
      lg: "75vh",
    },
    fontSize: {
      xs: "2.5vh",
      sm: "2vh",
      md: "2.5vh",
      lg: "2vh",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "2.5vh",
      sm: "2.4vh",
      md: "2.8vh",
      lg: "2.8vh",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    marginTop: "2vh",
  },
};
