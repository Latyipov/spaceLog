"use client";

import styles from "./Loading.module.css";

export function Loading() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.rocketWrapper}>
          <div className={styles.flame}></div>
          <div className={styles.rocket}>
            <div className={styles.nose}></div>
            <div className={`${styles.window} ${styles.window1}`}></div>
            <div className={`${styles.window} ${styles.window2}`}></div>
          </div>
        </div>
        <h4 className="text-2xl font-bold text-white">Loading...</h4>
      </div>
    </main>
  );
}
