import React, { useEffect, useState } from "react";
import Base from "./Base";
import NewCard from "./components/newCard";
import Card from "./components/card";
import StripeCheckout from "./StripeCheckout";
import { getItemsFromCart, clearCart } from "./helper/cartHelper";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const loadAllProducts = () => {
    return (
      <div className=" p-2 ">
        <h2 className="">Products in Cart</h2>
        <div className="justify-content-between align-items-center product-card-container product-card-container-col">
          {products &&
            products.map((product, key) => (
              <NewCard
                stackOrientation="col"
                product={product}
                key={key}
                addToCart={false}
                removeFromCart={true}
                setReload={setReload}
                reload={reload}
              ></NewCard>
            ))}
        </div>
      </div>
    );
  };
  useEffect(() => {
    setProducts(getItemsFromCart);
  }, [reload]);
  return (
    <Base
      title="Cart"
      className="bg-light rounded-lg p-3 shadow-lg"
      description="Ready to Checkout"
      mainClassName=""
    >
      <div className="row text-center ">
        <div className="col-md-8  ">{loadAllProducts()}</div>
        <div className="col-md-4 ">
          {console.log("products in cart ", products)}
          <StripeCheckout
            products={products}
            setReload={setReload}
            reload={reload}
          />
        </div>
      </div>
    </Base>
  );
};
export default Cart;
