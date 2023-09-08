import React, { useState, useEffect, useContext } from "react";
import AnimatedPage from "../../shared/components/AnimatedPage";
import { Link, useParams, Navigate } from "react-router-dom";
import "./Profile.css";
import ErrorModal from "../../shared/components/ErrorModal";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ProfilePlace from "../components/ProfilePlace";
import { AuthContext } from "../../shared/context/auth-context";
import Protected from "../../shared/Layout/Protected";

const Profile = () => {
  //PARAMS
  const params = useParams();

  //CONTEXT
  const auth = useContext(AuthContext);
  const userID = auth.userID;

  //STATES
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState([]);
  const [placesChanged, setPlacesChanged] = useState(false);

  //FETCHING PLACES
  useEffect(() => {
    const getRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/places/users/${userID}`
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setPlaces(responseData.places);
      } catch (err) {
        console.log(err.message);
        setError(
          "You currently don't have any places, create one by by clicking Add Place"
        );
      }
      setIsLoading(false);
      setPlacesChanged(false);
    };
    getRequest();
  }, [placesChanged, userID]);

  //PLACE RENDERING
  const profilePlaces = places.map((place) => {
    return (
      <ProfilePlace
        key={place.id}
        title={place.title}
        subTitle={place.subTitle}
        description={place.description}
        id={place.id}
        address={place.address}
        image={place.image}
        setPlacesChanged={setPlacesChanged}
      />
    );
  });

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Protected user={userID}>
      <AnimatedPage>
        {isLoading && <LoadingSpinner />}
        {
          <ErrorModal
            header={`Hello ${auth.user}!`}
            error={error}
            onClear={errorHandler}
          />
        }
        {!isLoading && (
          <h1 className="text-gray-300 text-center text-3xl">Your Profile</h1>
        )}
        <div className="flex">{!isLoading && profilePlaces}</div>
        {!isLoading && (
          <div className="flex flex-row justify-center m-10">
            <Link
              className="border-gray-300 rounded-md border-4 p-2 hover:bg-green-600 bg-green-500 text-center text-gray-300 font-bold text-2xl"
              to={`/${auth.userID}/addPlace`}
            >
              Add Place
            </Link>
          </div>
        )}
      </AnimatedPage>
    </Protected>
  );
};
export default Profile;
