"use client"
import { Box, Grid, List, ListItem, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import React, { useState } from 'react';

const Embrace = () => {
  const [openLists, setOpenLists] = useState<Record<string, boolean>>({
    list9: true,
    list6: true,
    list4: true,
    list5: true,
    list2: true,
  });

  const toggleList = (listKey: string) => {
    setOpenLists(prevState => ({
      ...prevState,
      [listKey]: !prevState[listKey]
    }));
  };

  const getListItems = (listKey: string) => {
    switch (listKey) {
      case 'list9':
        return Array(9).fill('IGCSE Maths');
      case 'list6':
        return Array(6).fill('IGCSE Maths');
      case 'list4':
        return Array(4).fill('IGCSE Maths');
      case 'list5':
        return Array(5).fill('IGCSE Maths');
      case 'list2':
        return Array(2).fill('IGCSE Maths');
      default:
        return [];
    }
  };

  const RightBoxText = [
    {
      heading1: "Embrace the Flexibility of Online Learning",
      para1: "One of the greatest advantages of online tutoring is flexibility. With Tuitional Education, you have the power to schedule sessions at times that work best for you. Whether you’re a night owl or an early bird, you can tailor your learning experience to fit your unique lifestyle. This flexibility allows you to balance your studies with other commitments, such as extracurricular activities, part-time jobs, or family responsibilities.",
      para2: "Moreover, the option to choose from a wide range of tutors means you can find someone whose teaching style aligns perfectly with your learning preferences, whether you need early morning sessions to start your day right or late-night reviews to wrap up your studies. The asynchronous nature of online resources also complements this flexibility, enabling you to access materials, review lessons, and complete assignments whenever it’s most convenient for you."
    },
    {
      heading2: "Create a Conducive Learning Environment",
      para3: "To maximize the benefits of online tutoring, it’s important to create a dedicated learning space that fosters concentration and productivity. Start by selecting a quiet, well-lit area in your home where you can focus without interruptions. Ideally, this space should be separate from areas associated with relaxation or entertainment to help you mentally switch into “study mode” when you sit down.",
      para4: "Invest in ergonomic furniture to support your comfort during study sessions. A good chair with proper lumbar support and a desk at the right height can prevent strain and enhance your ability to focus for longer periods. Ensure your desk is organized and free of clutter to minimize distractions and keep essential materials within reach. Equip your learning space with the necessary tools for online tutoring. A reliable computer with up-to-date software and high-speed internet is crucial for smooth communication and access to online resources."
    },
    {
      heading3: "Utilize Resources and Tools for Learning",
      para5: "Tuitional Education provides access to a variety of resources designed to enhance your learning experience and support your academic growth. Beyond traditional tutoring sessions, our platform offers a suite of online tools and resources that can significantly augment your studies. Take advantage of interactive whiteboards, which allow for real-time collaboration and visualization of complex concepts. These digital tools enable you and your tutor to draw diagrams, solve problems together, and illustrate ideas dynamically, making abstract concepts more concrete and easier to understand.",
      para6: "Educational apps and software integrated into our platform can offer personalized practice and reinforce what you’ve learned in your sessions. From interactive quizzes and flashcards to simulation games and problem-solving apps, these tools can cater to different learning styles and provide engaging ways to review and apply your knowledge."
    }
  ];

  return (
    <>
      <Box sx={{ margin: { lg: "15vh 0", } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                background: '#EDF9FFCC',
                borderRadius: '0 2vh 2vh 0',
                boxShadow: '0px -3px 10px 0px rgba(0, 0, 0, 0.15) inset',
                padding: { xs: '2vh 0', sm: '4vh 0' },
                width: { lg: '100%', xs: "100%", sm: "100%" },
              }}
            >
              {['list9', 'list6', 'list4', 'list5', 'list2'].map((listKey) => (
                <React.Fragment key={listKey}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '.5rem',
                      width: '100%', // Ensure flex items fill width
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '2vh', sm: '2.4vh' }, // Smaller font size on mobile
                        fontWeight: 600,
                        textAlign: 'center', // Ensure proper alignment on mobile
                      }}
                    >
                      IGCSE CAIE Tutoring
                    </Typography>

                    <IconButton onClick={() => toggleList(listKey)}>
                      {openLists[listKey] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>

                  {openLists[listKey] && (
                    <List
                      sx={{
                        width: '100%',
                        textAlign: 'center', // Center the list items 
                        listStyleType: 'disc', // Add bullet points 
                        paddingLeft: 0, // Remove default padding for proper centering
                        display: 'flex',
                        flexDirection: 'column', // Ensure list is vertical
                        justifyContent: 'center', // Center list items vertically
                        alignItems: 'center', // Center list items horizontally
                      }}
                    >
                      {getListItems(listKey).map((item, i) => (
                        <ListItem
                          key={i}
                          sx={{
                            listStyleType: 'disc', // Bullet point
                            display: 'list-item', // Ensure the bullet point shows
                            fontSize: '2vh',
                            color: '#2D2D2D',
                            fontWeight: 400,
                            width: 'auto', // Center the item by limiting its width
                            textAlign: 'center', // Center the text
                            paddingLeft: '1rem', // Adjust padding to place bullets properly
                          }}
                        >
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={9}>
            <Grid container spacing={2}>
              {RightBoxText.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Box>
                    <Box sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      {item.heading1 && <Typography sx={style.heading}>{item.heading1}</Typography>}
                      {item.para1 && <Typography sx={style.paragraph}>{item.para1}</Typography>}
                      {item.para2 && <Typography sx={style.paragraph}>{item.para2}</Typography>}
                    </Box>
                    <Box sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      {item.heading2 && <Typography sx={style.heading}>{item.heading2}</Typography>}
                      {item.para3 && <Typography sx={style.paragraph}>{item.para3}</Typography>}
                      {item.para4 && <Typography sx={style.paragraph}>{item.para4}</Typography>}
                    </Box>
                    <Box sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      {item.heading3 && <Typography sx={style.heading}>{item.heading3}</Typography>}
                      {item.para5 && <Typography sx={style.paragraph}>{item.para5}</Typography>}
                      {item.para6 && <Typography sx={style.paragraph}>{item.para6}</Typography>}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Embrace;

const style = {
  heading: {
    width: { lg: "auto", xs: "34vh" },
    fontSize: { lg: "5vh", xs: "3vh" },
    fontWeight: 600,
    color: "#000",
    textAlign: "center",
    padding: "4vh 0 0 0"
  },
  paragraph: {
    width: { lg: "135vh", xs: "45vh", sm: "65vh" },
    fontSize: { lg: "2.4vh", xs: "1.6vh" },
    color: "#2D2D2D",
    fontWeight: 400,
    padding: { lg: "4vh 0 0 0", xs: "2vh 0 0 0" },
    lineHeight: { lg: "4vh", },
    textAlign: { lg: "left", sm: "justify" }
  }
}
