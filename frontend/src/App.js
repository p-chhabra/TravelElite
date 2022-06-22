import React from "react";
import { Routes, Route} from "react-router-dom";
import Places from "./places/pages/Places";
import Layout from "./shared/Layout/Layout";
import Users from "./users/pages/Users";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h1>HomePage</h1>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/places" element={<Places/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
