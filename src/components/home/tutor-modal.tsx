// import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import { Box, Divider, Typography } from "@mui/material";
// import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
// import { leagueSpartan } from "@/app/fonts";
// import "../DropDown/DropDown.css";
// import PopUpButton from "../pop-up-button";
// import Image from "next/image";
// import Tag from "../tag/Tag";
// import dummyImg from "../../../public/assets/images/static/blogimg3.png";
// import greenstars from "../../../public/assets/images/svg/greenstars.svg";

// type IProps = {
//   open: boolean;
//   handleClose: () => void;
//   data: tutorData;
// };

// export type tutorData = {
//   "First Name": string;
//   "Last Name"?: string;
//   university: string;
//   Subjects: string[];
//   Curiculum: string[];
//   Description: string;
//   "Success rate": number;
//   profileImageUrl: string;
// };

// const TutorModal: React.FunctionComponent<IProps> = ({
//   open,
//   handleClose,
//   data,
// }) => {
//   const [loading, setLoading] = React.useState<boolean>(false);

//   return (
//     <Dialog
//       open={open}
//       keepMounted
//       onClose={handleClose}
//       className="pricing-dialog"
//       maxWidth={false}
//       sx={{
//         "& .MuiPaper-root": {
//           backgroundColor: "transparent",
//           boxShadow: "none",
//         },
//         "& .MuiPaper-elevation": {
//           backgroundColor: "transparent",
//           boxShadow: "none",
//         },
//         "& .MuiPaper-rounded": {
//           backgroundColor: "transparent",
//           boxShadow: "none",
//         },
//       }}
//     >
//       <DialogContent sx={styles.contanier}>
//         <Box sx={styles.header}>
//           <Typography
//             className={leagueSpartan.className}
//             sx={styles.dialogHeading}
//           >
//             {`${data?.["First Name"]} ${data?.["Last Name"]} `}
//           </Typography>
//           <ClearRoundedIcon
//             sx={{ width: "30px", height: "30px", cursor: "pointer" }}
//             onClick={handleClose}
//           />
//         </Box>
//         <Divider />
//         <Box sx={styles.mainDiv}>
//           {/* <div className={styles.card}> */}
//           <Box className={styles.imageWrapper}>
//             <Image
//               src={data?.profileImageUrl ? data?.profileImageUrl : dummyImg}
//               alt={`${data?.["First Name"]}'s profile`}
//               layout="fill"
//               objectFit="contain"
//               className={styles.image}
//             />
//           </Box>
//           <Box className={styles.cardTextDiv}>
//             <Typography
//               className={`${leagueSpartan.className} `}
//               component={"p"}
//               variant="subtitle1"
//             >
//               {`${data?.["First Name"]} ${data?.["Last Name"]} `}{" "}
//             </Typography>
//             <Box className={styles.subjects}>
//               {data?.Subjects?.map((tag, index) => (
//                 <Tag key={index} label={tag} index={index} />
//               ))}
//             </Box>
//             <Box className={styles.subjects}>
//               {data?.Curiculum?.map((tag, index) => (
//                 <Tag key={index} label={tag} index={index} />
//               ))}
//             </Box>
//             <Typography
//               className={`${leagueSpartan.className} ${styles.title}`}
//               component={"p"}
//               variant="body2"
//             >
//               {data.university}{" "}
//             </Typography>

//             <Typography
//               className={`${leagueSpartan.className} ${styles.title}`}
//               component={"p"}
//               variant="body2"
//             >
//               {data.Description}{" "}
//             </Typography>

//             {/* <Typography
//                 className={`${leagueSpartan.className} ${styles.title}`}
//                 component={"p"}
//                 variant="body2"
//               >
//                 {showFull || data?.Description?.length <= maxLength
//                   ? data?.Description
//                   : `${data?.Description?.substring(0, maxLength)} `}
//                 {data?.Description?.length > maxLength && (
//                   <span
//                     className={styles.showMore}
//                     onClick={toggleShowMore}
//                     style={{
//                       color: "#38b6ff",
//                       cursor: "pointer",
//                       marginLeft: "5px",
//                     }}
//                   >
//                     {showFull ? "Show Less" : "..."}
//                   </span>
//                 )}
//               </Typography> */}
//             <Box className={styles.rating}>
//               <Image src={greenstars} alt="img" className={styles.stars} />
//               <Typography
//                 className={`${leagueSpartan.className} `}
//                 component={"p"}
//                 variant="subtitle2"
//               >
//                 {data?.["Success rate"]}
//               </Typography>
//             </Box>

//             <PopUpButton
//               text="Book A Trial Today"
//               href="popup"
//               sx={styles.contactButton}
//             />
//           </Box>
//           {/* </div> */}
//         </Box>
//         {/* </Grid> */}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default TutorModal;

// const styles = {
//   contanier: {
//     boxShadow:
//       "0px -3px 8px 0px rgba(0, 0, 0, 0.15) inset,0px 2px 1px 0px rgba(0, 0, 0, 0.05)",
//     backgroundColor: "white",
//     width: {
//       xs: "90vw",
//       md: "50vw",
//     },
//     // height: "60vh",
//     borderRadius: "30px",
//     p: 0,
//     overflow: "auto",
//   },
//   mainDiv: {
//     paddingX: "2%",
//     paddingY: "2%",
//   },

//   header: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginX: "3vh",
//     marginTop: "3vh",
//     marginBottom: "2vh",
//   },
//   dialogHeading: {
//     fontSize: "3vh",
//     lineHeight: "2.2vh",
//     fontWeight: 500,
//     color: "rgba(0, 0, 0, 1)",
//     letterSpacing: "-2%",
//   },

//   containedButton: {
//     display: "flex",
//     boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
//     backgroundColor: "#38B6FF",
//     color: "white",
//     textTransform: "none",
//     fontSize: {
//       xs: "1.5vh",
//       sm: "1.5vh",
//       md: "1.5vh",
//       lg: "2vh",
//     },
//     fontWeight: 700,
//     lineHeight: "18.4px",
//     textAlign: "center",
//     borderRadius: "10px",
//     paddingX: "1.8vw",
//     paddingY: "1.5vh",
//     marginY: "2vh",
//     ":hover": {
//       backgroundColor: "#38B6FF",
//     },
//     width: "96%",
//     marginX: "2%",
//   },
//   outlinedBtn: {
//     color: "rgba(56, 182, 255, 1)",
//     borderColor: "rgba(56, 182, 255, 1)",
//     fontSize: "1.5vh",
//     fontWeight: 700,
//     lineHeight: "1.84vh",
//     textTransform: "none",
//     paddingX: "1.8vw !important",
//     paddingY: "1.5vh !important",
//     height: "5vh",
//     textAlign: "center",
//     ":hover": {
//       color: "rgba(56, 182, 255, 1)",
//       borderColor: "rgba(56, 182, 255, 1)",
//     },
//   },

//   rating: {
//     display: "flex",
//     alignItems: "center",
//     textAlign: "center",
//     columnGap: "12px",
//     marginTop: "12px",
//   },
//   stars: {
//     height: "3vh",
//     width: "14vh",
//   },

//   imageWrapper: {
//     position: "relative",
//     width: "100%",
//     height: "250px",
//     overflow: "hidden",
//     borderRadius: "12px",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     objectFit: "contain",
//   },

//   name: {
//     fontSize: "1.2rem",
//     fontWeight: "bold",
//     margin: 0,
//   },
//   university: {
//     color: "#777777",
//     fontSize: "0.9rem",
//     margin: "8px 0",
//   },

//   subjects: {
//     display: "flex",
//     justifyContent: "left",
//     flexWrap: "wrap",
//     rowGap: "4px",
//     marginBottom: "8px",
//     columnGap: "4px",
//   },
//   subject: {
//     backgroundColor: "#d1f0f0",
//     color: "#0073e6",
//     borderRadius: "4px",
//     fontSize: "0.8rem",
//     padding: "4px 8px",
//     fontWeight: "bold",
//   },
//   description: {
//     fontSize: "0.9rem",
//     color: "#555555",
//     margin: "8px 0",
//   },
// };
