import { useEffect, useState } from "react";
import { getAllRentals } from "../../../core/services/rentsService";
import { RentsList } from "./RentsList";
export function AllRents(props) {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
      console.log(props);
    getAllRentals().then((res) => {
      setRentals(res.data);
    });
  }, []);

  return (
    <div>
        <div>
            <h2>Customer Rentals</h2>
        </div>
        <RentsList rentals={rentals} />
    </div>
  );
}
