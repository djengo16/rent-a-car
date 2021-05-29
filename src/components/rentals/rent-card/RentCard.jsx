import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./rent-card.module.css";

export function RentCard({ info }) {
  const badges = {
    Waiting: "warning",
    "In Proccess": "success",
    Old: "secondary",
  };

  return (
    <Card className={styles["card"]}>
      <Card.Header>
      <Button style={{float:"left"}} disabled variant={badges[info.status]}>{info.status}</Button>
        {info.address}
      </Card.Header>
      <Card.Body>
        <Card.Title>{info.customerName}</Card.Title>
        <Card.Text>
          {info.vehicle.brand} {info.vehicle.model}
        </Card.Text>
        <Link to={`/user/${info.customerId}`}>Customer</Link>
      </Card.Body>
      <Card.Footer className="text-muted">
        {info.startDate} - {info.endDate}
      </Card.Footer>
    </Card>
  );
}
// "startDate": "Tue Apr 06 2021",
//       "endDate": "Tue Apr 06 2021",
//       "address": "",
//       "vehicle": {
//         "id": "x6sr423xs0",
//         "image": "https://www.driving.co.uk/s3/st-driving-prod/uploads/2016/01/sti_Civic_Tourer-168jpg-JS204830731.jpg",
//         "type": "estate",
//         "brand": "Honda",
//         "model": "Civic Tourer",
//         "constructionYear": 2001,
//         "fuelType": "petrol",
//         "seats": 4,
//         "price": 100,
//         "availableCount": 2
//       },
//       "customerId": "F6NJL1Y",
//       "status": "waiting",
//       "id": 3
