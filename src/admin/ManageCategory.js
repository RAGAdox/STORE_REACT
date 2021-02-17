import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getCategories, getProductByCategory } from "../helper/adminapicall";
import { goAdminHome, loadingBanner } from "../core/utility";

const ManageCategory = () => {
  let [categoriesArray, setCategoriesArray] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadCategories = () => {
    setLoading(true);
    getCategories().then((data) => {
      if (data) {
        if (!data.error) {
          setCategoriesArray((categoriesArray) => categoriesArray.concat(data));
          setLoading(false);
        } else setError(data.error);
      }
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const deleteCategory = (categoryId) => {};
  const showCategory = (category) => {
    return (
      <div className="row m-1" key={category._id}>
        <div className="card w-100 bg-success text-white">
          <div className="card-header">
            <h5>{category.name}</h5>
          </div>
          <div className="card-footer text-muted d-flex justify-content-between">
            <Link
              className="btn btn-warning rounded m-1"
              to={`/admin/category/update/${category._id}`}
            >
              Update
            </Link>
            <div className="btn btn-danger rounded m-1">Delete</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      {loading && loadingBanner()}
      <Base
        title="Manage Category"
        description="Manage Categories here"
        className="container bg-info p-4"
      >
        <div className="row">{goAdminHome()}</div>
        <div className="container rounded p-1 bg-white">
          {categoriesArray &&
            categoriesArray.length !== 0 &&
            categoriesArray.map((category) => {
              return showCategory(category);
            })}
        </div>
      </Base>
    </Fragment>
  );
};
export default ManageCategory;
