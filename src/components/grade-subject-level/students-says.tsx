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
        className={leagueSpartan.className}
        // component={data.headerTag as keyof JSX.IntrinsicElements}
        component={"div"}
      >
        <div
          className={leagueSpartan.className}
          dangerouslySetInnerHTML={{
            __html: data?.header,
          }}
        ></div>
      </Typography>
      <Typography
        sx={styles.desc}
        className={leagueSpartan.className}
        component={"div"}
      >
        <div
          className={leagueSpartan.className}
          dangerouslySetInnerHTML={{
            __html: data?.paragraph,
          }}
        ></div>
      </Typography>
      <Grid container spacing={2}>
        {videoData.map((poster, index) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
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
    width: { xs: "180px", lg: "100%" },
    height: { xs: "180px", lg: "48vh" },
    borderRadius: "20px",
  },
  cardM: {
    width: { xs: "180px", lg: "100%" },
    height: { xs: "180px", lg: "48vh" },
    borderRadius: "20px",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: {
      xs: "0",
      lg: "7vh",
    },
    width: {
      xs: "90%",
      lg: "auto",
    },
    margin: {
      xs: "4vh 2vh",
      lg: "0",
    },
  },
  desc: {
    color: "#2D2D2D",
    width: {
      lg: "139vh",
      xs: "90%",
    },
    fontSize: {
      xs: "2vh",
      sm: "2vh",
      md: "55px",
      lg: "2vh",
    },
    fontWeight: 400,
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
    fontSize: {
      xs: "3.5vh",
      sm: "5vh",
      md: "55px",
      lg: "5.5vh",
    },
    fontWeight: 600,
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
      lg: "start",
    },
  },
};
