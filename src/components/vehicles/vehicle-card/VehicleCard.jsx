import styles from "./vehicle.module.css";
import { Card } from "react-bootstrap";
import { useEffect } from "react";
import { GiCarDoor } from "react-icons/gi";
import { RiPriceTag2Fill } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";

export default function VehicleCard(props) {
  const { img, brand, model, availableCount, seats, pricePerDay, type } =
    props.vehicle;
  // {
  //   "id": "x6sdD23ds0",
  //   "img": "https://cdn3.focus.bg/autodata/i/volkswagen/golf/golf-iv-1j1/medium/47ec5a94b6f026aa1159439c5f9f7620.jpg",
  //   "type": "economy",
  //   "brand": "Volkswagen",
  //   "model": "golf",
  //   "year": 2001,
  //   "fuelType": "diesel",
  //   "seats": 4,
  //   "pricePerDay": "50$",
  //   "availableCount": 3
  // }

  return (
    <Card className={styles["card"]}>
      <Card.Img className={styles["card-img"]} variant="top" src={img} />
      <Card.Body>
        <Card.Title>
          {brand} {model}
        </Card.Title>
        <Card.Text>
          <GiCarDoor />
          {seats} <small>seats</small>
          <br />
          <RiPriceTag2Fill />
          {pricePerDay} <small>per day</small>
          <br />
          <FaCarSide /> 
          {type}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {availableCount !== 0
            ? `Available: ${availableCount}`
            : "No cars available"}
        </small>
      </Card.Footer>
    </Card>
  );
}
