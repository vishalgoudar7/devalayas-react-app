import React from "react";
import "./CartDrawer.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, incrementQty, decrementQty } from "../../redux/cartSlice";

const CartDrawer = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.cost || 0), 0);

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="m-0">Cart</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>
      <div className="cart-body p-3">
        {cartItems.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="d-flex justify-content-between align-items-start mb-3 border-bottom pb-2">
              <div>
                <h6>{item.name}</h6>
                <p className="text-muted small">God: {item.god}</p>
                <p>₹{item.cost}</p>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-footer p-3 border-top">
          <h6>Total: ₹{total.toFixed(2)}</h6>
          <button className="btn btn-primary w-100 mt-2">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
