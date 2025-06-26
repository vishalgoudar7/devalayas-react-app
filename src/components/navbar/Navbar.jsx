import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartDrawer from "../CartDrawer/CartDrawer";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <Link className="navbar-brand" to="/">Devalayas</Link>
        <div className="ms-auto d-flex align-items-center">
          <button className="btn btn-outline-light position-relative" onClick={() => setShowCart(true)}>
            <i className="bi bi-cart3 fs-5"></i>
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default Navbar;
