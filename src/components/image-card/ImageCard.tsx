import Image from "next/image";
import styles from "./ImageCard.module.css";
import { CardProps } from "../grade-subject-level/tutor-section/TutorSection";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";
import { useState } from "react";
import Tag from "../tag/Tag";
import dummyImg from "../../../public/assets/images/static/blogimg3.png";
import PopUpButton from "../pop-up-button";
import dynamic from "next/dynamic";
const TutorModal = dynamic(() => import("../home/tutor-modal"), { ssr: false });
interface props {
  data: CardProps;
}

const ImageCard = ({ data }: props) => {
  const [tutorModal, setTutorModal] = useState<boolean>(false);

  const handleCloseTutorModal = () => {
    setTutorModal(false);
  };
  const handleOpenTutorModal = () => {
    setTutorModal(true);
  };

  const toggleShowMore = () => {
    handleOpenTutorModal();
  };

  const maxLength = 90;

  return (
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
          className={`${leagueSpartan.className} ${styles.heading}`}
          component={"p"}
          variant="subtitle1"
          onClick={toggleShowMore}
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

        <Typography
          className={`${leagueSpartan.className} ${styles.title}`}
          component={"p"}
          variant="body2"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: data?.Description?.substring(0, maxLength),
            }}
          />
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
        <PopUpButton text="Book A Demo" href="popup" sx={style.contactButton} />

        {tutorModal && (
          <TutorModal
            handleClose={handleCloseTutorModal}
            open={tutorModal}
            data={data}
          />
        )}
      </div>
    </div>
    //   ))}
    // </div>
  );
};

export default ImageCard;

const style = {
  contactButton: {
    display: "flex",
    alignSelf: "center",
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    backgroundColor: "#38b6ff",
    textTransform: "none",
    lineHeight: "18.4px",
    textAlign: "center",
    borderRadius: "10px",
    width: "100%",
    padding: "18px",
    margin: "20px 0",
    transition: "all 0.5s ease-in-out",
    color: "white",
    ":hover": {
      backgroundColor: "#38b6ff",
      transform: "scale(1.02)",
      boxShadow: "1px 4px 24px 0px #38b6ffb2",
    },
  },
};
