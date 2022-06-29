import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker , Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from '../../assets/placeholder.png'


const Map = (props) => {
  const { center, zoom } = props;

  const markerIcon = new L.Icon({
    iconUrl: icon,
    iconSize : [35,45]
  })

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{width: "100%", height:"20rem"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={markerIcon} position={center}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
