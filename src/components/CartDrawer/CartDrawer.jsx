// src/components/CartDrawer/CartDrawer.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} from "../../redux/cartSlice";
import "./CartDrawer.css";
import CheckoutModal from "../CheckoutModal/CheckoutModal";

const CartDrawer = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const platformFee = 10;
  const shipping = 15;
  const taxAmount = (subTotal + platformFee + shipping) * 0.18;
  const grandTotal = subTotal + platformFee + shipping + taxAmount;

  return (
    <>
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header d-flex justify-content-between align-items-center">
          <h5>Your Cart</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="text-muted">Cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="border p-2 rounded mb-2">
                <h6 className="mb-1">{item.name}</h6>
                <p className="mb-1 text-muted">God: {item.god}</p>
                <p className="mb-1 text-muted">Price: ₹{item.price}</p>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => dispatch(decrementQty(item.id))}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => dispatch(incrementQty(item.id))}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-2 border-top">
            <p>Subtotal: ₹{subTotal.toFixed(2)}</p>
            <p>Platform Fee: ₹{platformFee.toFixed(2)}</p>
            <p>Shipping: ₹{shipping.toFixed(2)}</p>
            <p>Tax (18%): ₹{taxAmount.toFixed(2)}</p>
            <h6>Total: ₹{grandTotal.toFixed(2)}</h6>
          </div>
        )}

        <div className="cart-footer d-flex justify-content-between">
          <button className="btn btn-danger" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
          <button className="btn btn-primary" onClick={() => setShowCheckout(true)}>
            Checkout
          </button>
        </div>
      </div>

      <CheckoutModal
        show={showCheckout}
        onClose={() => setShowCheckout(false)}
        subTotal={subTotal}
        platformFee={platformFee}
        shipping={shipping}
        taxAmount={taxAmount}
        grandTotal={grandTotal}
      />
    </>
  );
};

export default CartDrawer;
