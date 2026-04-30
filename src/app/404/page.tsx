"use client";

import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import { leagueSpartan } from "../fonts";
import notFoundImg from "../../../public/assets/images/static/Group 1577707754.png";
import logo from "../../../public/assets/images/static/logo.png";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.top}>
          <Image src={notFoundImg} alt="ops" className={styles.image} />
          <h1 className={`${styles.title} ${leagueSpartan.className}`}>Ops!</h1>
        </div>
        <p className={`${styles.description} ${leagueSpartan.className}`}>
          {`The Page That You're Looking For Has Disappeared!`}
        </p>
        <p className={`${styles.info} ${leagueSpartan.className}`}>
          {`We're Looking For It Too!`}
        </p>
        <p className={`${styles.info} ${leagueSpartan.className}`}>
          {`Till Then.... Head Back To The`}
          <span className={`${styles.info} ${leagueSpartan.className}`}>
            <a href="/" className={`${styles.link} ${leagueSpartan.className}`}>
              {" "}
              Homepage{" "}
            </a>{" "}
            To Restart Your Journey.
          </span>
        </p>
      </div>
      <div className={styles.logoDiv}>
        <a href="/">
          <Image src={logo} alt="logo" className={styles.logo} />
        </a>
      </div>
    </div>
  );
}
