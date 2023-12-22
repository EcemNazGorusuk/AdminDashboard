// rightbar.jsx

import React from "react";
import styles from "./rightbar.module.css";
import Image from "next/image";
import swImg from "../../../../../public/sw.png";
import { MdPlayCircleFilled } from "react-icons/md";

export default function Rightbar() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.texts}>
          <span className={styles.notification}>Available Now!</span>
          <h3 className={styles.title}>
            Learn how to use the admin dashboard.
          </h3>
          <span className={styles.subTitle}>Takes 1 minute to learn</span>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Sed auctor justo vel ligula tristique, eu consectetur urna
            sollicitudin.
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled size={30} />
            Watch Now
          </button>
        </div>

    
      </div>
    </div>
  );
}
