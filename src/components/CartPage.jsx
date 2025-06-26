import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mt-4">
      <h4>Your Cart</h4>
      {cart.length === 0 ? (
        <p>No poojas added.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name} – ₹{item.price}
                <button className="btn btn-sm btn-danger" onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h6 className="mt-3">Total: ₹{total}</h6>
          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-secondary" onClick={() => dispatch(clearCart())}>Clear Cart</button>
            <button className="btn btn-primary" onClick={() => navigate("/booking")}>Proceed to Book</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
