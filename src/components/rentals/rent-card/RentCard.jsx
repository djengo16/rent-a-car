import { useContext, useState } from "react";
import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../../../Context";
import {
  changeRentalEventStatus,
  RentalStatus,
} from "../../../core/services/rentsService";
import styles from "./rent-card.module.css";

export function RentCard({ info }) {
  const [status, setStatus] = useState(info.status);

  const badges = {
    Waiting: "warning",
    "In Proccess": "success",
    Old: "secondary",
  };

  const handleStatusChange = (e) => {
    changeRentalEventStatus(info.id, e.target.innerText);
    setStatus(e.target.innerText);
  };

  const context = useContext(UserContext);

  return (
    <Card className={styles["card"]}>
      <Card.Header>
        <Button
          style={{ float: "left" }}
          disabled
          variant={badges[status]}
        >
          {status}
        </Button>
        {info.address}
      </Card.Header>
      <Card.Body>
        <Card.Title>{info.customerName}</Card.Title>
        <Card.Text>
          {info.vehicle.brand} {info.vehicle.model}
        </Card.Text>
        <Link to={`/user/${info.customerId}`}>Customer</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={`/ad/details/${info.vehicle.id}`}>Vehicle</Link>
        {context.user.isAdmin && (
          <Dropdown as={ButtonGroup} className="d-block">
            <Button variant="secondary">Change status</Button>

            <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleStatusChange}>
                {RentalStatus.Waiting}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleStatusChange}>
                {RentalStatus.InProccess}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleStatusChange}>
                {RentalStatus.Old}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        {info.startDate} - {info.endDate}
      </Card.Footer>
    </Card>
  );
}
