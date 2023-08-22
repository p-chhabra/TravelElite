import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ user, children }) => {
  if (user == null) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
};

export default Protected;
