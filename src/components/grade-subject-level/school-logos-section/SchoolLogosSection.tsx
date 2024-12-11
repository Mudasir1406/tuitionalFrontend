import React from "react";
import styles from "./SchoolLogosSection.module.css";
import logo1 from "../../../../public/assets/images/static/logo.png";
import logo2 from "../../../../public/assets/images/static/playbutton.png";
import logo3 from "../../../../public/assets/images/static/LinkedIN_black.png";
import Image from "next/image";

const logos = [logo1, logo2, logo3, logo1, logo2, logo3, logo1, logo2, logo3];

function SchoolLogosSection() {
  return (
    <div className={styles.main}>
      <div className={styles.logosDiv}>
        {logos?.map((logo, i) => (
          <Image
            src={logo}
            alt="logo"
            width={120} // Set width
            height={120}
            objectFit="contain"
          />
        ))}
      </div>
    </div>
  );
}

export default SchoolLogosSection;
