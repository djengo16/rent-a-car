import { useEffect, useState } from "react";
import { getVehicles } from "../../../core/services/vehiclesService";
import VehicleCard from "../vehicle-card/VehicleCard";
import styles from "./vehicles.module.css";
import { Spinner } from "react-bootstrap";

export default function VehiclesList({ searchParams, sort }) {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getVehicles().then((res) => {
      setVehicles(res.data);
      setFilteredVehicles(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchParams.trim() !== "") {
      setFilteredVehicles(
        vehicles.filter((x) => {
          return `${x.brand} ${x.model}`
            .toLowerCase()
            .includes(searchParams.toLowerCase());
        })
      );
    } else {
      setFilteredVehicles(vehicles);
    }
  }, [searchParams, vehicles]);

  return (
    <div className={styles["vehicles-wrapper"]}>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      ) : (
        filteredVehicles
          .sort((a, b) => {
            if (sort === "lowerYear") {
              return  a.constructionYear - b.constructionYear;
            }
            if (sort === "biggerYear") {
              return b.constructionYear - a.constructionYear;
            }
            if (sort === "lowerPrice") {
              return b.price - a.price;
            }
            if (sort === "biggerPrice") {
              return a.price - b.price;
            }
          })
          .map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)
      )}
    </div>
  );
}
