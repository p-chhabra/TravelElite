import React, {useCallback, useState} from "react";
import { Routes, Route, useLocation, Navigate} from "react-router-dom";
import Layout from "./shared/Layout/Layout";
import AllUsers from "./users/pages/AllUsers";
import Home from "./Home/Home";
import SignUp from "./users/pages/SignUp";
import SignIn from "./users/pages/SignIn"
import Places from "./places/pages/Places";
import Profile from "./users/pages/Profile";
import './index.css';
import { AnimatePresence } from "framer-motion";
import {AuthContext} from './shared/context/auth-context'
import NewPlace from "./places/pages/NewPlace";

function App() {

  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState(null);

  const login = useCallback((uid)=>{
    setIsLoggedIn(true);
    setUserID(uid);
  },[])

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
    setUserID(null);
  },[]);

  const setUserName = useCallback((user)=>{
    setUser(user);
  },[]);

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout, user: user, setUser: setUserName, userID: userID }}>
    <Layout>
      <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home/>}/>
        <Route path="/users" element={<AllUsers/>}/>
        <Route path="/users/:userID" element={<Places/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/:profile" element={<Profile/>}/>
        <Route path={`/:profile/addPlace`} element={<NewPlace/>}/>
      </Routes>
      </AnimatePresence>
    </Layout>
    </AuthContext.Provider>
  );
}

export default App;
