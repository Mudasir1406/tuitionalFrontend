"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { leagueSpartan } from "@/app/fonts";
import styles from "./BenifitsOfStudyingSection.module.css";

import Image from "next/image";
import minusIcon from "../../../../public/assets/images/svg/blueminusicon.svg";
import { PageData } from "@/types/grade-subject-level.types";

type IProps = { data: PageData["igcse_in_dubai"] };

const BenifitsOfStudyingSection: React.FunctionComponent<IProps> = ({
  data,
}) => {
  const [expandedBoxes, setExpandedBoxes] = useState<{
    [key: number]: boolean;
  }>({ 0: true }); // First benefit is open by default.
  const [expandedRequirement, setExpandedRequirement] = useState<{
    [key: number]: boolean;
  }>({ 0: true }); // First requirement is open by default.

  const toggleBox = (index: number) => {
    setExpandedBoxes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleRequirement = (index: number) => {
    setExpandedRequirement((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const benifts = [
    {
      id: 0,
      title: "Global Recognition",
      description:
        "CAIE qualifications are recognized by top universities and employers worldwide, providing students with opportunities for higher education and careers.",
    },
    {
      id: 1,
      title: "Comprehensive Curriculum",
      description:
        "CAIE qualifications are recognized by top universities and employers worldwide, providing students with opportunities for higher education and careers.",
    },
    {
      id: 2,
      title: "Flexible Learning Pathways",
      description:
        "CAIE qualifications are recognized by top universities and employers worldwide, providing students with opportunities for higher education and careers.",
    },
  ];

  const requirements = [
    {
      id: 0,
      title: "Age",
      description:
        "Typically, there are no specific age requirements, but most students take IGCSE exams at the age of 14-16 and AS/A Level exams at 16-19.",
    },
    {
      id: 1,
      title: "Enrollment",
      description:
        "Typically, there are no specific age requirements, but most students take IGCSE exams at the age of 14-16 and AS/A Level exams at 16-19.",
    },
    {
      id: 2,
      title: "Subjects",
      description:
        "Typically, there are no specific age requirements, but most students take IGCSE exams at the age of 14-16 and AS/A Level exams at 16-19.",
    },
  ];

  return (
    <div className={styles.main}>
      {/* <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        component={"h3"}
        variant="h3"
      >
       
      </Typography> */}{" "}
      <Typography
        // sx={style.popularText}
        className={`${leagueSpartan.className} ${styles.title}`}
        variant={data?.headerTag ? data.headerTag : ("h3" as any)}
        component={data?.headerTag ? data.headerTag : ("h3" as any)}
        dangerouslySetInnerHTML={{
          __html: data?.header,
        }}
      ></Typography>
      <div className={styles.sections}>
        <div className={styles.eachSection}>
          {/* <Typography
            className={`${leagueSpartan.className} ${styles.subHeading}`}
            component={"h3"}
            variant="h3"
          >
            Benefits of CAIE
          </Typography> */}

            <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        variant={data?.subTitleTag ? data.subTitleTag : ("h4" as any)}
        component={data?.subTitleTag ? data.subTitleTag : ("h4" as any)}
        dangerouslySetInnerHTML={{
          __html: data?.subTitle,
        }}
      ></Typography>

          {benifts?.map((box, index: any) => (
            <Grid item xs={12} key={index}>
              {/* <Box sx={style.boxes}> */}
              <div
                className={`${
                  // box.id === index + 1
                  expandedBoxes[index] ? styles.boxes : styles.boxesWhite
                }`}
              >
                <Box>
                  <Typography
                    // sx={styles.titlebox}
                    className={leagueSpartan.className}
                    component={"p"}
                    variant="subtitle2"
                  >
                    {box.title}
                  </Typography>
                  {expandedBoxes[index] && (
                    <Typography
                      // sx={style.desc}
                      className={leagueSpartan.className}
                      component={"p"}
                      variant="caption"
                    >
                      {" "}
                      {box.description}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{ display: { xs: "block", sm: "block" } }}
                  onClick={() => toggleBox(index)}
                >
                  <Image
                    src={minusIcon}
                    alt="icon"
                    style={{ height: "5vh", width: "5vh" }}
                  />
                </Box>
              </div>
              {/* </Box> */}
            </Grid>
          ))}
        </div>
        <div className={styles.eachSection}>
          <Typography
            className={`${leagueSpartan.className} ${styles.subHeading}`}
            component={"h3"}
            variant="h3"
          >
            Requirements of CAIE{" "}
          </Typography>

          {requirements?.map((box, index: any) => (
            <Grid item xs={12} key={index}>
              {/* <Box sx={style.boxes}> */}
              <div
                className={`${
                  expandedRequirement[index] ? styles.boxes : styles.boxesWhite
                }`}
              >
                <Box>
                  <Typography
                    // sx={styles.titlebox}
                    className={leagueSpartan.className}
                    component={"p"}
                    variant="subtitle2"
                  >
                    {box.title}
                  </Typography>
                  {expandedRequirement[index] && (
                    <Typography
                      // sx={style.desc}
                      className={leagueSpartan.className}
                      component={"p"}
                      variant="caption"
                    >
                      {" "}
                      {box.description}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{ display: { xs: "block", sm: "block" } }}
                  onClick={() => toggleRequirement(index)}
                >
                  <Image
                    src={minusIcon}
                    alt="icon"
                    style={{ height: "5vh", width: "5vh" }}
                  />
                </Box>
              </div>
              {/* </Box> */}
            </Grid>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenifitsOfStudyingSection;
