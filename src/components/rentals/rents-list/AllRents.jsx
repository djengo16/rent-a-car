import { useEffect, useState } from "react";
import { getAllRentals, QueryRentalStatus } from "../../../core/services/rentsService";
import { RentsList } from "./RentsList";
import { RentsNav } from '../rents-nav/RentsNav'

export function AllRents({computedMatch}) {
  const [rentals, setRentals] = useState([]);
  const [rentalsFiltered, setRentalsFiltered] = useState([]);

  const rentsQuery = {
    "All": '/rentals/all',
    "Waiting": '/rentals/waiting',
    "In Proccess": '/rentals/in-proccess',
    "Old": '/rentals/old'
  }

  useEffect(() => {
      
    getAllRentals().then((res) => {
      setRentals(res.data);      
    });
  }, []);

  useEffect(() => {
    if (computedMatch.params.filter === "all" || !computedMatch.params.filter) {
      setRentalsFiltered(rentals);
    } else {
      setRentalsFiltered(
        rentals.filter(
          (x) => x.status === QueryRentalStatus[computedMatch.params.filter]
        )
      );
         

    }
  }, [computedMatch, rentals]);

  return (
    <div className="container">
        <RentsNav rentals={rentsQuery} />
        <RentsList rentalsFiltered={rentalsFiltered} setRentals={setRentals}/>
    </div>
  );
}
