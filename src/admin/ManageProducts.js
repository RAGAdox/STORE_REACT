import React, { Fragment, useEffect, useState, useRef } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { goAdminHome, loadingBanner } from "../core/utility";
import {
  deleteProduct,
  getProductCount,
  getProducts,
} from "./helper/adminapicall";
import { Link } from "react-router-dom";
const ManageProduct = () => {
  let [count, setCount] = useState(0);
  let [productArray, setProductArray] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();
  const loadProducts = (limit, skip) => {
    setLoading(true);
    getProducts(limit, skip).then((data) => {
      if (data) {
        if (!data.error) {
          setProductArray((productArray) => productArray.concat(data));
          setLoading(false);
        } else setError(data.error);
      }
    });
  };
  useEffect(() => {
    getProductCount().then((data) => {
      setCount(data.count);
    });
    loadProducts(2, undefined);
  }, []);
  const deleteCurrentProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (!data || data.error) {
        setError(true);
      } else {
        setProductArray([]);
        loadProducts(productArray.length, undefined);
        getProductCount().then((data) => {
          setCount(data.count);
        });
      }
    });
  };
  const showProduct = (product) => {
    return (
      <div
        className="row d-flex justify-content-between mb-2"
        key={product._id}
      >
        <div className="card w-100 bg-success text-white">
          <h5 className="card-header">{product.name}</h5>
          <div className="card-body">
            <div className="row d-flex align-items-center justify-content-center">
              <img
                className="card-img col-md-3"
                src={`${API}/product/photo/${product._id}?path=${product.photo[0]}`}
                alt="Card image cap"
              />
              <div className="col-md-9">
                <p className="card-text  text-compress">
                  {product.description}
                  <br />
                </p>
                <span className="m-1 badge badge-pill badge-primary">
                  Price :- {product.price}
                </span>
                <span className="m-1 badge badge-pill badge-primary">
                  In stock :- {product.stock}
                </span>
                <span className="m-1 badge badge-pill badge-primary">
                  Sold :- {product.sold}
                </span>
              </div>
            </div>
          </div>

          <div className="card-footer text-muted d-flex justify-content-between">
            <Link
              className="btn btn-warning rounded m-1"
              to={`/admin/product/update/${product._id}`}
            >
              Update
            </Link>
            <div
              className=" btn btn-danger rounded m-1"
              onClick={() => {
                deleteCurrentProduct(product._id);
              }}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      {loading && loadingBanner()}
      <Base
        title="Manage Products"
        description="Manage Products Here"
        className="container bg-info p-4"
      >
        <div className="row">{goAdminHome()}</div>
        <div className="row bg-white rounded p-1">
          <div id="products" className="col-md-10 offset-md-1 py-4">
            {productArray &&
              productArray.length !== 0 &&
              productArray.map((product) => {
                return showProduct(product);
              })}
            {productArray.length < count ? (
              <div className="row d-flex justify-content-center p-1">
                <button
                  className="btn btn-primary rounded"
                  onClick={() => {
                    loadProducts(4, productArray.length);
                  }}
                >
                  Load More Products...
                </button>
              </div>
            ) : (
              <Fragment />
            )}
          </div>
        </div>
      </Base>
    </Fragment>
  );
};
export default ManageProduct;
