import React from 'react'
import img1 from '../../../public/assets/images/static/blogimg1.png'
import img2 from '../../../public/assets/images/static/blogimg2.png'
import img3 from '../../../public/assets/images/static/blogimg4.png'
import { Box, Grid, Typography } from '@mui/material'
const RelatedBlogs = () => {
  let Blogs = [
    {
      img: img1,
      title: "Embracing the Future of Learning",
      description:
        "Educational apps and software integrated into our platform can offer personalized practice.",
      date: "July 21, 2024",
    },
    {
      img: img2,
      title: "Unlocking Academic Success",
      description:
        "Educational apps and software integrated into our platform can offer personalized practice.",
      date: "June 03, 2024",
    },
    {
      img: img3,
      title: "From Flexibility to Expertise",
      description:
        "Educational apps and software integrated into our platform can offer personalized practice.",
      date: "March 09, 2024",
    },
  ]
  return (
    <>
      <Box sx={{
        margin: { lg: "0 7vh 7vh 7vh", sm: "0 3vh 7vh 3vh" }
      }}>
        <Typography sx={{ textAlign: "center", fontSize: { lg: "6vh", fontWeight: 600, padding: "3vh" } }}>Related Blogs</Typography>
        <Grid container spacing={1}>
          {
            Blogs.map((i, index) => (
              <Grid item xs={12} sm={4} md={4} lg={4} key={index}>
                <Box
                  sx={{
                    height: { lg: '40vh', sm: "20vh", xs: "30vh" }, // Adjust the height of the box
                    backgroundImage: `url(${i.img.src})`,// Background image
                    backgroundSize: 'cover', // Ensure the image covers the entire box
                    backgroundPosition: 'center', // Center the image
                    backgroundRepeat: 'no-repeat', // Prevent image repetition
                    padding: '2rem',
                    borderRadius: '2vh', // Optional: Add some border radius to the box
                  }}
                >
                </Box>
                <Typography sx={style.date}>{i.date}</Typography>
                <Typography sx={style.title}>{i.title}</Typography>
                <Typography sx={style.desc}>{i.description}</Typography>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </>
  )
}
export default RelatedBlogs
const style = {
  date: {
    fontSize: { lg: "2.4vh", xs: "" },
    color: "#A7A7A7",
    padding: { lg: "2vh 0 0 0", sm: "1vh 0 0 0" }
  },
  title: {
    fontSize: { lg: "3vh" },
    fontWeight: 600,
    color: "#000",
    padding: { lg: "2vh 0", sm: "1vh 0" },
    width: { sm: "20vh" },
  },
  desc: {
    fontSize: { lg: "2.4vh" },
    fontWeight: 400,
    color: "#2D2D2D",
    width: { lg: "50vh", sm: "22vh" },
  }
}