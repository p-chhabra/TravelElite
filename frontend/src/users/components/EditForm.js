import React, { useState, useRef } from "react";
import "./EditForm.css";

///VALIDITY
const isFiveChars = (value) => {
  return value.trim().length >= 5;
};

const EditForm = (props) => {
  const form = document.getElementById("EditForm");

  const [formInputValidity, setFormInputValidity] = useState({
    title: true,
    subTitle: true,
    description: true,
  });

  const titleInputRef = useRef();
  const subTitleInputRef = useRef();
  const descriptionInputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredsubTitle = subTitleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const enteredTitleIsValid = isFiveChars(enteredTitle);
    const enteredsubTitleIsValid = isFiveChars(enteredsubTitle);
    const enteredDescriptionIsValid = isFiveChars(enteredDescription);

    setFormInputValidity({
      title: enteredTitleIsValid,
      subTitle: enteredsubTitleIsValid,
      description: enteredDescriptionIsValid,
    });

    const formIsValid =
      enteredTitleIsValid &&
      enteredsubTitleIsValid &&
      enteredDescriptionIsValid;

    if (!formIsValid) {
      return;
    }

    if (formIsValid) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/places/${props.placeID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: titleInputRef.current.value,
              subTitle: subTitleInputRef.current.value,
              description: descriptionInputRef.current.value,
            }),
          }
        );
        console.log(response.message);
        props.closeEdit();
        props.setPlacesChanged(true);
        form.reset();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="editPlaceSection">
      <form
        action="#"
        method="PATCH"
        className="editPlaceForm"
        id="EditForm"
        name="signinform"
      >
        <ul className="noBullet">
          <li>
            <label htmlFor="title"></label>
            <input
              ref={titleInputRef}
              type="text"
              className={
                formInputValidity.title ? `InputFields` : `InputFieldInvalid`
              }
              id="Title"
              name="title"
              placeholder="New Title"
              autoComplete="off"
              required
            />
            {!formInputValidity.title && (
              <p className="text-red-500">
                title should be atleast 5 characters long
              </p>
            )}
          </li>
          <li>
            <label htmlFor="subTitle"></label>
            <input
              ref={subTitleInputRef}
              type="text"
              className={
                formInputValidity.subTitle ? `InputFields` : `InputFieldInvalid`
              }
              id="Subtitle"
              name="subTitle"
              placeholder="New Subtitle"
              autoComplete="off"
              required
            />
            {!formInputValidity.subTitle && (
              <p className="text-red-500">
                Subtitle should be longer than 5 characters
              </p>
            )}
          </li>
          <li>
            <label htmlFor="description"></label>
            <input
              ref={descriptionInputRef}
              type="text"
              className={
                formInputValidity.description
                  ? `InputFields`
                  : `InputFieldInvalid`
              }
              id="Description"
              name="description"
              placeholder="New Description"
              autoComplete="off"
              required
            />
            {!formInputValidity.description && (
              <p className="text-red-500">
                Description should be longer than 5 characters
              </p>
            )}
          </li>
          <div className="flex justify-end space-x-8 pr-8 pt-8 items-center footer">
            <a
              className="bg-red-400 p-3 border-solid border-2 rounded-md border-black hover:cursor-pointer"
              onClick={props.closeEdit}
            >
              Cancel
            </a>
            <input
              type="submit"
              className="bg-green-300 p-3 hover:cursor-pointer border-black border-solid border-2 rounded-md"
              onClick={onSubmitHandler}
              value="Confirm"
            ></input>
          </div>
        </ul>
      </form>
    </div>
  );
};

export default EditForm;
