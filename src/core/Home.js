import React, { useState, useEffect, Fragment } from "react";
import Menu from "./Menu";
import { API } from "../backend";
import {
  getExtention,
  supportedPhotoExtensions,
  manageMargins,
  scrollSectionById,
} from "../core/utility";
import "../styles.css";
import Base from "./Base";
import Card from "./components/card";
import NewCard from "./components/newCard";
import ShowProducts from "./components/showProducts";
import Banner from "./components/banner";
import { title, description, description_l2, description_l1 } from "../bangla";
import { getProducts } from "../helper/apicall";
export default function Home() {
  const [productArray, setProductArray] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadProducts = () => {
    setLoading(true);
    getProducts({ limit: 10, sortBy: "sold", sortOrder: "asc" }).then(
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
      className="paralax-background d-flex flex-column"
    >
      <Menu></Menu>
      <section className="home-container row " id="home-section-1">
        <div className="  flex-column  mx-5 align-self-center">
          <h1 className="text-white  bng-shadow display-4">{title}</h1>
          <h3 className="text-white  ">{description_l1}</h3>
          <h3 className="text-white ">{description_l2}</h3>
        </div>

        <div className="col-md-6   mt-auto flex-column ml-auto">
          <Banner
            header="Big Festival Sale"
            body="Flat 20% discount on purchases more than Rs.10,000"
            index={0}
          ></Banner>
          <Banner
            header="Big Festival Sale"
            body="Flat 20% discount on purchases more than Rs.10,000"
            index={1}
          ></Banner>
          <Banner
            header="Big Festival Sale"
            body="Flat 20% discount on purchases more than Rs.10,000"
            index={2}
          ></Banner>
        </div>
      </section>

      <ShowProducts
        headerText="Latest Products"
        limit={8}
        sortBy="createdAt"
        sortOrder="desc"
        id="Latest-Products"
      />

      <ShowProducts
        headerText="Most Sold Items"
        limit={8}
        sortBy="sold"
        sortOrder="desc"
        id="Most-Sold-Items"
      />
    </div>
  );
}
