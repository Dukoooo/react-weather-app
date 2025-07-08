import { useEffect } from "react";
import SearchField from "./SearchField";
import styles from "./Weather.module.css";

const KEY = `fabb6fd57e314d54820222616230211`;

function Weather() {
  return (
    <div className={styles.container}>
      <SearchField />
      <div className={styles.cityInfo}>
        <span className={styles.weatherIcon}>Slniecko</span>
        <h2 className={styles.cityTemperature}>22c</h2>
        <h3 className={styles.cityName}>London</h3>
        <div className={styles.otherInfo}>
          <span className={styles.humidity}>54%</span>
          <span className={styles.wind}>12km/h</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;
