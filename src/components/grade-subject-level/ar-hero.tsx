import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import greenstar from "../../../public/assets/images/svg/greenstar.svg";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";
import Image from "next/image";
import CircleIcon from "@mui/icons-material/Circle";
import { PageData } from "@/types/grade-subject-level.types";

type IProps = {
  data: PageData["hero_section"];
  withForm?: boolean;
};

const ArHero: React.FC<IProps> = ({ data, withForm }) => {
  return (
    <>
      <Box
        sx={{
          height: { lg: "65vh" },
          paddingInlineStart: { lg: "5vw" }, // RTL: padding-right in RTL, padding-left in LTR
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          direction: "rtl",
        }}
      >
        <Typography
          sx={styles.heading}
          variant={data?.headerTag ? data?.headerTag : ("h1" as any)}
          className={leagueSpartan.className}
          component={data?.headerTag ? data?.headerTag : ("h1" as any)}
          dangerouslySetInnerHTML={{
            __html: data?.header,
          }}
        ></Typography>

        <Typography
          sx={styles.desc}
          className={leagueSpartan.className}
          component={"p"}
          variant="body2"
        >
          {data?.paragraph}
        </Typography>

        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: {
                xs: "center",
                lg: "space-between",
              },
              gap: "16px",
              marginTop: "3vh",
              width: { xs: "100%", sm: "60%", lg: "100%" },
              marginX: "auto",
              direction: "rtl",
            }}
          >
            {withForm ? (
              <Typography
                sx={styles.desc}
                className={leagueSpartan.className}
                component={"p"}
                variant="subtitle1"
              >
                {data?.imageAltText
                  ? data?.imageAltText
                  : "IGCSE A Level | IGCSE AS Level"}
              </Typography>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", sm: "center", lg: "right" },
                    flex: "1 1 calc(50% - 24px)",
                    maxWidth: "calc(50% - 24px)",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="caption"
                    className={leagueSpartan.className}
                    component={"p"}
                    sx={{ marginLeft: "8px" }}
                  >
                    9756 طالب نشط
                  </Typography>
                  <CircleIcon
                    sx={{
                      color: "#38B6FF",
                      fontSize: "1rem",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", sm: "center", lg: "right" },
                    flex: "1 1 calc(50% - 24px)",
                    maxWidth: "calc(50% - 24px)",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="caption"
                    className={leagueSpartan.className}
                    component={"p"}
                    sx={{ marginLeft: "8px" }}
                  >
                    أكثر من 35000 ساعة تدريس
                  </Typography>
                  <CircleIcon
                    sx={{
                      color: "#38B6FF",
                      fontSize: "1rem",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", sm: "center", lg: "right" },
                    flex: "1 1 calc(50% - 24px)",
                    maxWidth: "calc(50% - 24px)",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="caption"
                    className={leagueSpartan.className}
                    component={"p"}
                    sx={{ marginLeft: "8px" }}
                  >
                    حصص فردية 1:1 عبر الإنترنت
                  </Typography>
                  <CircleIcon
                    sx={{
                      color: "#38B6FF",
                      fontSize: "1rem",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", sm: "center", lg: "right" },
                    flex: "1 1 calc(50% - 24px)",
                    maxWidth: "calc(50% - 24px)",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="caption"
                    className={leagueSpartan.className}
                    component={"p"}
                    sx={{ marginLeft: "8px" }}
                  >
                    أكثر من 12 سنة خبرة تدريسية
                  </Typography>
                  <CircleIcon
                    sx={{
                      color: "#38B6FF",
                      fontSize: "1rem",
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>

        {!withForm && (
          <Box
            sx={{
              width: {
                xs: "100%",
                lg: "75vh",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "row",
                  lg: "row",
                },
                alignItems: {
                  xs: "center",
                  lg: "flex-start",
                },
                justifyContent: {
                  xs: "center",
                  lg: "end",
                },
                marginTop: "4vh",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  src={greenstar}
                  alt="img"
                  style={{ height: "3vh", width: "3vh" }}
                />
                <Typography
                  sx={{
                    padding: ".7vh 1vh 0 0",
                  }}
                  className={leagueSpartan.className}
                  component={"p"}
                  variant="subtitle2"
                >
                  Trustpilot
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    padding: "1vh 0 0 0",
                  }}
                  className={leagueSpartan.className}
                  component={"p"}
                  variant="caption"
                >
                  Excellent (4.7/5)
                </Typography>
                <Image
                  src={greenstars}
                  alt="img"
                  style={{
                    height: "3vh",
                    width: "14vh",
                    padding: ".7vh 2vh 0 0",
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ArHero;

const styles = {
  heading: {
    fontWeight: 700,
    fontSize: {
      xs: "1.8rem",
      sm: "2.2rem",
      md: "2.5rem",
      lg: "3rem",
    },
    lineHeight: 1.2,
    color: "#000000",
    textAlign: "right" as const,
    marginBottom: "1.5vh",
  },
  desc: {
    fontWeight: 400,
    fontSize: {
      xs: "0.9rem",
      sm: "1rem",
      lg: "1.1rem",
    },
    lineHeight: 1.6,
    color: "#797979",
    textAlign: "right" as const,
    marginBottom: "1vh",
  },
};