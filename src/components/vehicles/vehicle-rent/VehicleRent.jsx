import {Accordion, Card, Button, Form} from 'react-bootstrap'
import styles from './rent.module.css'
import {RentCreate} from '../../rentals/rent-create/RentCreate'
import { useEffect } from 'react';
export function VehicleRent(props) {

  return (
    <Accordion>
      <Card>
        <Card.Header className={styles.header}>
          <Accordion.Toggle as={Button} variant="dark" eventKey="0">
            RENT NOW!
          </Accordion.Toggle>
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
