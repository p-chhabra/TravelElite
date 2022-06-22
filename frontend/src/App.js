import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Places from "./places/pages/Places";
import Users from "./users/pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users/>}/>
        <Route path="/places" element={<Places/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
