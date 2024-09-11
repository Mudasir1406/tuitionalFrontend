import React from 'react'
import img1 from '../../../public/assets/images/static/blogimg1.png'
import img2 from '../../../public/assets/images/static/blogimg2.png'
import img3 from '../../../public/assets/images/static/blogimg3.png'
import img4 from '../../../public/assets/images/static/blogimg4.png'
import ellipse1 from '../../../public/assets/images/static/conduciveEllipse1.png'
import ellipse2 from '../../../public/assets/images/static/conduciveEllipse2.png'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'

const ConduciveEnviroment = () => {
  const Images = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 }
  ];

  const Data = [
    {
      heading1: "Create a Conducive Learning Environment",
      para1: "To maximize the benefits of online tutoring, it’s important to create a dedicated learning space that fosters concentration and productivity. Start by selecting a quiet, well-lit area in your home where you can focus without interruptions. Ideally, this space should be separate from areas associated with relaxation or entertainment to help you mentally switch into “study mode” when you sit down.",
      para2: "Invest in ergonomic furniture to support your comfort during study sessions. A good chair with proper lumbar support and a desk at the right height can prevent strain and enhance your ability to focus for longer periods. Ensure your desk is organized and free of clutter to minimize distractions and keep essential materials within reach. Equip your learning space with the necessary tools for online tutoring. A reliable computer with up-to-date software and high-speed internet is crucial for smooth communication and access to online resources."
    },
    {
      heading2: "Utilize Resources and Tools for Learning",
      para3: "Tuitional Education provides access to a variety of resources designed to enhance your learning experience and support your academic growth. Beyond traditional tutoring sessions, our platform offers a suite of online tools and resources that can significantly augment your studies. Take advantage of interactive whiteboards, which allow for real-time collaboration and visualization of complex concepts. These digital tools enable you and your tutor to draw diagrams, solve problems together, and illustrate ideas dynamically, making abstract concepts more concrete and easier to understand.",
      para4: "Educational apps and software integrated into our platform can offer personalized practice and reinforce what you’ve learned in your sessions. From interactive quizzes and flashcards to simulation games and problem-solving apps, these tools can cater to different learning styles and provide engaging ways to review and apply your knowledge."
    }
  ];

  return (
    <>
      <Box sx={{ margin: { lg: "0 7vh", xs: "5vh 3vh  3vh" } }}>
        <Grid container spacing={1}>
          {Images.map((i, index) => (
            <Grid item xs={6} sm={6} md={6} lg={3} key={index}>
              <Box
                sx={{
                  backgroundImage: `url(${i.img.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: { lg: '40vh', xs: "25vh" },
                  width: { lg: '100%', xs: "100%", sm: "100%", md: "100%" },
                  borderRadius: "2vh",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ position: "relative" }}>
        <Box sx={{ margin: { lg: "8vh 0" } }}>
          <Grid container spacing={1}>
            {Data.map((text, index) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                <Box sx={style.textBox}>
                  <Typography sx={style.heading}>{text.heading1}</Typography>
                  <Typography sx={style.para}>{text.para1}</Typography>
                  <Typography sx={style.para}>{text.para2}</Typography>
                </Box>
                <Box sx={style.textBox}>
                  <Typography sx={style.heading}>{text.heading2}</Typography>
                  <Typography sx={style.para}>{text.para3}</Typography>
                  <Typography sx={style.para}>{text.para4}</Typography>
                </Box>
              </Grid>
            ))}

            <Box sx={{
              position: "absolute",
              bottom: { lg: 50, xs: 250 },
            }}>
              <Image src={ellipse1} alt='' style={{ width: "8vh", height: "auto" }} />
            </Box>
            <Box sx={{
              position: "absolute",
              top: { lg: 50, xs: 130 },
              right: 0,
            }}>
              <Image src={ellipse2} alt='' style={{ width: "8vh", height: "auto" }} />
            </Box>
          </Grid >
        </Box >
      </Box>
    </>

  )
}

export default ConduciveEnviroment;

const style = {
  textBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    width: { lg: "auto", xs: "35vh" },
    color: "#000",
    fontSize: { lg: "5vh", xs: "3vh" },
    fontWeight: 600,
    textAlign: "center",
  },
  para: {
    width: { lg: "125vh", xs: "44vh", sm: "55vh" },
    color: "#2D2D2D",
    fontSize: { lg: "2.4vh", xs: "1.5vh" },
    fontWeight: 400,
    padding: { lg: "2vh 0 0 0", sm: "1.5vh 0 0 0" },
    textAlign: { lg: "left", xs: "left", sm: "justify" }
  }
}