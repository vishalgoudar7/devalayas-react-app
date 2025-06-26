import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from"./components/navbar/Navbar";
import TempleList from "./components/TempleList";
import TempleDetails from "./components/TempleDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TempleList />} />
        <Route path="/temple/:id" element={<TempleDetails />} />
        {/* <Route path="/pooja-details/:id" element={<PoojaDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
