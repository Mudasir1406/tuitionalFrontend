import Image from "next/image";
import styles from "./ImageCard.module.css";
import { CardProps } from "../grade-subject-level/tutor-section/TutorSection";
import { Button, CircularProgress, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { useState } from "react";
import Tag from "../tags/Tag";

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
          //   width={200}
          //   height={150}
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      </div>
      <div className={styles.cardTextDiv}>
        {/* <h3 className={styles.name}></h3> */}
        <Typography
          className={`${leagueSpartan.className} ${styles.title}`}
          component={"p"}
          variant="subtitle1"
        >
          {data.name}{" "}
        </Typography>
        <div className={styles.subjects}>
          {/* <div className="flex flex-wrap"> */}
          {data?.subjects?.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
          {/* </div> */}
          {/* {data.subjects.map((subject, i) => (
            <span key={i} className={styles.subject}>
              {subject}
            </span>
          ))} */}
        </div>
        <Typography
          className={`${leagueSpartan.className} ${styles.title}`}
          component={"p"}
          variant="body1"
        >
          {data.university}{" "}
        </Typography>
        {/* <p className={styles.university}>{data.university}</p> */}

        <Typography
          className={`${leagueSpartan.className} ${styles.title}`}
          component={"p"}
          variant="body1"
        >
          {data.description}{" "}
        </Typography>
        <div className={styles.rating}>
          <span>⭐ {data.rating}/5</span>
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
