import styles from "./rent-form.module.css";
import { useRef, useState } from "react";
import "react-datetime/css/react-datetime.css";
import { Form, Spinner } from "react-bootstrap";
import {
  calculateTotalPrice,
  createRental,
  RentalStatus,
} from "../../../core/services/rentsService";
import { formatDate } from "../../../core/services/dateService";
import { Button } from "react-bootstrap";
import {
  shouldUpdateToVIP,
  updateUser,
} from "../../../core/services/usersService";
import { updateVehicleAd } from "../../../core/services/vehiclesService";
import { Redirect } from "react-router";

export function RentCreate({ customer, vehicle }) {
  const date = new Date(); //yyyy-MM-ddThh:mm
  const minStartDate = formatDate(date);
  const [formattedDate, setFormattedDate] = useState(formatDate(date));

  const valueFromEl = useRef(new Date());
  const valueToEl = useRef(new Date());
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const onDateTimeChange = () => {
    const { from, to } = {
      from: new Date(valueFromEl.current.value),
      to: new Date(valueToEl.current.value),
    };

    let priceInfo = calculateTotalPrice({
      from,
      to,
      customer,
      pricePerDay: vehicle.price,
    });

    setFormattedDate(formatDate(from));

    setDiscount(priceInfo.discountPercent);
    setPrice(priceInfo.price);
    setTotalPrice(priceInfo.total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const shouldUpdate = await shouldUpdateToVIP(customer);

      if (shouldUpdate) {
        updateUser({
          ...customer,
          isVip: true,
        });
      }

      const rentalEvent = {
        startDate: new Date(valueFromEl.current.value).toLocaleString(),
        endDate: new Date(valueToEl.current.value).toLocaleString(),
        address,
        vehicle: vehicle,
        customerId: customer.id,
        totalPrice: totalPrice,
        status: RentalStatus.Waiting,
      };

      await createRental(rentalEvent);

      await updateVehicleAd({
        ...vehicle,
        availableCount: vehicle.availableCount - 1,
      });
    } catch (err) {
      setError(err);
    }
    setRedirect(true);
    setLoading(false);
  };

  return (
    <>
      {redirect && <Redirect to="/" />}
      <Form style={styles} onSubmit={handleSubmit}>
        {error && <label style={{ color: "red" }}>{error}</label>}
        <h2>Renting details</h2>
        <Form.Group controlId="customerName">
          <Form.Label>Customer</Form.Label>
          <Form.Control
            required
            disabled
            value={customer.fullName}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Vehicle model</Form.Label>
          <Form.Control
            required
            disabled
            value={`${vehicle.brand} ${vehicle.model}`}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>From</Form.Label>
          <Form.Control
            type="datetime-local"
            min={minStartDate}
            ref={valueFromEl}
            defaultValue={formattedDate}
            onChange={onDateTimeChange}
          />
          <Form.Text className="text-muted">
            Choose your pick up date and time!
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>To</Form.Label>
          <Form.Control
            type="datetime-local"
            min={formattedDate}
            ref={valueToEl}
            defaultValue={formattedDate}
            onChange={onDateTimeChange}
          />
          <Form.Text className="text-muted">
            Choose your drop off date and time!
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            placeholder="Enter your pick up address .."
            onChange={onAddressChange}
          ></Form.Control>
        </Form.Group>
        <div>
          <h2>{totalPrice !== 0 && `Total price: ${totalPrice.toFixed(2)}`}</h2>
          {discount !== 0 && (
            <label id={styles["discountLabel"]}>
              <label id={styles["originalPrice"]}>{price.toFixed(2)}$</label>
              <small> {discount}% discount</small>
            </label>
          )}
        </div>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <Button variant="outline-dark" type="submit">
            RENT
          </Button>
        )}
      </Form>
    </>
  );
}
