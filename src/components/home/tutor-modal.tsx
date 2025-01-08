import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box, Divider, Typography } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { leagueSpartan } from "@/app/fonts";
import "../DropDown/DropDown.css";
import PopUpButton from "../pop-up-button";
import Image from "next/image";
import Tag from "../tag/Tag";
import dummyImg from "../../../public/assets/images/static/blogimg3.png";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";

type IProps = {
  open: boolean;
  handleClose: () => void;
  data: tutorData;
};

export type tutorData = {
  "First Name": string;
  "Last Name"?: string;
  university: string;
  Subjects: string[];
  Curiculum: string[];
  Description: string;
  "Success rate": number;
  profileImageUrl: string;
};

const TutorModal: React.FunctionComponent<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      className="pricing-dialog"
      maxWidth={false}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
        "& .MuiPaper-elevation": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
        "& .MuiPaper-rounded": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DialogContent sx={styles.contanier}>
        <Box sx={styles.header}>
          <Typography
            className={leagueSpartan.className}
            sx={styles.dialogHeading}
          >
            {`${data?.["First Name"]} ${data?.["Last Name"]} `}
          </Typography>
          <ClearRoundedIcon
            sx={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>
        <Divider />
        <Box sx={styles.mainDiv}>
          {/* <div className={styles.card}> */}
          <Box sx={styles.imageWrapper}>
            <Image
              src={data?.profileImageUrl ? data?.profileImageUrl : dummyImg}
              alt={`${data?.["First Name"]}'s profile`}
              layout="fill"
              objectFit="contain"
              // style={styles.image}
            />
          </Box>
          <Box sx={styles.cardTextDiv}>
            <Typography
              className={`${leagueSpartan.className} `}
              component={"p"}
              variant="subtitle1"
            >
              {`${data?.["First Name"]} ${data?.["Last Name"]} `}{" "}
            </Typography>
            <Box sx={styles.subjects}>
              {data?.Subjects?.map((tag, index) => (
                <Tag key={index} label={tag} index={index} />
              ))}
            </Box>
            <Box sx={styles.subjects}>
              {data?.Curiculum?.map((tag, index) => (
                <Tag key={index} label={tag} index={index} />
              ))}
            </Box>
            <Typography
              className={`${leagueSpartan.className} `}
              component={"p"}
              variant="body2"
            >
              {data.university}{" "}
            </Typography>

            {/* <Typography
              className={`${leagueSpartan.className} `}
              component={"p"}
              variant="body2"
            >
              {data.Description}{" "}
            </Typography> */}
            <Typography
              // sx={style.guidence}
              variant={"body2"}
              className={leagueSpartan.className}
              // component={data.headerTag as keyof JSX.IntrinsicElements}
              dangerouslySetInnerHTML={{
                __html: data?.Description,
              }}
            ></Typography>

            {/* <Typography
                className={`${leagueSpartan.className} ${styles.title}`}
                component={"p"}
                variant="body2"
              >
                {showFull || data?.Description?.length <= maxLength
                  ? data?.Description
                  : `${data?.Description?.substring(0, maxLength)} `}
                {data?.Description?.length > maxLength && (
                  <span
                    className={styles.showMore}
                    onClick={toggleShowMore}
                    style={{
                      color: "#38b6ff",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  >
                    {showFull ? "Show Less" : "..."}
                  </span>
                )}
              </Typography> */}
            <Box sx={styles.rating}>
              <Image src={greenstars} alt="img" style={styles.stars} />
              <Typography
                className={`${leagueSpartan.className} `}
                component={"p"}
                variant="subtitle2"
              >
                {data?.["Success rate"]}
              </Typography>
            </Box>

            <PopUpButton
              text="Book A Demo"
              href="popup"
              sx={styles.contactButton}
            />
          </Box>
          {/* </div> */}
        </Box>
        {/* </Grid> */}
      </DialogContent>
    </Dialog>
  );
};

export default TutorModal;

const styles = {
  contanier: {
    boxShadow:
      "0px -3px 8px 0px rgba(0, 0, 0, 0.15) inset,0px 2px 1px 0px rgba(0, 0, 0, 0.05)",
    backgroundColor: "white",
    width: {
      xs: "83vw",
      md: "50vw",
    },
    // height: "60vh",
    borderRadius: "30px",
    p: 0,
    overflow: "auto",
  },
  mainDiv: {
    maxHeight: "70vh",
    overflowY: "auto",
    paddingX: "2%",
    paddingY: "2%",
  },
  cardTextDiv: {
    padding: "16px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginX: "3vh",
    marginTop: "3vh",
    marginBottom: "2vh",
  },
  dialogHeading: {
    fontSize: "3vh",
    lineHeight: "2.2vh",
    fontWeight: 500,
    color: "rgba(0, 0, 0, 1)",
    letterSpacing: "-2%",
  },
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

  rating: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    columnGap: "12px",
    marginTop: "12px",
  },
  stars: {
    height: "3vh",
    width: "14vh",
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "250px",
    overflow: "hidden",
    borderRadius: "12px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  name: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: 0,
  },
  university: {
    color: "#777777",
    fontSize: "0.9rem",
    margin: "8px 0",
  },

  subjects: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    rowGap: "4px",
    marginBottom: "8px",
    columnGap: "4px",
  },
  subject: {
    backgroundColor: "#d1f0f0",
    color: "#0073e6",
    borderRadius: "4px",
    fontSize: "0.8rem",
    padding: "4px 8px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "0.9rem",
    color: "#555555",
    margin: "8px 0",
  },
};
