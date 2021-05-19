import { useEffect, useState } from "react";
import { getVehicles } from "../../../core/services/vehiclesService";
import VehicleCard from "../vehicle-card/VehicleCard";
import styles from './vehicles.module.css'
import { Spinner } from 'react-bootstrap'

export default function VehiclesList() {
  const [vehicles, setVehicles] = useState([]);
  
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getVehicles().then((res) => {
      setVehicles(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles["vehicles-wrapper"]}>
      {isLoading ? (
        <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
      ): (
        (vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      )))
      )}
    </div>
  );
}
