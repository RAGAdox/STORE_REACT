import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { clearCart, getItemsFromCart } from "./helper/cartHelper";
import ReactStripeCheckout from "react-stripe-checkout"; 
import { API } from "../backend";
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
  const makePayment=(token)=>{
    //
    const body={
      token,
      products
    }
    const headers={
      "Content-Type":"application/json"
    }
    return fetch(`${API}/stripepayment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(response=>{
      //console.log(response)
      const {status}=response;
      
      //Create Order
      //Clear Cart
      clearCart(()=>setReload(true));
    }).catch(err=>{
      console.log(err)
    })
  }
  const showStripeButton = () => {
    console.log("Public Key",`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`)
    return isAuthenticated() ? (
      <ReactStripeCheckout
        stripeKey={`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`}
        token={makePayment}
        amount={getFinalPrice()*100}
        currency="INR"
        name="Pay with Stripe"
        
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay With Stripe </button></ReactStripeCheckout>
    ) : (
      <Link to="/signin">
        <button className="btn btn-success">Login to checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="">Stripe Checkout {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};
export default StripeCheckout;
