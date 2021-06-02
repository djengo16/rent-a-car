import { MdPhoneAndroid, MdEmail } from "react-icons/md";
import { RiVipCrownFill } from "react-icons/ri";
import { Row, Col, Image, Modal, Button, Spinner } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { useContext, useEffect } from "react";
import { useState } from "react";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../../../core/services/usersService";
import "./userInfo.css";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { uploadImage } from "../../../core/services/imagesService";
import { Redirect } from "react-router";
import UserContext from "../../../Context";
import { getLoggedUser } from "../../../core/services/authService";

export function UserInfo({ userId }) {
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [currentEditAvatar, setCurrentEditAvatar] = useState();
  const [redirect, setRedirect] = useState(false);
  const context = useContext(UserContext);
  const loggedUser = getLoggedUser();

  const deleteMessage =
    "Are you sure you want to permanently delete your account?";

  useEffect(() => {
    //Protection check
    if (loggedUser.id !== userId && loggedUser.isAdmin === false) {
      setRedirect(true);
    } else {
      getUserById(userId).then((res) => {
        setUser(res.data);
        setCurrentEditAvatar(res.data.avatar);
        setEditedUser(res.data);
      });
    }
  }, [userId, loggedUser.id, loggedUser.isAdmin]);

  const onInputChange = (event) => {
    setEditedUser((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onFileChange = (event) => {
    setCurrentEditAvatar(URL.createObjectURL(event.target.files[0]));
    setEditedUser((prevState) => ({
      ...prevState,
      avatar: event.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { avatar, ...otherData } = editedUser;

    if (user.avatar !== currentEditAvatar) {
      const res = await uploadImage(avatar);
      updateUser({
        ...otherData,
        avatar: `https://res.cloudinary.com/diz18npdj/image/upload/${res.data.public_id}.png`,
      }).then((res) => {
        setUser(res.data);
        setLoading(false);
        handleClose();
      });
    } else {
      updateUser(editedUser).then((res) => {
        setUser(res.data);
        setLoading(false);
        handleClose();
      });
    }
  };

  const handleDetele = (e) => {
    deleteUser(user.id).then((_) => {
      handleDeleteClose();
      setRedirect(true);
      context.logOut();
    });
  };

  //For EDIT MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //For DELETE MODAL
  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  return (
    <div id="profile-head">
      {redirect === true && <Redirect to="/" />}
      <div className="container">
        <Row className="profile-row">
          <Col lg={2} md={5} sm={12}>
            <Image roundedCircle id="avatar" alt="avatar" src={user.avatar} />
          </Col>
          <Col lg={3} md={3} sm={12}>
            <p>
              <BsFillPersonFill /> {user.fullName}
            </p>
            <p>
              <MdEmail /> {user.email}
            </p>
            <p>
              <MdPhoneAndroid /> +{user.phone}
            </p>
            {user.isVip && (
              <p>
                <RiVipCrownFill /> VIP
              </p>
            )}
          </Col>
          <div>
            <span className="crud-icon">
              <GrEdit onClick={handleShow} />
            </span>
            <span className="crud-icon">
              <MdDelete onClick={handleDeleteShow} />
            </span>
          </div>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit your profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Image
                roundedCircle
                id="avatar"
                alt="avatar"
                src={currentEditAvatar}
              />
              <div className="form-group">
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  onChange={onFileChange}
                />
              </div>
              <div className="form-grup">
                <label htmlFor="fullName">Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control border-dark"
                  defaultValue={user.fullName}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="form-grup">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control border-dark"
                  defaultValue={user.email}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="form-grup">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control border-dark"
                  defaultValue={user.phone}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control border-dark"
                  defaultValue={user.password}
                  onChange={onInputChange}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Discard
            </Button>
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <Button variant="success" onClick={handleSubmit}>
                Save Changes
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal
          className="modal-delete"
          show={showDelete}
          onHide={handleDeleteClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete your account</Modal.Title>
          </Modal.Header>
          <Modal.Body>{deleteMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Discard
            </Button>
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <Button variant="danger" onClick={handleDetele}>
                Delete
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
