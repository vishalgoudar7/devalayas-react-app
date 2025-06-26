import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TempleList from "./components/TempleList";
import TempleDetails from "./components/TempleDetails";
import CartPage from "./components/CartPage";
import BookingPage from "./components/BookingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TempleList />} />
        <Route path="/temple/:id" element={<TempleDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
