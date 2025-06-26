import React from "react";
import { useNavigate } from "react-router-dom";

const TempleCard = ({ temple }) => {
  const navigate = useNavigate();

  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2">
      <div
        className="card h-100 shadow-sm"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/temple/${temple.id}`)}
      >
        <img
          src={temple.images?.[0]?.image || "https://via.placeholder.com/300x180"}
          alt={temple.name}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h6 className="card-title fw-semibold">{temple.name}</h6>
          <p className="card-text small text-muted">
            {temple.city || ""}, {temple.state || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TempleCard;
