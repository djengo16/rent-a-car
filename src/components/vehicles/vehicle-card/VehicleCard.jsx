import styles from "./vehicle.module.css";
import { Card } from "react-bootstrap";
import { GiCarSeat } from "react-icons/gi";
import { RiPriceTag2Fill } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function VehicleCard(props) {
  const { id, image, brand, model, availableCount, seats, price, type } =
    props.vehicle;

  return (
    <Card className={styles["card"]}>
      <Link to={`/ad/details/${id}`}>
      <Card.Img className={styles["card-img"]} variant="top" src={image} />
      </Link>
      <Card.Body>
        <Card.Title classname={styles["card-title"]}>
          {brand} {model}
        </Card.Title>
        <Card.Text className={styles["card-text"]}>
          <GiCarSeat />
          {seats} <small>seats</small>
          <br />
          <RiPriceTag2Fill />
          {price} <small>per day</small>
          <br />
          <FaCarSide /> 
          {type}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {availableCount !== 0
            ? `${availableCount} Available`
            : "No cars available"}
        </small>
      </Card.Footer>
    </Card>
  );
}