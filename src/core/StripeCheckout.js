import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { clearCart, getItemsFromCart } from "./helper/cartHelper";
const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const getFinalPrice = () => {
    let finalPrice = 0;
    if (products && products.length > 0) {
      products.map((product) => {
        finalPrice = finalPrice + product.price * product.count;
      });
    }
    return finalPrice;
  };
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Pay With Stripe </button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-success">Login to checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white  ">Stripe Checkout {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};
export default StripeCheckout;
