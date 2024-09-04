import { Box, Button, Grid, Icon, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import tutors from '../../../public/assets/images/static/tutoring.png'
import icon from '../../../public/assets/images/svg/blueminusicon.svg'

interface ArrayOflist {
  ArrayOflist: string;
}

// Define an interface for the props
interface ArrayOflistProps {
  Header: any;
  Button: string;
  ArrayOflist: any;
}

const ChemistryTutoring: React.FC<ArrayOflistProps> = ({ ArrayOflist = [], Button, Header }) => {

  return (
    <>
      <Box sx={{ margin: "7vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Typography sx={style.tutorheading}>
                {Header}
              </Typography>
              <Box sx={{ my: 2 }}>
                <Image src={tutors} alt='image' style={{ height: "70vh", width: "70vh" }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',  // Center the button horizontally
                  width: '100%',  // Ensure the Box takes full width of Grid item
                  mt: 2  // Margin top to separate button from other content
                }}
              >
                <Typography
                  sx={{
                    backgroundColor: "#38B6FF",
                    filter: "drop-shadow(1px 15px 34px rgba(56, 182, 255, 0.40))",
                    color: "#FFF",
                    width: '50vh',  // Button width
                    height: '8vh', // Button height
                    borderRadius: "2vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2vh",

                  }}
                >
                  {Button}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Grid container spacing={2}>
              {ArrayOflist.map((box: { head: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; body: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }, index: React.Key | null | undefined) => (
                <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                  <Box sx={style.boxes}>
                    <Box>
                      <Typography sx={style.titlebox}>{box.head}</Typography>
                      <Typography sx={style.desc}>{box.body}</Typography>
                    </Box>
                    <Box>
                      <Image src={icon} alt="icon" style={{ height: "12vh", width: "6vh" }} />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ChemistryTutoring

const style = {
  tutorheading: {
    fontSize: {
      lg: "5vh"
    },
    width: {
      lg: "66vh"
    },
    fontWeight: 600,
  },
  boxes: {
    height: "10vh",
    padding: 3,
    display: "flex",
    justifyContent: "space-between",
    background: "#D3EFFF",
    boxShadow: "0px -5px 15px 0px rgba(56, 182, 255, 0.20)",
    backdropFilter: "blur(5px)",
    borderRadius: "2vh",
  },
  titlebox: {
    marginBottom: 1,
    fontSize: {
      lg: "2.1vh",
    },
    color: "#2D2D2D",
    fontWeight: 600,
  },
  desc: {
    color: "#505050",
    fontSize: {
      lg: "1.8vh",
    },
    fontWeight: 400,
    width: {
      lg: "72.5vh"
    }
  }
}