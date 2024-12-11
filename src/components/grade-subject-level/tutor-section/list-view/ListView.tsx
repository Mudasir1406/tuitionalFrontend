import React from "react";
import styles from "./ListView.module.css";
import TeacherCard from "@/components/teacher-card/TeacherCard";

interface props {
  data: {
    name: string;
    hoursProvided: number;
    description: string;
    title: string;
    imageSrc: string;
  }[];
}

function ListView({ data }: props) {
  return (
    <div className={styles.main}>
      <div className={styles.mainList}>
        {data?.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
      <div className={styles.info}></div>
    </div>
  );
}

export default ListView;
