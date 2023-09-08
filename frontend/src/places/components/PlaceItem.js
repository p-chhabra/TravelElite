import React, { useState } from "react";
import "./PlaceItem.css";
import Modal from "../../shared/components/Modal";
import Map from "./Map";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [latlng, setLatlng] = useState([0, 0]);

  const showMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const Button = () => {
    return (
      <button onClick={closeMapHandler} className="p-5 bg-green-300 text-white">
        Close
      </button>
    );
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
      <Modal
        show={showMap}
        header={props.address}
        onCancel={closeMapHandler}
        contentClass="place-item__modal-content "
        footerClass="place-item__modal-actions "
        footer={<Button />}
      >
        <div className="map-container">
          <Map center={latlng} zoom={16} />
        </div>
      </Modal>
      <div className="card-container">
        <h1>{props.title}</h1>
        <img
          src={process.env.REACT_APP_ASSET_URL + `/public/${props.imgName}`}
          alt="IMG"
        />
        <figcaption>
          <h2>Details</h2>
          <p>{props.description}</p>
          <button
            onClick={() => {
              showMapHandler();
              getCoordsHandler(props.address);
            }}
          >
            View on Map
          </button>
        </figcaption>
      </div>
    </React.Fragment>
  );
};

export default PlaceItem;

/*<div className="post-content">
<div className="category">Photos</div>
<h1 className="title">{props.title}</h1>
<h2 className="sub_title">{props.subTitle}</h2>
<p className="description">{props.description}</p>
</div>*/
