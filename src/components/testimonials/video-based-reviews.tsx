import React from "react";
import linesMobileWhite from "../../../public/assets/images/static/linesMobileWhite.png";
import linesInvertWhite from "../../../public/assets/images/static/lines-invert-white.png";
import { Box, Card, CardMedia, Typography, Grid } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import logo from "../../../public/assets/images/static/logo.png";
import { leagueSpartan } from "@/app/fonts";

const VideoBasedReview = () => {
  return (
    <Box sx={styles.contanier}>
      <Typography sx={styles.heading} className={leagueSpartan.className}>
        Video-Based Reviews
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
          <Card
            sx={{
              width: "100%",
              height: { xs: "327px", sm: "400px", md: "500px", lg: "707px" },
              boxShadow:
                "0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D",
              borderRadius: "20px",
            }}
          >
            <CardMedia
              component="video"
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              controls
              poster={logo.src}
              sx={{ width: "100%", height: "100%" }}
            />
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={5}
          xl={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            {[1, 2, 3].map((index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    // width: "100%",
                    height: { xs: "147px", lg: "204px" },
                    boxShadow:
                      "0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D",
                    borderRadius: "20px",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(255,255,255,0.7)",
                  }}
                >
                  <CardMedia
                    component="video"
                    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    controls
                    poster={logo.src}
                    sx={{
                      width: { xs: "184px", lg: "283px" },
                      height: { xs: "135px", lg: "204px" },
                      borderRadius: "10px",
                    }}
                  />
                  <Box sx={{ marginLeft: "25px" }}>
                    <Typography
                      className={leagueSpartan.className}
                      sx={{
                        fontSize: {
                          xs: "20px",
                          sm: "30px",
                          md: "30px",
                          lg: "30px",
                        },
                        fontWeight: 600,
                        lineHeight: {
                          xs: "32px",
                          sm: "32px",
                          md: "32px",
                          lg: "32px",
                        },
                        color: "black",
                        marginY: { xs: "10px", lg: "20px" },
                      }}
                    >
                      Fatima Ayadi
                    </Typography>
                    <Typography
                      className={leagueSpartan.className}
                      sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "18px",
                          md: "18px",
                          lg: "18px",
                        },
                        fontWeight: 400,
                        lineHeight: {
                          xs: "20px",
                          sm: "20px",
                          md: "20px",
                          lg: "20px",
                        },
                        color: "black",
                        marginY: { xs: "10px", lg: "20px" },
                      }}
                    >
                      United Arab Emirates
                    </Typography>
                    <Typography
                      className={leagueSpartan.className}
                      sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "18px",
                          md: "18px",
                          lg: "18px",
                        },
                        fontWeight: 600,
                        lineHeight: {
                          xs: "20px",
                          sm: "20px",
                          md: "20px",
                          lg: "20px",
                        },
                        color: "#00A1FF",
                        marginY: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Watch Video <PlayArrowIcon />
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoBasedReview;

const styles = {
  contanier: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  heading: {
    fontSize: {
      xs: "35px",
      sm: "40px",
      md: "55px",
      lg: "55px",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "45px",
      sm: "50px",
      md: "65px",
      lg: "65px",
    },
    position: "relative",
    color: "black",
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
      lg: "start",
    },
    marginBottom: {
      xs: "50px",
      sm: "50px",
      md: "50px",
      lg: "50px",
    },
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      left: {
        xs: 10,
        sm: -30,
        md: -30,
        lg: -30,
      },
      top: {
        xs: -15,
        sm: -50,
        md: -50,
        lg: -50,
      },
      backgroundImage: {
        xs: `url(${linesMobileWhite.src})`,
        sm: `url(${linesInvertWhite.src})`,
        md: `url(${linesInvertWhite.src})`,
        lg: `url(${linesInvertWhite.src})`,
      },
      height: "12px",
      width: "14px",
      backgroundRepeat: "no-repeat",
    },
  },
};
