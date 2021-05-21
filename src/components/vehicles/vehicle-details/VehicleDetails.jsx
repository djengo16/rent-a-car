import { useEffect, useState } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import { getVehicleAd } from "../../../core/services/vehiclesService";
import Sider from "../../sider/Sider";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { VehicleInfo } from "./VehicleInfo";
import { Link } from "react-router-dom";
import styles from './details.module.css'
import { getLoggedUser, logout } from "../../../core/services/authService";
import { VehicleRent } from "../vehicle-rent/VehicleRent";

export function VehicleDetails({ computedMatch }) {
  let productId = computedMatch.params.id;
  const [vehicle, setVehicle] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
      setLoggedUser(getLoggedUser())
    setLoading(true);
    console.log("asd");
    getVehicleAd(productId).then((res) => {
      console.log(res);
      setVehicle(res.data);
      setLoading(false);
    });
  }, [productId]);

  return (
    <>
      <Sider />
      <div className="container">
        <Breadcrumb className={styles.breadcrumb}>
            <Link to='/' className={styles.link}>Home</Link>
        </Breadcrumb>
        {/* <VehicleRent /> */}
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        ) : (
          <>
          <Row>
          <Col lg={12}>
            <VehicleInfo params={vehicle} user={loggedUser} />
          </Col>
        </Row>
        <Row>
            <Col lg={8}>
            <VehicleRent />
            </Col>
        </Row>
          </>
        )}
      </div>
    </>
  );
}
