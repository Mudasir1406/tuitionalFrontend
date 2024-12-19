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
  }>({ 0: true }); 
  const [expandedRequirement, setExpandedRequirement] = useState<{
    [key: number]: boolean;
  }>({ 0: true }); 

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


  return (
    <div className={styles.main}>
     
      <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        variant={data?.headerTag ? data.headerTag : ("h3" as any)}
        component={data?.headerTag ? data.headerTag : ("h3" as any)}
        dangerouslySetInnerHTML={{
          __html: data?.header,
        }}
      ></Typography>
      <div className={styles.sections}>
        <div className={styles.eachSection}>
      
            <Typography
        className={`${leagueSpartan.className} ${styles.title}`}
        variant={data?.subTextLeftTag ? data.subTextLeftTag : ("h4" as any)}
        component={data?.subTextLeftTag ? data.subTextLeftTag : ("h4" as any)}
        dangerouslySetInnerHTML={{
          __html: data?.subTextLeft,
        }}
      ></Typography>

          {data?.listArray.slice(0, 3)?.map((box, index: any) => (
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
                    {box.name}
                  </Typography>
                  {expandedBoxes[index] && (
                    <Typography
                      // sx={style.desc}
                      className={leagueSpartan.className}
                      component={"p"}
                      variant="caption"
                    >
                      {" "}
                      {box.paragraph}
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
        className={`${leagueSpartan.className} ${styles.title}`}
        variant={data?.subTextRightTag ? data.subTextRightTag : ("h4" as any)}
        component={data?.subTextRightTag ? data.subTextRightTag : ("h4" as any)}
        dangerouslySetInnerHTML={{
          __html: data?.subTextRight,
        }}
      ></Typography>

{data?.listArray.slice(3, 6)?.map((box, index: any) => (
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
                    {box.name}
                  </Typography>
                  {expandedRequirement[index] && (
                    <Typography
                      // sx={style.desc}
                      className={leagueSpartan.className}
                      component={"p"}
                      variant="caption"
                    >
                      {" "}
                      {box.paragraph}
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
