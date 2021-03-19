import React, { useState, useEffect, Fragment } from "react";
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
        <Fragment>
          <h3 className="ml-5 px-1 mt-3 ">{headerText}</h3>
          <div className="mx-5  product-card-container product-card-container-row">
            {productArray &&
              productArray.length !== 0 &&
              productArray.map((product) => {
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
        </Fragment>
      </section>
    );
  else return <Fragment></Fragment>;
};
export default ShowProducts;
