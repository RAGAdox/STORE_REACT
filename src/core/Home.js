import React, { useState, useEffect } from "react";
import { API } from "../backend";
import { getExtention, supportedPhotoExtensions } from "../core/utility";
import "../styles.css";
import Base from "./Base";
import Card from "./components/card";
import { title, description } from "../bangla";
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
    loadProducts();
  }, []);
  return (
    <Base title={title} description={description}>
      <h3 className="mx-1">Latest Arrivals </h3>
      <div style={{ display: "flex", overflowX: "scroll" }}>
        {productArray &&
          productArray.length !== 0 &&
          productArray.map((product) => {
            let imageSrcArray = [];
            product.photo.forEach((path) => {
              if (supportedPhotoExtensions.includes(getExtention(path)))
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
  );
}
