import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import elpse1 from "../../../public/assets/images/svg/elpse-white1.svg";
import elpse2 from "../../../public/assets/images/svg/elpse-white2.svg";
import { PageData } from "@/types/grade-subject-level.types";

const BlogCta: React.FunctionComponent<{ data: PageData["blog_CTA"] }> = ({
  data,
}) => {
  return (
    <>
      <Box
        sx={{
          margin: {
            xs: "0 3vh",
            sm: "3vh",
            md: "0",
            lg: "0 7vh",
          },
          height: {
            xs: "auto",
            lg: "45vh",
          },
          position: "relative",
        }}
      >
        <Typography sx={style.reviewheading}>{data?.header}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column", // Stacks elements in a column for mobile view
              lg: "row",
            },
            justifyContent: "space-between",
            alignItems: "center",
            gap: {
              xs: "2vh", // Adds spacing between elements on mobile
              lg: "0",
            },
          }}
        >
          <Typography sx={style.reviewdeesc}>{data?.paragraph}</Typography>

          <Box>
            <Button
              variant="contained"
              sx={style.containedBtn}
              href={data.link}
            >
              {data.buttonText}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            display: {
              xs: "none", // Hides the image on small screens if needed
              lg: "block",
            },
          }}
        >
          <Image src={elpse1} alt="elpse" />
        </Box>

        <Box
          sx={{
            position: "absolute",
            right: 0,
            display: {
              xs: "none", // Hides the second image for small screens
              lg: "block",
            },
          }}
        >
          <Image src={elpse2} alt="elpse" style={{ height: "14vh" }} />
        </Box>
      </Box>
    </>
  );
};

export default BlogCta;

const style = {
  reviewheading: {
    fontSize: {
      xs: "2.6vh", // Adjusted heading size for mobile
      sm: "2.9vh",
      lg: "6vh",
    },
    lineHeight: {
      xs: "3.5vh", // Adjusted line height for better spacing on mobile
      lg: "7vh",
    },
    width: {
      xs: "100%", // Full width on mobile
      sm: "90%",
      lg: "145vh",
    },
    height: {
      lg: "10vh",
    },
    fontWeight: 700,
    textAlign: {
      sm: "left",
      xs: "left", // Center text on mobile for better layout
      lg: "left",
    },
  },

  reviewdeesc: {
    padding: {
      xs: "2vh 0", // Reduced padding for mobile
      lg: "8vh 0 5vh 0",
    },
    fontSize: {
      xs: "1.8vh", // Adjusted font size for mobile readability
      lg: "2.5vh",
    },
    lineHeight: {
      xs: "3vh", // Line height adjustment for mobile
      lg: "5vh",
    },
    width: {
      xs: "100%", // Full width on mobile
      lg: "130vh",
    },
    height: {
      lg: "7vh",
    },
    fontWeight: 400,
    textAlign: {
      xs: "justify",
      lg: "left",
    },
  },

  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "2vh",
    fontWeight: 700,
    paddingY: "1.5vh",
    margin: {
      xs: "3vh 0",
      sm: "2vh 0",
      lg: "5vh 20vh 0 0",
    },
    paddingX: "4vh",
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "100%",
      sm: "100%",
      md: "100%",
      lg: "auto",
    },
  },
};
