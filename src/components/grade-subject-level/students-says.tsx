import React from "react";
import { Box, Card, CardMedia, Typography, Grid } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

import poster1 from "../../../public/assets/images/static/thumbile.webp";
import poster2 from "../../../public/assets/images/static/thumbile2.webp";
import poster3 from "../../../public/assets/images/static/thumbile3.webp";
import poster4 from "../../../public/assets/images/static/thumbile4.webp";
import { PageData } from "@/types/grade-subject-level.types";
import { renderWithLineBreaks } from "../line-break-text";
import { getVideoReviews } from "@/services/video-reviews/video-reviews";

const StudentSays: React.FunctionComponent<{
  data: PageData["what_our_student_says"];
}> = async ({ data }) => {
  const videoData = await getVideoReviews();

  const posters = [poster1, poster2, poster3, poster4];

  return (
    <Box sx={styles.container}>
      <Typography
        sx={styles.heading}
        variant={data?.headerTag as any}
        className={leagueSpartan.className}
        component={data?.headerTag as keyof JSX.IntrinsicElements}
        dangerouslySetInnerHTML={{
          __html: data?.header,
        }}
      ></Typography>
      <Typography
        sx={styles.desc}
        variant="body1"
        className={leagueSpartan.className}
        component={"p"}
        dangerouslySetInnerHTML={{
          __html: data?.paragraph,
        }}
      ></Typography>

      <Grid container spacing={2}>
        {videoData.map((poster, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={styles.card}>
              <CardMedia
                component="video"
                src={poster.video}
                controls
                poster={poster.thumbnil}
                sx={styles.cardM}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentSays;

const styles = {
  card: {
    width: { xs: "100%", sm: "100%", lg: "100%" },
    // width: { xs: "165px", sm: "100%", lg: "100%" },
    height: { xs: "165px", lg: "48vh" },
    borderRadius: "20px",
  },
  cardM: {
    width: { xs: "100%", sm: "100%", lg: "100%" },
    // width: { xs: "165px", sm: "100%", lg: "100%" },
    height: { xs: "165px", lg: "48vh" },
    borderRadius: "20px",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingX: {
      xs: "0",
      lg: "5vw",
    },
    width: {
      // xs: "100%",
      lg: "auto",
    },
    margin: {
      xs: "4vh 3vw",
      lg: "4vh 2vh",
    },
  },
  desc: {
    color: "#2D2D2D",
    width: {
      lg: "139vh",
      xs: "100%",
    },
    // fontSize: {
    //   xs: "12px",
    //   sm: "12px",
    //   md: "16px",
    //   lg: "18px",
    // },
    // fontWeight: 400,
    textAlign: {
      xs: "justify",
      sm: "center",
      md: "start",
      lg: "center",
    },
    padding: {
      xs: "2vh 0 4vh 0",
      lg: "1vh 0 3vh 0",
    },
  },
  heading: {
    // fontSize: {
    //   xs: "30px",
    //   // sm: "5vh",
    //   md: "55px",
    //   // lg: "5.5vh",
    // },
    // fontWeight: 600,
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
      lg: "start",
    },
  },
};
