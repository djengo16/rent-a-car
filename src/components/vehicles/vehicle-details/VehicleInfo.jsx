import { Tooltip, Image, Row, OverlayTrigger, Col,Button,Modal } from "react-bootstrap";
import styles from "./info.module.css";
import { Link, Redirect } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { deleteVehicleAd } from "../../../core/services/vehiclesService";

export function VehicleInfo({ params, user }) {

    const [show, setShow] = useState(false);
    const [redirect,setRedirect] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        handleClose();
        deleteVehicleAd(params.id).then(_=> {
            setRedirect(true);
        })
    }


  return (
      <aside>
        {redirect === true && <Redirect to="/" />}
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
                <Link to={`/ad/edit/${params.id}`}>
                  <GrEdit />
                </Link>
              </span>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <span id={styles["delete-icon"]} onClick={handleShow}>
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
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting ad</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are your sure you want to delete this ad?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
           Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </aside>
  );
}