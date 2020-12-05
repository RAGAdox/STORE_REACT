import React, { Fragment, useEffect, useState } from "react";
import Base from "../core/Base";
import { goAdminHome, loadingBanner } from "../core/utility";
import { getProducts } from "./helper/adminapicall";
const ManageProduct = () => {
  const [productArray, setProductArray] = useState([]);
  const [error, setError] = useState(false);
  const loadProducts = () => {
    getProducts().then((data) => {
      if (data) {
        if (!data.error)
          setProductArray((productArray) => [...productArray, data]);
        else setError(data.error);
      }
    });
  };

  return (
    <Fragment>
      {false && loadingBanner()}
      <Base
        title="Manage Products"
        description="Manage Products Here"
        className="container bg-info p-4"
      >
        <div className="row">{goAdminHome()}</div>
        <div className="row bg-white rounded p-1">
          <div className="col-md-8 offset-md-2 py-4">
            <div className="row border border-success rounded d-flex justify-content-between py-1 pr-1 mb-1">
              <div className="col-md-6 d-flex align-items-center">RISHI</div>
              <div className=" btn btn-warning rounded">Update</div>
              <div className=" btn btn-danger rounded">Delete</div>
            </div>
            <div className="row border border-success rounded d-flex justify-content-between py-1 pr-1 mb-1">
              <div className="col-md-6 d-flex align-items-center">RISHI</div>
              <div className=" btn btn-warning rounded">Update</div>
              <div className=" btn btn-danger rounded">Delete</div>
            </div>
            <div className="row border border-success rounded d-flex justify-content-between py-1 pr-1 mb-1">
              <div className="col-md-6 d-flex align-items-center">RISHI</div>
              <div className=" btn btn-warning rounded">Update</div>
              <div className=" btn btn-danger rounded">Delete</div>
            </div>
            <div className="row border border-success rounded d-flex justify-content-between py-1 pr-1 mb-1">
              <div className="col-md-6 d-flex align-items-center">RISHI</div>
              <div className=" btn btn-warning rounded">Update</div>
              <div className=" btn btn-danger rounded">Delete</div>
            </div>
          </div>
        </div>
      </Base>
    </Fragment>
  );
};
export default ManageProduct;
