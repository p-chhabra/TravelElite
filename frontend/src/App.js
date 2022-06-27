import React from "react";
import { Routes, Route, useLocation} from "react-router-dom";
import Layout from "./shared/Layout/Layout";
import AllUsers from "./users/pages/AllUsers";
import './index.css'
import Home from "./Home/Home";
import SignUp from "./users/pages/SignUp";
import SignIn from "./users/pages/SignIn"
import Places from "./places/pages/Places";
import { AnimatePresence } from "framer-motion";

function App() {

  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home/>}/>
        <Route path="/users" element={<AllUsers/>}/>
        <Route path="/users/:userID" element={<Places/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
