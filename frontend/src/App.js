import React from "react";
import { Routes, Route} from "react-router-dom";
import Layout from "./shared/Layout/Layout";
import AllUsers from "./users/pages/AllUsers";
import './index.css'
import Home from "./Home/Home";
import SignUp from "./users/pages/SignUp";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/users" element={<AllUsers/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
