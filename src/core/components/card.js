import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { API } from "../../backend";
import {
  addItemToCard,
  removeItemFromCart,
  getProductCount,
  increaseProductCount,
  decreaseProductCount,
} from "../helper/cartHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [index, setIndex] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const { name, description, photo, price } = product;
  let imageUrls = [];
  photo.forEach((path) => {
    imageUrls.push(`${API}/product/photo/${product._id}?path=${path}`);
  });
  useEffect(() => {
    let interval = setInterval(() => {
      if (index < imageUrls.length - 1) setIndex(index + 1);
      else setIndex(0);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  });
  const addProductToCart = () => {
    addItemToCard(product, () => setRedirect(true));
  };
  const getRedirect = (redirect) => {
    if (redirect) return <Redirect to="/cart" />;
  };
  const modifyItemInCart = () => {
    return (
      removeFromCart && (
        <div
          className="d-flex justify-content-between"
          style={{ textAlign: "center" }}
        >
          <i
            class="far fa-trash-alt btn btn-lg btn-danger mr-1 shadow "
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
          ></i>
          <i
            class="fas fa-plus btn btn-light mx-1 shadow btn-lg"
            style={{ justifyContent: "center" }}
            onClick={() => {
              increaseProductCount(product._id);
              setReload(!reload);
            }}
          ></i>
          <input
            className="form-control col-3 bg-light mx-1 shadow justify-content-center "
            type="number"
            disabled
            value={product.count}
          ></input>
          <i
            class="fas fa-minus btn btn-light ml-1 shadow btn-lg"
            onClick={() => {
              decreaseProductCount(product._id);
              setReload(!reload);
            }}
          ></i>
        </div>
      )
    );
  };
  return (
    <div className="card bg-light rounded-lg shadow p-1 m-1 col-sm-3 product-card">
      {getRedirect(redirect)}
      <div className="card-body">
        <div
          style={{
            backgroundImage: `url(${imageUrls[index]})`,
          }}
          className="mb-1 embed-responsive embed-responsive-1by1 product-card-image"
        ></div>
        <div className="px-3">
          <h5 className="row font-weight-bold">{name}</h5>
          <p className=" row font-weight-normal text-truncate product-card-description">
            {description}
          </p>
        </div>
      </div>
      <div className="card-footer bg-light">
        <div className="col-12 btn-info btn shadow my-2">
          Price - Rs.{price}
        </div>
        {addToCart && (
          <button
            className="btn btn-success rounded shadow col my-1"
            onClick={addProductToCart}
          >
            Add to Cart
          </button>
        )}
        {modifyItemInCart()}
      </div>
    </div>
  );
};
export default Card;
