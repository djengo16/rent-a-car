import { Tooltip, Image, Row, OverlayTrigger, Col } from "react-bootstrap";
import styles from "./info.module.css";
import { Link } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

export function VehicleInfo({ params, user }) {
  return (
    <Row className="">
      <Image className="col-lg-8" src={params.image} rounded />
      <div className="col-lg-4" id="infoLabel">
        {user.isAdmin && (
          <>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Edit the ad</Tooltip>}
            >
              <span id={styles["edit-icon"]}>
                <Link to={``}>
                  <GrEdit />
                </Link>
              </span>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <span id={styles["delete-icon"]}>
                <MdDelete />
              </span>
            </OverlayTrigger>
          </>
        )}
       <Col>
       <h2>
        {params.brand} {params.model}
      </h2>
       <h4>{`Price per day ${params.price}.00$`}</h4>
       </Col>
       <br></br>
       <Col>
       <p><b>Vehicle type: </b> &nbsp;&nbsp;&nbsp;&nbsp;{`${params.type}`}</p>
       <p><b>Construction year: </b>  &nbsp;&nbsp;&nbsp;&nbsp;{`${params.constructionYear}`}</p>
       <p><b>Seats count: </b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${params.seats}`}</p>
       <p><b>Fuel type: </b> &nbsp;&nbsp;&nbsp;&nbsp;{`${params.fuelType}`}</p>
       <p><b>Available vehicles:  </b>&nbsp;&nbsp;&nbsp;&nbsp;{`${params.availableCount}`}</p>
       </Col>
      </div>
    </Row>
  );
}