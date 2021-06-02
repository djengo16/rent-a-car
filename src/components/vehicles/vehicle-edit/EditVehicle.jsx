import Sider from "../../sider/Sider";
import { Form, Col, Button, Row } from "react-bootstrap";
import styles from "./edit.module.css";
import { useEffect, useState } from "react";
import {
  getVehicleAd,
  updateVehicleAd,
} from "../../../core/services/vehiclesService";
import { uploadImage } from "../../../core/services/imagesService";
import { Redirect } from "react-router-dom";
import { Spinner, Image } from "react-bootstrap";

export function EditVehicle({ computedMatch }) {
  const [vehicleData, setData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const vehicleAdId = computedMatch.params.id;
  const vehicleTypes = ["economy", "luxyry", "SUV", "cargo", "estate"];

  const onInputChange = (event) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onFileChange = (event) => {
    setCurrentImage(URL.createObjectURL(event.target.files[0]));
    setData((prevState) => ({
      ...prevState,
      image: event.target.files[0],
    }));
  };

  useEffect(() => {
      getVehicleAd(vehicleAdId).then((res) => {
        setData(res.data);
        setCurrentImage(res.data.image);
      });
  }, [vehicleAdId]);


  const onFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { image, ...otherData } = vehicleData;

      if (image !== currentImage) {
        const res = await uploadImage(image);

        await updateVehicleAd({
          ...otherData,
          image: `https://res.cloudinary.com/diz18npdj/image/upload/${res.data.public_id}.png`,
        });
      } else {
        await updateVehicleAd({
          ...vehicleData,
        });
      }

      setLoading(false);
      setRedirect(true);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  return (
    <>
      <Sider />
      {redirect && <Redirect to={`/ad/details/${vehicleAdId}`} />}
      <div className="container">
        <Form className="form-inline" onSubmit={onFormSubmit}>
          <h1 className={styles.heading}>Edit vehicle ad</h1>
        {error && <span className={styles.error}>{error}</span>}
        <Row>
          <Col lg="6">
          <Image src={currentImage} className="col-lg-12 mw-100" id="my-img" />
          <div className="col-lg-12">

          <Form.Group className={styles["form-group"]} controlId="image"name="image">
          <Form.Label className={styles["form-label"]}>Upload vehicle photo.</Form.Label>
              <Form.File className={styles["file-input"]} id="image" custom>
                <Form.File.Input  type="file" isValid onChange={onFileChange} />
              </Form.File>
            </Form.Group>
          </div>
          <div className="col-lg-12">

          <Form.Group className={styles["form-group"]} controlId="availableCount" name="availableCount">
              <Form.Label className={styles["form-label"]}>Available vehicles count</Form.Label>
              <Form.Control value={vehicleData.availableCount}
              required 
              placeholder="Enter available cars count." 
              onChange={onInputChange}>
              </Form.Control>
            </Form.Group>
          </div>
          </Col>

          <Col lg="6">
          <Form.Group className={styles["form-group"]} as={Col} lg="12"controlId="brand"name="brand">
              <Form.Label className={styles["form-label"]}>Brand</Form.Label>
              <Form.Control value={vehicleData.model}
              disabled
              required 
              as="select" 
              placeholder="Choose..."  
              onChange={onInputChange}>
                <option value={vehicleData.model}>{vehicleData.brand}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles["form-group"]} as={Col} ld="12" controlId="model" name="model">
              <Form.Label className={styles["form-label"]}>Model</Form.Label>
              <Form.Control value={vehicleData.model}
              disabled
              required as="select" 
              placeholder="Choose..." 
              onChange={onInputChange}>
                <option value={vehicleData.model}>{vehicleData.model}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles["form-group"]}as={Col} md="12" controlId="type" name="type">
              <Form.Label className={styles["form-label"]}>Vehicle type</Form.Label>
              <Form.Control value={vehicleData.type}
              required 
              as="select"
              placeholder="Choose..."
              onChange={onInputChange}>
                <option disabled>Select type..</option>
                {vehicleTypes.map((type) => <option>{type}</option>)}
              </Form.Control>
            </Form.Group> 
            <Form.Group className={styles["form-group"]} as={Col} lg="12"controlId="fuelType" name="fuelType"  >
              <Form.Label className={styles["form-label"]}>
                Fuel Type
              </Form.Label>
              <Form.Control value={vehicleData.fuelType}
              required 
              placeholder="Enter fuel type.."  
              onChange={onInputChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles["form-group"]} as={Col} lg="12"controlId="constructionYear" name="constructionYear">
              <Form.Label className={styles["form-label"]}>
                Construction
              </Form.Label>
              <Form.Control value={vehicleData.constructionYear}
              required 
              placeholder="Enter year of construction.." 
              onChange={onInputChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles["form-group"]}as={Col} lg="12" controlId="seats" name="seats">
              <Form.Label className={styles["form-label"]}>Seats</Form.Label>
              <Form.Control value={vehicleData.seats}
              required  
              placeholder="Enter number of seats.." 
              type="number" 
              onChange={onInputChange}>
              </Form.Control>
            </Form.Group>
            
          <Form.Group className={styles["form-group"]} controlId="price" name="price">
              <Form.Label className={styles["form-label"]}>Price per day</Form.Label>
              <Form.Control value={vehicleData.price}
               type="number" 
               required  
               placeholder="Enter the price per day.." 
               onChange={onInputChange}>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only" />
            </Spinner>
          ) : (
            <Button className="btn btn-dark col-lg-2" type="submit">Save changes</Button>
          )}
        </Form>
      </div>
    </>
  );
}
