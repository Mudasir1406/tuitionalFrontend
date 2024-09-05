import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import greenstar from "../../../public/assets/images/svg/greenstar.svg";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";
import Image from "next/image";

import CircleIcon from "@mui/icons-material/Circle";

type IProps = {
  data: any;
};

const Hero: React.FC<IProps> = ({ data }: any) => {
  return (
    <>
      <Box sx={{ padding: { lg: "0 0 0 11vh", xs: "0 3vh" }, height: { lg: "65vh" } }}>
        <Typography sx={styles.heading} className={leagueSpartan.className}>
          {data?.Header}
        </Typography>
        <Typography sx={styles.desc} className={leagueSpartan.className}>
          {data?.Paragraph}
        </Typography>

        <Box sx={{
          width: {
            xs: "100%",
            lg: "53vh",
          },
        }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: {
                xs: "center",
                lg: "space-between",
              },
              marginTop: '3vh',

            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: {
                  xs: "center",
                  lg: "start",
                },
                cursor: 'pointer',

              }}
            >
              <CircleIcon
                sx={{
                  color: "#38B6FF",
                  fontSize: "1rem",
                  marginRight: "8px",
                }}
              />
              <Typography sx={{ fontSize: "2vh", color: "#797979" }}>
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
              <Typography sx={{
                fontSize: "2vh", color: "#797979", margin: {
                  xs: "0 0 0 8px",
                },
              }}>
                9756 Active Students
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: {
                xs: "center",
                lg: "space-between",
              },
              marginTop: '3vh',

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
                  color: '#38B6FF',
                  fontSize: '1rem',
                  margin: '0 8px 0 0',

                }}
              />
              <Typography sx={{ fontSize: "2vh", color: "#797979" }}>
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
                  color: '#38B6FF',
                  fontSize: '1rem',
                  margin: {
                    xs: "0 0 0 8px",
                    lg: '0 8px 0 0 ',
                  },
                }}
              />
              <Typography sx={{
                fontSize: "2vh", color: "#797979", margin: {
                  xs: "0 0 0 8px",
                },
              }}>
                9756 Active Students
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{
          width: {
            xs: "100%",
            lg: "75vh",
          },
        }}>
          <Box
            sx={{
              display: 'flex',
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
              marginTop: '3vh',

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
                sx={{ fontSize: { lg: "2vh", xs: "1.7vh" }, fontWeight: 400, padding: "1vh 0 0 0" }}
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
      lg: "80vh",
      sm: "100%",
    },
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
      lg: "start",
    },
    fontSize: {
      xs: "5.7vh",
      sm: "6vh",
      md: "5.3vh",
      lg: "7vh",
    },
    fontWeight: 700,
    lineHeight: {
      xs: "5.5vh",
      sm: "6.5vh",
      md: "5.5vh",
      lg: "10vh",
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
      lg: "6vh",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    marginTop: "2vh",
  },
};
