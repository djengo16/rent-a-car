import { Accordion, Card, Button } from "react-bootstrap";
import styles from "./rent.module.css";
import { RentCreate } from "../../rentals/rent-create/RentCreate";
export function VehicleRent(props) {
  return (
    <Accordion>
      <Card>
        <Card.Header className={styles.header}>
          {props.vehicle.availableCount === 0 ? (
            <Accordion.Toggle as={Button} disabled variant="dark" eventKey="0">
              ТHERE ARE NO CARSAVAILABLE AT THE MOMENT!
            </Accordion.Toggle>
          ) : (
            <Accordion.Toggle as={Button} variant="dark" eventKey="0">
              RENT NOW!
            </Accordion.Toggle>
          )}
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <RentCreate vehicle={props.vehicle} customer={props.customer} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
