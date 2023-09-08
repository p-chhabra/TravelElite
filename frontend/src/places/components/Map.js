import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

const Map = (props) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ["places", "geometry"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  const coords = props.center;
  const lat = coords[0],
    lng = coords[1];

  return (
    <GoogleMap
      zoom={props.zoom}
      center={{ lat, lng }}
      mapContainerClassName={"map-contain"}
    >
      <Marker position={{ lat, lng }}> </Marker>
    </GoogleMap>
  );
};

export default Map;
