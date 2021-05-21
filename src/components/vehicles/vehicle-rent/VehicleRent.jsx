import {Accordion, Card, Button} from 'react-bootstrap'
import styles from './rent.module.css'
export function VehicleRent() {
  return (
    <Accordion>
      <Card>
        <Card.Header className={styles.header}>
          <Accordion.Toggle as={Button} variant="dark" eventKey="0">
            RENT NOW!
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Renting details form goes here!</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
