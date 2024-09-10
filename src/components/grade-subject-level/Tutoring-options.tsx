import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { ResponsiveStyleValue } from "@mui/system/styleFunctionSx";
import { Property } from "csstype";
import React from "react";

interface Options {
  Header: string;
  Paragraph: string;
  SubjectsArray: any;
}

const TutoringOptions = ({data}: any) => {
  return (
    <>
      <Box sx={{ margin: { lg: "0 7vh", xs: "3vh", } }}>
        <Typography sx={style.title}>{data?.Header}</Typography>
        <Typography sx={style.description}>{data?.Paragraph}</Typography>

        <Box>
          <Grid
            container
            spacing={2}
            sx={{ maxWidth: { xs: "320vh", lg: "170vh" }, margin: { lg: "4vh auto" } }}
          >
            {data?.SubjectsArray.map(
              (
                button: {
                  backgroundColor:
                  | (string & {})
                  | SystemStyleObject<Theme>
                  | (string | number)
                  | ((
                    theme: Theme
                  ) => string | number | SystemStyleObject<Theme>)
                  | readonly string[]
                  | readonly (
                    | readonly string[]
                    | Property.BackgroundColor
                    | null
                    | undefined
                  )[]
                  | {
                    [key: string]:
                    | readonly string[]
                    | Property.BackgroundColor
                    | null
                    | undefined;
                  }
                  | ((
                    theme: Theme
                  ) => ResponsiveStyleValue<
                    readonly string[] | Property.BackgroundColor | undefined
                  >)
                  | undefined;
                  name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                },
                index: React.Key | null | undefined
              ) => (
                <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
                  <Button
                    sx={{
                      backgroundColor: index === 0 ? "#38B6FF59" : "#FFFFFF",
                      color: "#2D2D2D",
                      width: "100%",
                      borderRadius: "5vh",
                      padding: "16px",
                      fontSize: {
                        xs: "1.5vh",
                        lg: "2vh",
                      },
                      fontWeight: 500,
                    }}
                  >
                    {button.name}
                  </Button>
                </Grid>
              )
            )}
          </Grid>
        </Box>

      </Box>
    </>
  );
};

export default TutoringOptions;

const style = {
  title: {
    width: {
      xs: "100%", // Mobile view
      sm: "100%", // Tablet view
      md: "100%", // Laptop view
      lg: "92vh", // Desktop view
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
      lg: "190vh",
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
