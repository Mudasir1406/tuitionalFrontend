import { leagueSpartan } from "@/app/fonts";
import { PageData } from "@/types/grade-subject-level.types";
import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import React from "react";
import { renderWithLineBreaks } from "../line-break-text";

interface IProps {
  data: PageData["main_content"];
}

const MainContent: React.FunctionComponent<IProps> = ({ data }) => {
  return (
    <>
      <Box sx={{ paddingX: "5vw" }}>
        <Typography
          sx={style.title}
          className={leagueSpartan.className}
          component={data.headerTag as keyof JSX.IntrinsicElements}
        >
          {renderWithLineBreaks(data?.header)}
        </Typography>
        <Typography sx={style.description} className={leagueSpartan.className}>
          {renderWithLineBreaks(data?.paragraph)}
        </Typography>

        <Box>
          <Grid
            container
            spacing={2}
            sx={{
              maxWidth: { xs: "320vh", lg: "170vh" },
              margin: { lg: "4vh auto" },
            }}
          >
            {data?.subjects.map((subject, index) => (
              <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
                <Button
                  sx={{
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
                  }}
                  className={leagueSpartan.className}
                >
                  {subject.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MainContent;

const style = {
  title: {
    width: {
      xs: "100%", // Mobile view
      sm: "100%", // Tablet view
      md: "100%", // Laptop view
      lg: "50vw", // Desktop view
    },
    fontSize: {
      xs: "3vh",
      sm: "5vh",
      md: "5.5vh",
      lg: "6vh",
    },
    fontWeight: 600,
    textAlign: { xs: "center", md: "left" },
    marginBottom: { xs: "2vh", md: "3vh" },
  },
  description: {
    color: "#2D2D2D",
    width: {
      xs: "100%",
      sm: "100%",
      md: "100%",
      lg: "100%",
    },
    fontSize: {
      xs: "1.8vh",
      sm: "2vh",
      md: "2vh",
    },
    fontWeight: 400,
    textAlign: { xs: "justify", md: "left", lg: "left" },
    marginBottom: { xs: "2vh", md: "4vh" },
  },
};
