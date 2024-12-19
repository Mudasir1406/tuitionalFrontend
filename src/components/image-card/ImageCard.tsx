import Image from "next/image";
import styles from "./ImageCard.module.css";
import { CardProps } from "../grade-subject-level/tutor-section/TutorSection";
import { Button, CircularProgress, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";
import { useState } from "react";
import Tag from "../tag/Tag";
import dummyImg from "../../../public/assets/images/static/blogimg3.png";

interface props {
  data: CardProps;
}

const ImageCard = ({ data }: props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showFull, setShowFull] = useState(false);

  const toggleShowMore = () => {
    setShowFull((prev) => !prev);
  };

  const maxLength = 100;

  return (
    // <div className={styles.cardContainer}>
    //   {cardsData.map((card, index) => (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={data?.profileImageUrl ? data?.profileImageUrl : dummyImg}
          alt={`${data?.["First Name"]}'s profile`}
          layout="fill"
          objectFit="contain"
          className={styles.image}
        />
      </div>
      <div className={styles.cardTextDiv}>
        <Typography
          className={`${leagueSpartan.className} `}
          component={"p"}
          variant="subtitle1"
        >
          {`${data?.["First Name"]} ${data?.["Last Name"]} `}{" "}
        </Typography>
        <div className={styles.subjects}>
          {data?.Subjects?.map((tag, index) => (
            <Tag key={index} label={tag} index={index} />
          ))}
        </div>
        <div className={styles.subjects}>
          {data?.Curiculum?.map((tag, index) => (
            <Tag key={index} label={tag} index={index} />
          ))}
        </div>
        <Typography
          className={`${leagueSpartan.className} ${styles.title}`}
          component={"p"}
          variant="body2"
        >
          {data.university}{" "}
        </Typography>

        {/* <Typography
          className={`${leagueSpartan.className} ${styles.title}`}
          component={"p"}
          variant="body2"
        >
          {data.Description}{" "}
        </Typography> */}

        <Typography
          className={`${leagueSpartan.className} ${styles.title}`}
          component={"p"}
          variant="body2"
        >
          {showFull || data?.Description.length <= maxLength
            ? data?.Description
            : `${data?.Description.substring(0, maxLength)} `}
          {data?.Description.length > maxLength && (
            <span
              className={styles.showMore}
              onClick={toggleShowMore}
              style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
            >
              {showFull ? "Show Less" : "..."}
            </span>
          )}
        </Typography>
        <div className={styles.rating}>
          <Image src={greenstars} alt="img" className={styles.stars} />
          <Typography
            className={`${leagueSpartan.className} `}
            component={"p"}
            variant="subtitle2"
          >
            {data?.["Success rate"]}
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
