import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { Typography } from "@mui/material";
import { leagueSpartan } from "../fonts";
import Image from "next/image";
import notFoundImg from "../../../public/assets/images/static/Group 1577707754.png";
import logo from "../../../public/assets/images/static/logo.png";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.top}>
          <Image src={notFoundImg} alt="ops" className={styles.image} />
          <Typography
            className={`${styles.title} ${leagueSpartan.className}`}
            variant="h1"
            component={"h1"}
          >
            Ops!
          </Typography>
        </div>
        <Typography
          className={`${styles.description} ${leagueSpartan.className}`}
          variant="h4"
          component={"p"}
        >
          {`The Page That You're Looking For Has Disappeared!`}
        </Typography>
        <Typography
          className={`${styles.info} ${leagueSpartan.className}`}
          variant="h4"
          component={"p"}
        >
          {`We're Looking For It Too!`}
        </Typography>
        <Typography
          className={`${styles.info} ${leagueSpartan.className}`}
          variant="h4"
          component={"p"}
        >
          {`Till Then.... Head Back To The`}
          <Typography
            className={`${styles.info} ${leagueSpartan.className}`}
            variant="h4"
            component={"span"}
          >
            <a href="/" className={`${styles.link} ${leagueSpartan.className}`}>
              {" "}
              Homepage{" "}
            </a>{" "}
            To Restart Your Journey.
          </Typography>
        </Typography>
      </div>
      <div className={styles.logoDiv}>
        <a href="/">
          <Image src={logo} alt="logo" className={styles.logo} />
        </a>
      </div>
    </div>
  );
}
