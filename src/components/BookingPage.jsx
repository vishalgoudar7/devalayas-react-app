import React, { useState } from "react";
import { useSelector } from "react-redux";

const BookingPage = () => {
  const cart = useSelector(state => state.cart.items);
  const [form, setForm] = useState({ name: "", email: "", date: "", phone: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    const token = "94c4c11bfac761ba896de08bd383ca187d4e4dc4";

    for (const item of cart) {
      const payload = {
        temple_id: item.templeId,
        pooja_id: item.id,
        booking_date: form.date,
        devotee_name: form.name,
        devotee_email: form.email,
        phone_number: form.phone,
      };

      const res = await fetch("https://beta.devalayas.com/api/v1/devotee/pooja/booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Error:", data);
        setStatus("Booking failed.");
        return;
      }
    }

    setStatus("Booking successful!");
  };

  return (
    <div className="container mt-4">
      <h4>Booking Form</h4>
      <div className="mb-3">
        <input className="form-control" placeholder="Your Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="mb-3">
        <input className="form-control" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="mb-3">
        <input className="form-control" type="tel" placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div className="mb-3">
        <input className="form-control" type="date" onChange={e => setForm({ ...form, date: e.target.value })} />
      </div>
      <button className="btn btn-success" onClick={handleSubmit}>Confirm Booking</button>
      <p className="mt-3 text-primary">{status}</p>
    </div>
  );
};

export default BookingPage;
