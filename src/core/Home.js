import React, { useState, useEffect, Fragment } from "react";
import { API } from "../backend";
import {
  getExtention,
  supportedPhotoExtensions,
  manageMargins,
} from "../core/utility";
import "../styles.css";
import Base from "./Base";
import Card from "./components/card";
import Banner from "./components/banner";
import { title, description, description_l2, description_l1 } from "../bangla";
import { getProducts } from "../helper/apicall";
export default function Home() {
  const [productArray, setProductArray] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadProducts = () => {
    setLoading(true);
    getProducts({ limit: 10, sortBy: "createdAt", sortOrder: "desc" }).then(
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
    manageMargins();
    loadProducts();
  }, []);
  return (
    <div
      style={{ backgroundImage: "url(/undraw.svg)" }}
      className="paralax-background"
    >
      <section className="home-container row d-flex " id="home-section-1">
        <div className="col-md-10 d-flex flex-column  mx-5 align-self-center">
          <h1 className="text-white  bng-shadow display-4">{title}</h1>
          <h3 className="text-white  ">{description_l1}</h3>
          <h3 className="text-white ">{description_l2}</h3>
        </div>

        <div className="row  d-flex m-1 align-items-end">
          <Banner
            header="Big Festival Sale"
            body="Flat 20% discount on purchases more than Rs.10,000"
          ></Banner>
        </div>
      </section>
      <section className="home-container row w-100 ">
        <Base
          title={title}
          description={description}
          displayFooter={false}
          displayTitleDescription={false}
        >
          <h3 className="mx-1">Latest Arrivals </h3>
          <div style={{ display: "flex", overflowX: "scroll" }}>
            {productArray &&
              productArray.length !== 0 &&
              productArray.map((product) => {
                let imageSrcArray = [];
                product.photo.forEach((path) => {
                  //if (supportedPhotoExtensions.includes(getExtention(path)))
                  imageSrcArray.push(
                    `${API}/product/photo/${product._id}?path=${path}`
                  );
                });
                return (
                  <Card
                    key={product._id}
                    name={product.name}
                    description={product.description}
                    imageUrls={imageSrcArray}
                    price={product.price}
                    addedToCart={false}
                  ></Card>
                );
              })}
          </div>
        </Base>
      </section>
    </div>
  );
}
