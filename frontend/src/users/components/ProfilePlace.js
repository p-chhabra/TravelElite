import React, { useState } from "react";
import Modal from "../../shared/components/Modal";
import Map from "../../places/components/Map";
import "./ProfilePlace.css";
import Button from "../../shared/components/Button";
import EditForm from "./EditForm";
import { useNavigate } from "react-router-dom";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const ProfilePlace = (props) => {
  //PLACE COORDINATES
  const Navigate = useNavigate();

  //MAP FUNCTIONS
  const [showMap, setShowMap] = useState(false);
  const showMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  //MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [latlng, setLatlng] = useState([0, 0]);

  //DELETE MODAL UTILS
  const showModalHandler = () => {
    setShowModal(true);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  const onDeleteHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/places/${props.id}`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setShowModal(false);
      props.setPlacesChanged(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  //EDIT MODAL UTILS
  const showEditHandler = () => {
    setShowEdit(true);
  };

  const closeEditHandler = () => {
    setShowEdit(false);
  };

  //ADDRESS to LAT LNG
  const getCoordsHandler = async (address) => {
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setLatlng([lat, lng]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {/* MAP MODAL */}
      <Modal
        show={showMap}
        header={props.address}
        onCancel={closeMapHandler}
        contentClass="Place-item__modal-content "
        footerClass="Place-item__modal-actions "
        footer={<Button />}
      >
        <div className="Map-container">
          <Map center={latlng} zoom={16} />
        </div>
      </Modal>

      {/* DELETE PLACE MODAL */}
      <Modal
        show={showModal}
        onCancel={cancelModalHandler}
        header={"Are you sure?"}
        footer={
          <React.Fragment>
            <div className="flex justify-end space-x-8 items-center footer">
              <div
                className="bg-green-300 p-3 border-solid border-2 rounded-md border-black hover:cursor-pointer"
                onClick={cancelModalHandler}
              >
                Cancel
              </div>
              <div
                className="bg-red-400 p-3 hover:cursor-pointer border-black border-solid border-2 rounded-md"
                onClick={onDeleteHandler}
              >
                Delete
              </div>
            </div>
          </React.Fragment>
        }
      >
        <p>This place will be permanently deleted and cannot be recovered</p>
      </Modal>

      {/* EDIT PLACE MODAL */}
      <Modal
        className="modalClass"
        show={showEdit}
        onCancel={closeEditHandler}
        header={"EDIT"}
      >
        <EditForm
          setPlacesChanged={props.setPlacesChanged}
          closeEdit={closeEditHandler}
          placeID={props.id}
        />
      </Modal>
      <div className="Card-Container">
        <h1>{props.title}</h1>
        <img src={`http://localhost:5000/public/${props.image}`} alt="IMG" />
        <figcaption>
          <h2>{props.subTitle}</h2>
          <p>{props.description}</p>
          <div className="flex flex-row justify-between items-center">
            <button
              className="view--button"
              onClick={() => {
                showMapHandler();
                getCoordsHandler(props.address);
              }}
            >
              View on Map
            </button>
            <button className="edit--button" onClick={showEditHandler}>
              Edit Place
            </button>
            <button className="delete--button" onClick={showModalHandler}>
              Delete Place
            </button>
          </div>
        </figcaption>
      </div>
    </React.Fragment>
  );
};

export default ProfilePlace;
