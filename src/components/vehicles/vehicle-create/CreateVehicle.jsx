import Sider from "../../sider/Sider";
import { Form, Col, Button,Row } from "react-bootstrap";
import styles from "./create.module.css";
import { useEffect, useState } from "react";
import {
  createVehicleAd,
  getVehicleBrands,
} from "../../../core/services/vehiclesService";
import { uploadImage } from "../../../core/services/imagesService";
import { Redirect } from "react-router-dom";
import { Spinner, Image } from "react-bootstrap";

const defaultImg = "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"

export function CreateVehicle() {
  const [brandsWithModels, setBrandsWithModels] = useState(null);
  const [brands, setBrands] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [models, setModels] = useState(null);
  const [vehicleData, setData] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const vehicleTypes = ["economy","luxyry","SUV","cargo","estate"];

  const getBrands = () => {
    getVehicleBrands()
      .then((res) => {
        setBrandsWithModels({ brands: res.data[0] });
        setBrands(
          Object.keys(res.data[0]).reduce((a, c) => {
            a.push(c);
            return a;
          }, [])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onInputChange = (event) => {
    event.preventDefault();

    if (event.target.id === "brand") {
      setSelectedBrand(event.target.value);
    }
    

    setData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onFileChange = (event) => {
    let image = document.getElementById('my-img');
    image.src = URL.createObjectURL(event.target.files[0]);
    setData((prevState) => ({
      ...prevState,
      image: event.target.files[0],
    }));
  };

  useEffect(() => {
    if (!brandsWithModels) {
      getBrands();
    }
    if (selectedBrand) {
      setModels(brandsWithModels.brands[selectedBrand]);
    }
  }, [selectedBrand]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try{
    const { image, ...otherData } = vehicleData;
    const res = await uploadImage(image);
    
    const vehicleRes = await createVehicleAd({
      ...otherData,
      image: `https://res.cloudinary.com/diz18npdj/image/upload/${res.data.public_id}.png`,
    })
    
    setLoading(false);
    setRedirect(true);

    }catch(err){
      setError(err);
      setLoading(false);
    }   
        
  };
  return (
    <>
      <Sider />
      {redirect && <Redirect to="/" />}
      <div className="container">
        <Form cllasName="form-inline" onSubmit={onFormSubmit}>
          <h1 className={styles.heading}>Create new ad</h1>
        {error && <span className={styles.error}>{error}</span>}
        <Row>
          <Col lg="6">
          <Image src={defaultImg} className="col-lg-12 mw-100" id="my-img" />
          <div className="col-lg-12">
          <Form.Group className={styles["form-group"]} controlId="image"name="image">
          <Form.Label className={styles["form-label"]}>Upload vehicle photo.</Form.Label>
              <Form.File className={styles["file-input"]} id="image" custom>
                <Form.File.Input  type="file" isValid required onChange={onFileChange} />
              </Form.File>
            </Form.Group>
          </div>
          <div className="col-lg-12">
          <Form.Group className={styles["form-group"]} controlId="availableCount" name="availableCount">
              <Form.Label className={styles["form-label"]}>Available vehicles Count</Form.Label>
              <Form.Control required type="number" placeholder="Enter available cars count." onChange={onInputChange}>
              </Form.Control>
            </Form.Group>
          </div>
          </Col>
          <Col lg="6">
          <Form.Group className={styles["form-group"]} as={Col} lg="12"controlId="brand"name="brand">
              <Form.Label className={styles["form-label"]}>Brand</Form.Label>
              <Form.Control required as="select" placeholder="Choose..."  onChange={onInputChange}>
                <option disabled>Select brand...</option>
                {brands && brands.map((brand) => <option>{brand}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles["form-group"]} as={Col} ld="12" controlId="model" name="model">
              <Form.Label className={styles["form-label"]}>Model</Form.Label>
              <Form.Control required as="select" placeholder="Choose..." onChange={onInputChange}>
                <option disabled>Select model...</option>
                {models && models.map((model) => <option>{model}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles["form-group"]}as={Col} md="12" controlId="type" name="type">
              <Form.Label className={styles["form-label"]}>Vehicle type</Form.Label>
              <Form.Control required as="select"placeholder="Choose..."onChange={onInputChange}>
                <option disabled>Select type..</option>
                {vehicleTypes.map((type) => <option>{type}</option>)}
              </Form.Control>
            </Form.Group> 
            <Form.Group className={styles["form-group"]} as={Col} lg="12"controlId="fuelType" name="fuelType"  >
              <Form.Label className={styles["form-label"]}>
                Fuel Type
              </Form.Label>
              <Form.Control required placeholder="Enter fuel type.."  onChange={onInputChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles["form-group"]} as={Col} lg="12"controlId="constructionYear" name="constructionYear">
              <Form.Label className={styles["form-label"]}>
                Construction
              </Form.Label>
              <Form.Control required placeholder="Enter year of construction.." onChange={onInputChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles["form-group"]}as={Col} lg="12" controlId="seats" name="seats">
              <Form.Label className={styles["form-label"]}>Seats</Form.Label>
              <Form.Control required  placeholder="Enter number of seats.." type="number" onChange={onInputChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles["form-group"]} controlId="price" name="price">
              <Form.Label className={styles["form-label"]}>Price per</Form.Label>
              <Form.Control type="number" required  placeholder="Enter the price per day.." onChange={onInputChange}>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only" />
            </Spinner>
          ) : (
            <Button className="btn btn-dark col-lg-2" type="submit">Create</Button>
          )}
        </Form>
      </div>
    </>
  );
}
