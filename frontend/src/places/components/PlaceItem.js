import React, { useState } from "react";
import "./PlaceItem.css";
import Modal from "../../shared/components/Modal";
import Map from "./Map";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const showMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const Button = ()=>{
    return <button onClick={closeMapHandler} className="p-5 bg-green-300 text-white">Close</button>
  }

  const {lat, lng} = props.coordinates;

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        header={props.address}
        onCancel={closeMapHandler}
        contentClass="place-item__modal-content "
        footerClass="place-item__modal-actions "
        footer={<Button/>}
      >
        <div className="map-container">
          <Map center={[lat,lng]} zoom={16}/>
        </div>
      </Modal>
      <div className="card-container">
        <h1>{props.title}</h1>
        <img
          src="https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="IMG"
        />
        <figcaption>
          <h2>Details</h2>
          <p>{props.description}</p>
          <button onClick={showMapHandler}>View on Map</button>
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
