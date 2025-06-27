import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../redux/cartSlice";

const TempleDetails = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [poojas, setPoojas] = useState([]);
  const token = "94c4c11bfac761ba896de08bd383ca187d4e4dc4";
  const BASE_URL = "https://beta.devalayas.com/api/v1/devotee";

  const dispatch = useDispatch();

  const handleAddToCart = (puja) => {
    dispatch(
      addToCart({
        id: puja.id,
        name: puja.name,
        god: puja.god?.name || "Unknown",
        price: puja.cost,
        quantity: 1,
      })
    );
    dispatch(openCart()); // ✅ Open cart drawer
  };

  useEffect(() => {
    const fetchTemple = async () => {
      try {
        const res = await fetch(`${BASE_URL}/temple/${id}`, {
          headers: { Authorization: "Token " + token },
        });
        const data = await res.json();
        setTemple(data);
      } catch (error) {
        console.error("Temple fetch error:", error);
      }
    };

    const fetchPoojas = async () => {
      try {
        const res = await fetch(`${BASE_URL}/pooja/?temple=${id}`, {
          headers: { Authorization: "Token " + token },
        });
        const data = await res.json();
        setPoojas(data.results || []);
      } catch (error) {
        console.error("Pooja fetch error:", error);
      }
    };

    fetchTemple();
    fetchPoojas();
  }, [id]);

  useEffect(() => {
    const triggerTabList = document.querySelectorAll("#templeTabs button");
    triggerTabList.forEach((triggerEl) => {
      const tabTrigger = new bootstrap.Tab(triggerEl);
      triggerEl.addEventListener("click", (e) => {
        e.preventDefault();
        tabTrigger.show();
      });
    });
  }, []);

  if (!temple) return <div className="container mt-4">Loading temple...</div>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">{temple.name}</h2>
      <p className="text-muted">
        {temple.address}, {temple.city}, {temple.state}, {temple.pincode}
      </p>

      <div className="row g-3 mb-3">
        {(temple.images || []).map((img, idx) => (
          <div className="col-4" key={idx}>
            <img
              src={img.image}
              alt="temple"
              className="img-fluid rounded banner-img"
            />
          </div>
        ))}
      </div>

      <ul className="nav nav-tabs" id="templeTabs">
        <li className="nav-item">
          <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#about">
            About Temple
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#pooja">
            Puja / Udi / Chadava
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#services">
            e‑Services
          </button>
        </li>
      </ul>

      <div className="tab-content row">
        <div className="tab-pane fade show active" id="about">
          <div className="d-flex flex-column flex-md-row gap-4">
            <div className="description-box w-100">
              <h5>Description</h5>
              <p>{temple.details || "No description available."}</p>
            </div>

            <div className="sidebar-box w-100">
              <h5>Get Direction</h5>
              <p><strong>Taluk:</strong> {temple.taluk || "-"}</p>
              <p><strong>District:</strong> {temple.district || "-"}</p>
              <p><strong>Area:</strong> {temple.area || "-"}</p>
              <p><strong>City:</strong> {temple.city || "-"}</p>
              <p><strong>State:</strong> {temple.state || "-"}</p>
              <p><strong>Pincode:</strong> {temple.pincode || "-"}</p>
            </div>
          </div>
        </div>

        <div className="tab-pane fade col-md-8" id="pooja">
          <div className="description-box">
            <h5>Available Pujas</h5>
            <div className="row g-3">
              {poojas.length === 0 ? (
                <p className="text-muted">No Pujas found.</p>
              ) : (
                poojas.map((p) => (
                  <div className="col-md-6" key={p.id}>
                    <div className="card shadow-sm border h-100">
                      <div className="card-body">
                        <h6 className="card-title fw-bold">{p.name}</h6>
                        <p className="text-muted small">God: {p.god?.name || "Unknown"}</p>
                        <p className="text-muted small">Cost: ₹{p.cost}</p>
                        <p className="small">{p.details}</p>
                        <Link
                          to={`/pooja-details/${p.id}`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          View Details
                        </Link>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleAddToCart(p)}
                        >
                          🛒 Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="tab-pane fade col-md-8" id="services">
          <div className="description-box">
            <h5>e‑Services</h5>
            <p>Coming soon...</p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-start align-items-center mt-4">
        <Link to="/" className="btn btn-secondary">
          ← Back to Temple List
        </Link>
      </div>
    </div>
  );
};

export default TempleDetails;
