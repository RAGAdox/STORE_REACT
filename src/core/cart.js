import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./components/card";
import StripeCheckout from "./StripeCheckout";
import { getItemsFromCart, clearCart } from "./helper/cartHelper";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const loadAllProducts = () => {
    return (
      <div className="">
        <h2>Products in Cart</h2>
        {products &&
          products.map((product, key) => (
            <Card
              product={product}
              key={key}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            ></Card>
          ))}
      </div>
    );
  };
  useEffect(() => {
    setProducts(getItemsFromCart);
  }, [reload]);
  return (
    <Base title="Cart" description="Ready to Checkout" mainClassName="">
      <div className="row text-center ">
        <div className="col-md-8 d-flex bg-light">{loadAllProducts()}</div>
        <div className="col-md-4 bg-primary">
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
