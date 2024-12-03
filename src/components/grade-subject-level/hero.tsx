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
          variant="h3"
          className={leagueSpartan.className}
          // component={data?.headerTag}

          component={data.headerTag as keyof JSX.IntrinsicElements}
        >
          {data?.header}
        </Typography>

        <Typography
          sx={styles.desc}
          className={leagueSpartan.className}
          component={"p"}
          dangerouslySetInnerHTML={{
            __html: data?.paragraph,
          }}
        ></Typography>

        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "70vh",
            },
          }}
        >
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                lg: "space-between",
              },
              // columnGap: "24px",
              flex: "0 1 calc(50% - 1rem)", // Ensures item alignment in pairs

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
                35000+ Tutoring Hours Provided
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
              flex: "0 1 calc(50% - 1rem)", // Ensures item alignment in pairs

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
                1 : 1 Online Classes
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
                12+ Tutor Year Experience
              </Typography>
            </Box>
          </Box> */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap", // Ensures items wrap to the next line
              justifyContent: {
                xs: "center",
                lg: "space-between",
              },
              gap: "24px", // Adds equal spacing between items
              marginTop: "3vh",
            }}
          >
            {/* Item 1 */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                flex: "1 1 calc(50% - 24px)", // Ensures equal width for all items
                maxWidth: "calc(50% - 24px)", // Prevents items from growing too much
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

            {/* Item 2 */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                flex: "1 1 calc(50% - 24px)",
                maxWidth: "calc(50% - 24px)",
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
                35000+ Tutoring Hours Provided
              </Typography>
            </Box>

            {/* Item 3 */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                flex: "1 1 calc(50% - 24px)",
                maxWidth: "calc(50% - 24px)",
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
                1 : 1 Online Classes
              </Typography>
            </Box>

            {/* Item 4 */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                flex: "1 1 calc(50% - 24px)",
                maxWidth: "calc(50% - 24px)",
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
                12+ Tutor Year Experience
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
    // fontSize: {
    //   xs: "24px",
    //   sm: "32px",
    //   md: "42px",
    //   lg: "5.5vh",
    // },
    // fontWeight: 700,
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
    // fontSize: {
    //   xs: "12px",
    //   sm: "12px",
    //   md: "14px",
    //   lg: "17px",
    // },
    // fontWeight: 400,
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
