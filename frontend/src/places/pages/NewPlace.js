import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/ErrorModal";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import AnimatedPage from "../../shared/components/AnimatedPage";
import { useNavigate } from "react-router-dom";
import "./NewPlace.css";
import Protected from "../../shared/Layout/Protected";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

const NewPlace = () => {
  //Global Context
  const auth = useContext(AuthContext);
  const user = auth.user;

  //NAVIAGTE
  const Navigate = useNavigate();

  //STATES
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  //INPUT VALIDATION
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const subTitleInputRef = useRef();
  const addressInputRef = useRef();
  const placeImageInputRef = useRef();

  const [inputValidity, setInputValidty] = useState({
    titleInput: true,
    descriptionInput: true,
    addressInput: true,
    subTitleInput: true,
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formDatas = new FormData();
    formDatas.append("title", titleInputRef.current.value);
    formDatas.append("subTitle", subTitleInputRef.current.value);
    formDatas.append("description", descriptionInputRef.current.value);
    formDatas.append("address", addressInputRef.current.value);
    formDatas.append("creator", auth.userID);
    formDatas.append("placeImage", image);
    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/places",
        {
          method: "POST",
          body: formDatas,
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      Navigate(`/${auth.userID}`);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
    setIsLoading(false);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Protected user={user}>
      <AnimatedPage>
        {<ErrorModal error={error} onClear={errorHandler} />}
        {isLoading && <LoadingSpinner />}
        <div className="flex justify-center pt-10">
          <div className="addPlaceSection">
            <form
              action="#"
              method="POST"
              className="addPlaceForm"
              id="AddPlaceForm"
              name="signinform"
              encType="multipart/form-data"
            >
              <p className="text-2xl">Add place</p>
              <ul className="noBullet">
                <li>
                  <label htmlFor="title"></label>
                  <input
                    ref={titleInputRef}
                    type="text"
                    className={
                      inputValidity.titleInput
                        ? `inputFields`
                        : `inputFieldInvalid`
                    }
                    id="title"
                    name="title"
                    placeholder="Title"
                    autoComplete="off"
                    required
                  />
                  {!inputValidity.titleInput && (
                    <p className="text-red-500">Please enter a valid title</p>
                  )}
                </li>
                <li>
                  <label htmlFor="title"></label>
                  <input
                    ref={subTitleInputRef}
                    type="text"
                    className={
                      inputValidity.subTitleInput
                        ? `inputFields`
                        : `inputFieldInvalid`
                    }
                    id="subTitle"
                    name="subTitle"
                    placeholder="Subtitle"
                    autoComplete="off"
                    required
                  />
                  {!inputValidity.subTitleInput && (
                    <p className="text-red-500">
                      Please enter a valid Subtitle
                    </p>
                  )}
                </li>
                <li>
                  <label htmlFor="address"></label>
                  <Autocomplete>
                    <input
                      ref={addressInputRef}
                      type="text"
                      className={
                        inputValidity.addressInput
                          ? `inputFields`
                          : `inputFieldInvalid`
                      }
                      id="address"
                      name="address"
                      placeholder="Address"
                      autoComplete="off"
                      required
                    />
                  </Autocomplete>
                  {!inputValidity.addressInput && (
                    <p className="text-red-500">Please enter a valid address</p>
                  )}
                </li>
                <li>
                  <label htmlFor="description"></label>
                  <textarea
                    ref={descriptionInputRef}
                    type="text"
                    className={
                      inputValidity.descriptionInput
                        ? `inputFields`
                        : `inputFieldInvalid`
                    }
                    id="description"
                    name="Description"
                    placeholder="Description"
                    required
                  />
                  {!inputValidity.descriptionInput && (
                    <p className="text-red-500">
                      Description should be longer than 10 characters
                    </p>
                  )}
                </li>
                <h1 className="pt-10">Upload Picture</h1>
                <li>
                  <input
                    ref={placeImageInputRef}
                    type="file"
                    className="inputFields inputImageField"
                    name="placeImage"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </li>
                <li id="center-btn">
                  <input
                    onClick={onSubmitHandler}
                    type="submit"
                    id="join-btn"
                    name="join"
                    alt="Join"
                    value="Create"
                  ></input>
                </li>
              </ul>
            </form>
            <p className="alert">
              <div>//Enter a correct address</div> //Refer the suggestions to
              find your correct address
            </p>
          </div>
        </div>
      </AnimatedPage>
    </Protected>
  );
};

export default NewPlace;
