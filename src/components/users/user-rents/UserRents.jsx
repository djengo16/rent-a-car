import { Link } from "react-router-dom";
import styles from "./userRents.module.css";
export function UserRents({computedMatch, userId}) {
  return (
    <div className="container">
      <div id={styles["rents"]}>
        <h2 className={styles["heading"]}>Rents</h2>
        <Link to={`/user/${userId}/rents/all`}>
          <button className={styles["nav-btn"]}>All</button>
        </Link>
        <Link to={`/user/${userId}/rents/waiting`}>
          <button className={styles["nav-btn"]}>Waiting</button>
        </Link>
        <Link to={`/user/${userId}/rents/in-proccess`}>
          <button className={styles["nav-btn"]}>In proccess</button>
        </Link>
        <Link to={`/user/${userId}/rents/old`}>
          <button className={styles["nav-btn"]}>Old</button>
        </Link>
      </div>
      <div className="rents">
        <h3 className={styles["heading"]}>User don't have any rents</h3>
      </div>
    </div>
  );
}