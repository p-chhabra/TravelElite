import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./VisitUser.css";
import defaultImg from "../../assets/default-profile.jpg";
import Modal from "../../shared/components/Modal";

const VisitUser = (props) => {
  //STATES
  const [showModal, setShowModal] = useState(false);

  //FUNCTIONS
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  let src = "";
  if (props.image) {
    src = `http://localhost:5000/public/${props.image}`;
  }

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header={`Cannot load ${props.name}'s profile`}
        footer={
          <div className="flex justify-end space-x-8 items-center footer">
            <a
              className="bg-green-300 p-3 border-solid border-2 rounded-md border-black hover:cursor-pointer"
              onClick={closeModalHandler}
            >
              Close
            </a>
          </div>
        }
      >
        {props.name + ` has a private profile`}
      </Modal>

      <div className="card">
        <div className="title">{props.name}</div>

        <div className="icon">
          <img src={src || defaultImg} alt="IMG" />
        </div>

        <div className="features">
          <ul>
            <li>
              Total Places: <span>{props.places}</span>
            </li>
          </ul>
        </div>

        <Link
          onClick={props.isPrivate ? showModalHandler : ""}
          to={props.isPrivate ? "" : `/users/${props.id}`}
          className="btn"
        >
          Visit Profile
        </Link>
      </div>
    </React.Fragment>
  );
};

export default VisitUser;
