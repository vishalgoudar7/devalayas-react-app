// src/components/CheckoutModal/CheckoutModal.jsx
import React from "react";
import "./CheckoutModal.css";

const CheckoutModal = ({ show, onClose, subTotal, platformFee, shipping, taxAmount, grandTotal }) => {
  if (!show) return null;

  return (
    <div className="checkout-modal-backdrop">
      <div className="checkout-modal">
        <div className="checkout-modal-header d-flex justify-content-between align-items-center">
          <h5>Address & Payment</h5>
          <button className="btn btn-sm btn-danger" onClick={onClose}>✖</button>
        </div>

        <div className="checkout-modal-body row">
          <div className="col-md-6">
            <h6>Enter Address</h6>
            <form>
              <input type="text" className="form-control mb-2" placeholder="Name" />
              <input type="text" className="form-control mb-2" placeholder="Mobile" />
              <textarea className="form-control mb-2" placeholder="Address"></textarea>
              <input type="text" className="form-control mb-2" placeholder="City" />
              <input type="text" className="form-control mb-2" placeholder="Pincode" />
            </form>
          </div>

          <div className="col-md-6">
            <h6>Payment Summary</h6>
            <ul className="list-unstyled">
              <li>Subtotal: ₹{subTotal.toFixed(2)}</li>
              <li>Platform Fee: ₹{platformFee.toFixed(2)}</li>
              <li>Shipping: ₹{shipping.toFixed(2)}</li>
              <li>Tax (18%): ₹{taxAmount.toFixed(2)}</li>
              <hr />
              <li><strong>Total: ₹{grandTotal.toFixed(2)}</strong></li>
            </ul>
            <button className="btn btn-success w-100 mt-3">Proceed to Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
