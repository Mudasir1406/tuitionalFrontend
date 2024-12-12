`'use client'`;
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { PageData } from "@/types/grade-subject-level.types";
import { leagueSpartan } from "@/app/fonts";

interface IProps {
  data: PageData["popular_subjects"];
}

const PopularSubjects: React.FunctionComponent<IProps> = ({ data }) => {
  return (
    <Box sx={{ paddingX: "5vw" }}>
      <Box>
        <Typography
          sx={style.popularText}
          className={leagueSpartan.className}
          variant={data?.headerTag as any}
          component={data?.headerTag as keyof JSX.IntrinsicElements}
          dangerouslySetInnerHTML={{
            __html: data?.header,
          }}
        ></Typography>
      </Box>

      <Box sx={style.contain}>
        <Grid container spacing={2} justifyContent="center">
          {data?.subjects.map(
            (
              item: {
                icon: string | StaticImport;
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
              <Grid item xs={3} sm={3} md={3} lg={1.5} key={index}>
                <Box sx={style.cardsBoxes}>
                  <Image
                    src={
                      item?.icon ||
                      "https://firebasestorage.googleapis.com/v0/b/tuitional-website.appspot.com/o/images%2FGroup%201577707240.png?alt=media&token=688d2e56-d995-4c40-b8ad-ae9837138df7"
                    }
                    alt="icon"
                    width={50} // Set appropriate width for your icons
                    height={50} // Set appropriate height for your icons
                  />
                  <Typography
                    sx={style.subjects}
                    className={leagueSpartan.className}
                    variant="body1"
                    component={"p"}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
};
export default PopularSubjects;

const style = {
  contain: { marginY: { lg: "6vh", sm: "5vh", xs: "4vh" } },
  popularText: {
    textAlign: "center",
    // fontWeight: "600",
    // textAlign: "center",
    // fontSize: { lg: "5vh", sm: "2.5vh", xs: "3vh" },
    // width: { lg: "45%", sm: "52%" },
    margin: "0 auto",
  },
  subjects: {
    color: "#2D2D2D",
    // fontWeight: "600",
    // fontSize: { lg: "2vh", xs: "1.2vh" },
  },
  cardsBoxes: {
    background: "#FFF",
    backdropFilter: "blur(5px)",
    borderRadius: "2vh",
    boxShadow: "0px -2.171px 6.514px 0px rgba(0, 0, 0, 0.20) inset",
    textAlign: "center",
    padding: {
      xs: "2.5vh",
      lg: "4vh",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: {
      xs: "9vh",
      lg: "12vh",
    },
    transition: "all .5s ease-in-out",

    ":hover": {
      transform: "scale(1.05)",
      background: "#9EDCFF",
    },
  },
};
