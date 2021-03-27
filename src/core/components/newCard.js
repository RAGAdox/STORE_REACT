import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { prominent, average } from "color.js";
import { API } from "../../backend";
import {
  addItemToCard,
  removeItemFromCart,
  getProductCount,
  increaseProductCount,
  decreaseProductCount,
} from "../helper/cartHelper";

const NewCard = ({
  stackOrientation = "row",
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [index, setIndex] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [bgColor, setBgColor] = useState([]);
  const { name, description, photo, price } = product;
  let imageUrls = [];
  photo.forEach((path) => {
    imageUrls.push(`${API}/product/photo/${product._id}?path=${path}`);
  });
  const setBackground = async () => {
    await imageUrls.forEach((url, i) => {
      average(url).then((color) => {
        if (color && color.length == 3) {
          setBgColor((bgColor) =>
            bgColor.concat("rgb(" + color.join(",") + ")")
          );
        }
      });
    });
  };
  useEffect(() => {
    setBackground();
    const interval = setInterval(() => {
      setIndex((index) => {
        return index < imageUrls.length - 1 ? index + 1 : 0;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const addProductToCart = () => {
    addItemToCard(product, () => setRedirect(true));
  };
  const getRedirect = (redirect) => {
    if (redirect) return <Redirect to="/cart" />;
  };
  const addItemToCart = () =>
    addToCart && (
      <button
        className="btn btn-success btn-block rounded shadow col my-1"
        onClick={addProductToCart}
        disabled={product.stock > 0 ? false : true}
      >
        Add to Cart
      </button>
    );

  const modifyItemInCart = () => {
    return (
      removeFromCart && (
        <div className="justify-content-between row m-1">
          <i
            class="far fa-trash-alt btn  btn-danger  shadow "
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
          ></i>
          <i
            class="fas fa-plus btn btn-light  shadow"
            style={{ justifyContent: "center" }}
            onClick={() => {
              increaseProductCount(product._id);
              setReload(!reload);
            }}
          ></i>
          {/* <input
            className="form-control col-3 bg-light mx-md-1 shadow justify-content-center "
            type="number"
            disabled
            value={product.count}
          ></input> */}
          <span className="product-card-count-cart mx-1">{product.count}</span>
          <i
            class="fas fa-minus btn btn-light shadow "
            onClick={() => {
              decreaseProductCount(product._id);
              setReload(!reload);
            }}
          ></i>
        </div>
      )
    );
  };
  const showImages = () =>
    imageUrls &&
    imageUrls.map((url, i) => (
      <div
        key={i}
        style={{
          backgroundImage: `url(${url})`,
          display: `${i === index ? "block" : "none"}`,
        }}
        className="mb-1  embed-responsive  embed-responsive-1by1 product-card-image"
      ></div>
    ));

  return (
    <div
      className={`card rounded-lg m-1 p-1 text-center   text-white ${
        stackOrientation == "row" ? " col-2 product-card " : "col-8 "
      }`}
      style={{ background: bgColor[index] }}
    >
      <div className="product-card-body ">
        {showImages()}
        {/* <div
          style={{
            backgroundImage: `url(${imageUrls[index]})`,
          }}
          className="mb-1  embed-responsive  embed-responsive-1by1 product-card-image"
        ></div> */}
        <p className="h5 text-truncate">{product.name}</p>
        <p className="h6 text-truncate">{product.description}</p>
        <p className="h5">Rs. {product.price}</p>
      </div>
      {addItemToCart()}
      {modifyItemInCart()}
    </div>
  );
};
export default NewCard;
