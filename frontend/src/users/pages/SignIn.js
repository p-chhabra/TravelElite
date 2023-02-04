import React, { useRef, useState, useContext } from "react";
import AnimatedPage from "../../shared/components/AnimatedPage";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorModal from "../../shared/components/ErrorModal";

///VALIDITY
const isFiveChars = (value) => {
  return value.trim().length >= 5;
};

const emailValidation = (value) => {
  return value.includes("@") && !value.includes(" ");
};

const SignIn = () => {
  //STATES
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //Authorization Context
  const auth = useContext(AuthContext);

  //Naviagtion
  const Navigate = useNavigate();
  const form = document.getElementById("SignInForm");

  const [formInputValidity, setFormInputValidity] = useState({
    email: true,
    password: true,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const eneteredEmailIsValid = emailValidation(enteredEmail);
    const eneteredPasswordIsValid = isFiveChars(enteredPassword);

    setFormInputValidity({
      email: eneteredEmailIsValid,
      password: eneteredPasswordIsValid,
    });

    const formIsValid = eneteredEmailIsValid && eneteredPasswordIsValid;

    if (!formIsValid) {
      return;
    }

    if (formIsValid) {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        //Changing Page
        auth.login(responseData.user.id);
        auth.setUser(responseData.user.name);
        // form.reset();
        Navigate(`/${responseData.user.id}`);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
      setIsLoading(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <AnimatedPage>
      {<ErrorModal error={error} onClear={errorHandler} />}
      {isLoading && <LoadingSpinner />}
      <div className="flex justify-center pt-20">
        <div className="signinSection">
          <form
            action="#"
            method="POST"
            className="signinForm"
            id="SignInForm"
            name="signinform"
          >
            <p className="text-2xl">Sign In</p>
            <ul className="noBullet">
              <li>
                <label htmlFor="email"></label>
                <input
                  ref={emailInputRef}
                  type="email"
                  className={
                    formInputValidity.email
                      ? `inputFields`
                      : `inputFieldInvalid`
                  }
                  id="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  required
                />
                {!formInputValidity.email && (
                  <p className="text-red-500">Please enter a valid email</p>
                )}
              </li>
              <li>
                <label htmlFor="password"></label>
                <input
                  ref={passwordInputRef}
                  type="password"
                  className={
                    formInputValidity.password
                      ? `inputFields`
                      : `inputFieldInvalid`
                  }
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                {!formInputValidity.password && (
                  <p className="text-red-500">
                    Password should be longer than 5 characters
                  </p>
                )}
              </li>
              <li id="center-btn">
                <input
                  onClick={onSubmitHandler}
                  type="submit"
                  id="join-btn"
                  name="join"
                  alt="Join"
                  value="Submit"
                ></input>
              </li>
            </ul>
          </form>
          <p className="alert">
            //Dont have an account. Visit{" "}
            <Link className="text-green-300 underline" to="/signup">
              SignUp
            </Link>{" "}
            Page to create one//
          </p>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default SignIn;
