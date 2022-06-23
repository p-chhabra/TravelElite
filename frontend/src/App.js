import React from "react";
import { Routes, Route} from "react-router-dom";
import Places from "./places/pages/Places";
import Layout from "./shared/Layout/Layout";
import AllUsers from "./users/pages/AllUsers";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h1>Home-Page</h1>}/>
        <Route path="/users" element={<AllUsers/>}/>
        <Route path="/places" element={<Places/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
