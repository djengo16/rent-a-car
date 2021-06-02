import { useEffect, useState } from "react";
import {
  getCustomerRentals,
  QueryRentalStatus,
} from "../../../core/services/rentsService";
import { RentsList } from "../../rentals/rents-list/RentsList";
import { RentsNav } from "../../rentals/rents-nav/RentsNav";
import styles from "./userRents.module.css";

export function UserRentals({ computedMatch }) {
  const [userRents, setUserRents] = useState([]);
  const [userRentsFiltered, setUserRentsFiltered] = useState([]);
  const userId = computedMatch.params.id;
  const rentsQuery = {
    All: `/user/${userId}/rentals/all`,
    Waiting: `/user/${userId}/rentals/waiting`,
    "In Proccess": `/user/${userId}/rentals/in-proccess`,
    Old: `/user/${userId}/rentals/old`,
  };

  useEffect(() => {
    getCustomerRentals(userId).then((res) => {
      setUserRents(res.data);
      setUserRentsFiltered(res.data);
    });
  }, [userId]);

  useEffect(() => {
    if (computedMatch.params.filter === "all") {
      setUserRentsFiltered(userRents);
    } else {
      setUserRentsFiltered(
        userRents.filter(
          (x) => x.status === QueryRentalStatus[computedMatch.params.filter]
        )
      );
    }
  }, [computedMatch, userRents]);

  return (
    <div className="container">
      <RentsNav  rentals={rentsQuery} />
      <div className="rents">
        {userRents.length === 0 && (
          <h3 className={styles["heading"]}>User don't have any rents</h3>
        )}
        <RentsList rentals={userRentsFiltered}></RentsList>
      </div>
    </div>
  );
}
