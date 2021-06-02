import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./rentsNav.module.css";

export function RentsNav(props) {
    useEffect(()=>{
        console.log(props)
    },[])
  return (
    <div id={styles["rents"]}>
      <h2 className={styles["heading"]}>Rentals</h2>
      {Object.entries(props.rentals).map((x) => (
        <Link to={x[1]}>
          <button className={styles["nav-btn"]}>{x[0]}</button>
        </Link>
      ))}
    </div>
  );
}
