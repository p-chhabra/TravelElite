import React, {useCallback, useState} from "react";
import { Routes, Route, useLocation} from "react-router-dom";
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

function App() {

  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(()=>{
    setIsLoggedIn(true);
  },[])

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  },[]);

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
    <Layout>
      <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home/>}/>
        <Route path="/users" element={<AllUsers/>}/>
        <Route path="/users/:userID" element={<Places/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      </AnimatePresence>
    </Layout>
    </AuthContext.Provider>
  );
}

export default App;
