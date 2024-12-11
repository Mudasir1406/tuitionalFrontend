import Image from "next/image";
import styles from "./ImageCard.module.css";
import { CardProps } from "../grade-subject-level/tutor-section/TutorSection";
import { Button, CircularProgress, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";
import { useState } from "react";
import Tag from "../tag/Tag";

interface props {
  data: CardProps;
}

const ImageCard = ({ data }: props) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    // <div className={styles.cardContainer}>
    //   {cardsData.map((card, index) => (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={data.imageSrc}
          alt={`${data.name}'s profile`}
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      </div>
      <div className={styles.cardTextDiv}>
        <Typography
          className={`${leagueSpartan.className} `}
          component={"p"}
          variant="subtitle1"
        >
          {data.name}{" "}
        </Typography>
        <div className={styles.subjects}>
          {data?.subjects?.map((tag, index) => (
            <Tag key={index} label={tag} index={index} />
          ))}
        </div>
        <Typography
          className={`${leagueSpartan.className} ${styles.title}`}
          component={"p"}
          variant="body1"
        >
          {data.university}{" "}
        </Typography>

        <Typography
          className={`${leagueSpartan.className} ${styles.title}`}
          component={"p"}
          variant="body1"
        >
          {data.description}{" "}
        </Typography>
        <div className={styles.rating}>
          <Image src={greenstars} alt="img" className={styles.stars} />
          <Typography
            className={`${leagueSpartan.className} `}
            component={"p"}
            variant="subtitle2"
          >
            {data.rating}/5
          </Typography>
        </div>
        <Button
          variant="contained"
          className={`${leagueSpartan.className} ${styles.containedButton}`}
          type="submit"
        >
          {loading ? (
            <CircularProgress
              sx={{ width: "12px", height: "12px", color: "white" }}
              size={20}
            />
          ) : (
            "Book A Trial Today"
          )}
        </Button>
      </div>
    </div>
    //   ))}
    // </div>
  );
};

export default ImageCard;
