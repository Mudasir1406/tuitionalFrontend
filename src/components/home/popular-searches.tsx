import { Box, Typography } from "@mui/material";
import React from "react";
import diamond from "../../../public/assets/images/static/diamond 1.png";
import {
  Searches_Type,
  getSearches,
} from "../../services/faqs/searches/searches";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

const PopularSearches: React.FC = async () => {
  const searches: Searches_Type[] = await getSearches();
  return (
    <Box>
      <Typography sx={styles.heading} className={leagueSpartan.className}>
        Popular Searches
      </Typography>
      <Box sx={styles.tabsContanier}>
        {searches?.map((item, index) => (
          <Tabs {...item} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default PopularSearches;

const styles = {
  heading: {
    fontSize: {
      xs: "20px",
      lg: "18px",
    },
    fontWeight: 700,
    lineHeight: "34px",
    marginTop: "5vh",
    marginBottom: {
      xs: "10px",
      sm: "10px",
      md: "0px",
      lg: "0px",
    },
    marginRight: {
      xs: "10px",
      sm: "10px",
      md: "0px",
      lg: "0px",
    },
    color: "#000000",
  },
  search: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "14px",
    marginRight: "20px",
    marginLeft: "7px",
  },
  type: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "13px",
  },
  premium: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "14px",
    marginRight: "20px",
    marginLeft: "7px",
  },
  tabsContanier: {
    display: "flex",
    flexDirection: "row",
    padding: "5px",
    flexWrap: "wrap",
    gap: "10px",
  },
};

type Props = {
  isPremium: boolean;
  type: string;
  keyword: string;
};

const Tabs: React.FC<Props> = ({ isPremium, type, keyword }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: isPremium ? "#51B893" : "#ECF9F3",
        padding: "5px",
        borderRadius: "5px",
        alignItems: "center",
        marginRight: "15px",
      }}
    >
      {isPremium && (
        <Image
          src={diamond.src}
          width={diamond.width}
          height={diamond.height}
          alt="diamond"
        ></Image>
      )}
      {isPremium ? (
        <Typography
          sx={[styles.premium, { color: "white" }]}
          className={leagueSpartan.className}
        >
          Premium
        </Typography>
      ) : (
        <Typography sx={styles.search} className={leagueSpartan.className}>
          {" "}
          {keyword}
        </Typography>
      )}

      <Box
        sx={{
          backgroundColor: isPremium ? "#ECF9F3" : "white",
          borderRadius: "5px",
          paddingX: "26px",
          paddingY: "6px",
        }}
      >
        <Typography sx={styles.type} className={leagueSpartan.className}>
          {type}
        </Typography>
      </Box>
    </Box>
  );
};
