import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { ResponsiveStyleValue } from "@mui/system/styleFunctionSx";
import { Property } from "csstype";
import React from "react";

interface Options {
  Header: any;
  Paragraph: string;
  SubjectsArray: any;
}

const TutoringOptions: React.FC<Options> = ({
  SubjectsArray = [],
  Paragraph,
  Header,
}) => {
  return (
    <>
      <Box sx={{ margin: "7vh" }}>
        <Typography sx={style.title}>{Header}</Typography>
        <Typography sx={style.description}>{Paragraph}</Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column", // Stack the rows vertically
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ maxWidth: "170vh", margin: "4vh auto" }}
          >
            {SubjectsArray.map(
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
                <Grid item xs={12} sm={6} key={index}>
                  <Button
                    sx={{
                      backgroundColor:
                        index === 0
                          ? String(button.backgroundColor)
                          : "#FFFFFF",
                      color: "#2D2D2D", // Text color
                      width: "100%",
                      borderRadius: index === 0 ? "5vh" : "50px", // Apply border-radius conditionally
                      padding: "16px",
                      textAlign: "center",
                      fontSize: "2vh",
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
