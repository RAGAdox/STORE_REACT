import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { goAdminHome, loadingBanner } from "../core/utility";
import {
  createCategory,
  getCategories,
  createProduct,
} from "./helper/adminapicall";
const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: new FormData(),
  });
  const {
    name,
    description,
    stock,
    price,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    //setValues({ ...values, formData: new FormData() });
    getCategories().then((data) => {
      if (data) {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            categories: data,
          });
        }
      } else {
        console.log("DATA IS EMPTY");
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const showCategoryOptions = () =>
    categories.map((cate, index) => {
      return (
        <option key={index} value={cate._id}>
          {cate.name}
        </option>
      );
    });

  const handleChange = (name) => (event) => {
    console.log("Change captured");
    //setValues({ ...values, error: false, [name]: event.target.value });
    setValues({ ...values, error: false });
    setSuccess(false);
    if (name !== "photo") {
      const value = event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    } else {
      console.log("File added");

      for (let i = 0; i < event.target.files.length; i++) {
        const value = event.target.files[i];
        //formData.set(name, value);
        formData.append(name, value);

        //console.log("FILE;-", value);
        //console.log("FORM DATA", formData);
        setValues({ ...values, [name]: value });
      }
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data) {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          formData.delete("photo");
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: [],
            category: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      } else {
        setValues({ ...values, error: "No Data Received" });
      }
    });
  };

  const successMessage = () =>
    createdProduct && (
      <h4 className="text-success">Product created successfully</h4>
    );

  const warningMessage = () =>
    error && (
      <h4 className="text-warning">Unable to create product {`\n ${error}`}</h4>
    );

  const addProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            multiple
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {showCategoryOptions()}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );
  return (
    <Fragment>
      {loading && loadingBanner()}
      <Base
        title="Create a new product"
        description="Welcome to product creation section"
        className="container bg-info p-4"
      >
        <div className="row">{goAdminHome()}</div>
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2 py-4">
            {successMessage()}
            {warningMessage()}
            {addProductForm()}
          </div>
          {formData}
        </div>
      </Base>
    </Fragment>
  );
};
export default AddProduct;
