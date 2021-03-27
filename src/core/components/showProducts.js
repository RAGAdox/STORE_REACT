import React, { useState, useEffect, Fragment, useRef, createRef } from "react";
import { getProducts } from "../../helper/apicall";
import NewCard from "./newCard";
const ShowProducts = ({
  headerText = "Latest Arrivals ",
  limit = 10,
  skip = 0,
  sortBy = undefined,
  sortOrder = "asc",
  category = undefined,
  minPrice = undefined,
  maxPrice = undefined,
}) => {
  const container = createRef();
  const [productArray, setProductArray] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadProducts = () => {
    setLoading(true);
    getProducts({ limit: limit, sortBy: sortBy, sortOrder: sortOrder }).then(
      (data) => {
        if (data) {
          if (!data.error) {
            setProductArray((productArray) => productArray.concat(data));
            setLoading(false);
          } else setError(data.error);
        }
      }
    );
  };
  useEffect(() => {
    loadProducts();
  }, []);
  if (productArray && productArray.length !== 0)
    return (
      <section className="home-container">
        <div
          className="card m-md-5 m-3 shadow-lg pb-5 card-quality "
          // style={{ width: `${30 * productArray.length}` }}
        >
          <h3 className="ml-5 px-1 mt-3 ">{headerText}</h3>
          <div className="mx-5  product-card-container product-card-container-row">
            {productArray &&
              productArray.length !== 0 &&
              productArray.map((product, i) => {
                return (
                  <NewCard
                    stackOrientation="row"
                    key={product._id}
                    product={product}
                    addToCart={true}
                    removeFromCart={false}
                  ></NewCard>
                );
              })}
          </div>
        </div>
      </section>
    );
  else return <Fragment></Fragment>;
};
export default ShowProducts;
