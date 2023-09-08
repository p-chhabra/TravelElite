import React, { useCallback, useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Layout from "./shared/Layout/Layout";
import AllUsers from "./users/pages/AllUsers";
import Home from "./Home/Home";
import SignUp from "./users/pages/SignUp";
import SignIn from "./users/pages/SignIn";
import Places from "./places/pages/Places";
import Profile from "./users/pages/Profile";
import "./index.css";
import { AnimatePresence } from "framer-motion";
import { AuthContext } from "./shared/context/auth-context";
import NewPlace from "./places/pages/NewPlace";

function App() {
  const location = useLocation();

  const [token, setToken] = useState(false);
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserID(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserID(null);
    localStorage.removeItem("userData");
  }, []);

  const setUserName = useCallback((user) => {
    setUser(user);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        user: user,
        setUser: setUserName,
        userID: userID,
      }}
    >
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/users/:userID" element={<Places />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/:profile" element={<Profile />} />
            <Route path={`/:profile/addPlace`} element={<NewPlace />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
