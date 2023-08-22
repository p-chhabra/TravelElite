import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceItem from "../components/PlaceItem";
import AnimatedPage from "../../shared/components/AnimatedPage";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorModal from "../../shared/components/ErrorModal";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const Places = (props) => {
  const { userID } = useParams();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/places/users/${userID}`
        );
        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setPlaces(responseData.places);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
      setIsLoading(false);
    };
    fetchPlaces();
  }, []);

  //ADDRESS to LAT LNG
  const getCoords = async (address) => {
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat, lng);
      return { lat, lng };
    } catch (err) {
      console.log(err);
      return { lat: 0, lng: 0 };
    }
  };

  const userPlaces = places.map((place) => {
    return (
      <PlaceItem
        key={place.id}
        title={place.title}
        description={place.description}
        subTitle={place.subTitle}
        address={place.address}
        coordinates={getCoords(place.address)}
        imgName={place.image}
      />
    );
  });

  const errorHandler = () => {
    setError(null);
  };

  return (
    <AnimatedPage>
      {isLoading && <LoadingSpinner />}
      <ErrorModal error={error} onClear={errorHandler} />
      {userPlaces.length !== 0 && (
        <h1 className="text-center text-3xl text-gray-300">Places</h1>
      )}
      {userPlaces.length === 0 && (
        <h1 className="text-center text-3xl text-gray-300">No places found</h1>
      )}
      {userPlaces}
    </AnimatedPage>
  );
};

export default Places;
