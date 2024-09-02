import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import greenstar from "../../../public/assets/images/svg/greenstar.svg";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";
import Image from "next/image";
import CircleIcon from '@mui/icons-material/Circle';
const Hero: React.FC = () => {

  return (
    <>
      <Box sx={{ padding: { lg: "0 0 0 11vh" }, height: "65vh" }}>
        <Typography sx={styles.heading} className={leagueSpartan.className}>
          Cambridge IGCSE
          <span style={{ color: '#38B6FF' }}> {/* Change color here */}
            Chemistry
          </span>
          Tutoring Online Sessions
        </Typography>
        <Typography sx={styles.desc} className={leagueSpartan.className}>
          Personalized Online Tutoring by Highly Experienced Cambridge IGCSE Certified Tutors for Comprehensive Support and Success
        </Typography>

        <Box sx={{
          width: "53vh",
        }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: "space-between",
              marginTop: '3vh',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <CircleIcon
                sx={{
                  color: '#38B6FF',
                  fontSize: '1rem',
                  marginRight: '8px',
                }}
              />
              <Typography sx={{ fontSize: "2vh" }}>
                9756 Active Students
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <CircleIcon
                sx={{
                  color: '#38B6FF',
                  fontSize: '1rem',
                  marginRight: '8px',
                }}
              />
              <Typography sx={{ fontSize: "2vh" }}>
                9756 Active Students
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: "space-between",
              marginTop: '3vh',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <CircleIcon
                sx={{
                  color: '#38B6FF',
                  fontSize: '1rem',
                  marginRight: '8px',
                }}
              />
              <Typography sx={{ fontSize: "2vh" }}>
                9756 Active Students
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <CircleIcon
                sx={{
                  color: '#38B6FF',
                  fontSize: '1rem',
                  marginRight: '8px',
                }}
              />
              <Typography sx={{ fontSize: "2vh" }}>
                9756 Active Students
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{
          width: "75vh",
        }}>
          <Box
            sx={{
              display: 'flex',
              marginTop: '3vh',
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Image src={greenstar} alt="img" style={{ height: "6vh", width: "7vh" }} />
              <Typography sx={{ fontSize: "2.9vh", fontWeight: 600, padding: "1vh 0 0 0" }}>
                Trustpilot
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: "2.5vh", fontWeight: 600, padding: "1vh 0 0 0" }}>
                Excellent (4.7/5)
              </Typography>
              <Image src={greenstars} alt="img" style={{
                height: "4vh", width: "20vh",
                padding: "1vh 0 0 2vh"
              }} />
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
      lg: "87vh",
    },
    fontSize: {
      xs: "5.7vh",
      sm: "6.5vh",
      md: "5.3vh",
      lg: "8.5vh",
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
