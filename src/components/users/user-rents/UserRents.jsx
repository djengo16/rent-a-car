import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCustomerRentals,
  QueryRentalStatus,
} from "../../../core/services/rentsService";
import { RentsList } from "../../rentals/rents-list/RentsList";
import styles from "./userRents.module.css";
export function UserRents({ computedMatch }) {
  const [userRents, setUserRents] = useState([]);
  const [userRentsFiltered, setUserRentsFiltered] = useState([]);
  const userId = computedMatch.params.id;

  useEffect(() => {
    getCustomerRentals(userId).then((res) => {
      setUserRents(res.data);
      setUserRentsFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    if (computedMatch.params.filter === "all" ) {
      setUserRentsFiltered(userRents);
    } else {
      setUserRentsFiltered(
        userRents.filter(
          (x) => x.status == QueryRentalStatus[computedMatch.params.filter]
        )
      );
    }
  }, [computedMatch]);

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
        {userRents.length === 0 && (
          <h3 className={styles["heading"]}>User don't have any rents</h3>
        )}
        <RentsList rentals={userRentsFiltered}></RentsList>
      </div>
    </div>
  );
}
