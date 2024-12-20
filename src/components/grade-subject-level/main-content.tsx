import { leagueSpartan } from "@/app/fonts";
import { PageData } from "@/types/grade-subject-level.types";
import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import React from "react";
interface IProps {
  data: PageData["main_content"];
}
const MainContent: React.FunctionComponent<IProps> = ({ data }) => {
  return (
    <>
      <Box sx={style.contanier}>
        <Typography
          sx={style.title}
          variant={data?.headerTag ? data.headerTag : ("h3" as any)}
          className={leagueSpartan.className}
          component={data?.headerTag ? data.headerTag : ("h3" as any)}
          dangerouslySetInnerHTML={{
            __html: data?.header,
          }}
        ></Typography>
        <Typography
          sx={style.description}
          component={"p"}
          variant="body2"
          dangerouslySetInnerHTML={{
            __html: data?.paragraph,
          }}
        ></Typography>

        {data?.subjects?.length > 0 && (
          <Box sx={style.box}>
            <Grid container spacing={2} sx={style.grid}>
              {data?.subjects.map((subject, index) => (
                <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
                  <Button
                    sx={style.button}
                    className={leagueSpartan.className}
                    href={subject.link || "#"}
                  >
                    {subject.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default MainContent;

const style = {
  contanier: { paddingX: "5vw" },
  grid: {
    margin: { lg: "0vh auto" },
  },
  title: {
    width: {
      xs: "100%", // Mobile view
      sm: "100%", // Tablet view
      md: "100%", // Laptop view
      lg: "50vw", // Desktop view
    },
    // fontSize: {
    //   xs: "3vh",
    //   sm: "5vh",
    //   md: "5.5vh",
    //   lg: "6vh",
    // },
    // fontWeight: 600,
    textAlign: { xs: "center", md: "left" },
    marginBottom: { xs: "2vh", md: "3vh" },
  },
  box: {
    margin: "0px 0",
  },
  description: {
    color: "#2D2D2D",
    width: {
      xs: "100%",
      sm: "100%",
      md: "100%",
      lg: "100%",
    },
    // fontSize: {
    //   xs: "1.8vh",
    //   sm: "2vh",
    //   md: "2vh",
    // },
    // fontWeight: 400,
    textAlign: { xs: "center", md: "left", lg: "left" },
    marginBottom: { xs: "2vh", md: "4vh" },
  },
  button: {
    backgroundColor: "#FFFFFF",
    color: "#2D2D2D",
    width: "100%",
    borderRadius: "5vh",
    padding: "16px",
    boxShadow: "0px -1px 10px 0px rgba(0, 0, 0, 0.15) inset",

    fontSize: {
      xs: "1.5vh",
      lg: "2vh",
    },
    transition: "all .2s ease-in-out",

    fontWeight: 500,
    ":hover": {
      backgroundColor: "#38B6FF59",
      transform: "scale(1.02)",
    },
  },
};
