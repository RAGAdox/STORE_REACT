import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../backend";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { goAdminHome, goCreateProduct, loadingBanner } from "../core/utility";
import {
  addProductPhoto,
  createCategory,
  deleteProductPhoto,
  getCategories,
  getProduct,
  updateProduct,
} from "../helper/adminapicall";
const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: [],
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
    photo,
    loading,
    error,
    updatedProduct,
    getRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getCategories()
      .then((data) => {
        if (!data || data.error) {
          setValues({ ...values, error: "Unable to get Categories" });
        } else {
          return data;
        }
      })
      .then((cate) => {
        getProduct(productId).then((data) => {
          if (data) {
            if (!data || data.error) {
              setValues({
                ...values,
                error: data.error ? data.error : "Empty Data",
              });
            } else {
              setValues({
                ...values,
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category,
                categories: cate,
                stock: data.stock,
                photo: data.photo,
                formData: new FormData(),
              });
            }
          } else {
            console.log("DATA IS EMPTY");
          }
        });
      });
  };

  useEffect(() => {
    preload(match.params.productId);
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
    setSuccess(false);
    setValues({ ...values, error: false });
    console.log("Change occured", updatedProduct);
    if (name !== "photo") {
      const value = event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data) {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              updatedProduct: data.name,
              loading: false,
            });
            setSuccess(true);
          }
        } else {
          setValues({ ...values, error: "No Data Received" });
        }
      }
    );
  };

  const removeSelectedPhoto = (path) => {
    setSuccess(false);
    setValues({
      ...values,
      loading: true,
      error: false,
      updatedProduct: undefined,
    });
    deleteProductPhoto(match.params.productId, user._id, token, path)
      .then((data) => {
        if (!data || data.error) {
          setValues({ ...values, error: data.error || "No Data Received" });
        } else {
          setValues({ ...values, photo: data.photo, loading: false });
          setSuccess(true);
        }
      })
      .catch((err) => {
        return console.log(err);
      });
  };
  const addPhoto = (event) => {
    setSuccess(false);
    setValues({
      ...values,
      error: false,
      updatedProduct: undefined,
      loading: true,
    });
    let photoForm = new FormData();
    photoForm.set("photo", event.target.files[0]);
    addProductPhoto(match.params.productId, user._id, token, photoForm)
      .then((data) => {
        if (!data || data.error) {
          setValues({
            ...values,
            error: data.error,
            updateProduct: undefined,
          });
        } else {
          setValues({
            ...values,
            photo: data.photo,
            updatedProduct: data.name,
            loading: false,
          });
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showPhotos = () =>
    photo.map((path, index) => {
      return (
        <div key={index} className="align-self-center card-img close-div m-1">
          <span
            className="close bg-white rounded btn"
            onClick={() => removeSelectedPhoto(path)}
          >
            &times;
          </span>
          <img
            className="img-thumbnail m-1 img-fluid"
            src={`${API}/product/photo/${match.params.productId}?path=${path}`}
          />
        </div>
      );
    });
  const successMessage = () =>
    success && (
      <h4 className="text-success">
        Product {updatedProduct} was updated successfully
      </h4>
    );

  const warningMessage = () =>
    error && <h4 className="text-warning">Unable to update product</h4>;

  const updateProductForm = () => {
    return (
      <form>
        <div className="form-group row d-flex align-middle ">
          <input type="file" id="actual-btn" hidden onChange={addPhoto} />
          <label
            className="align-self-center actual-btn-upload m-1 btn btn-primary align-middle img-thumbnail m-1 img-fluid"
            htmlFor="actual-btn"
          >
            {"File Upload"}
          </label>
          {showPhotos()}
        </div>
        <div className="form-group row">
          <label className="col-md-2 col-form-label">Name</label>
          <input
            className="col-md-9 form-control mx-1"
            onChange={handleChange("name")}
            name="name"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group row">
          <label className="col-md-2 col-form-label">Description</label>
          <textarea
            onChange={handleChange("description")}
            name="description"
            className="col-md-9 form-control mx-1"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group row">
          <label className="col-md-2 col-form-label">Price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="col-md-9 form-control mx-1"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group row">
          <label className="col-md-2 col-form-label">Category</label>
          <select
            onChange={handleChange("category")}
            className="form-control mx-1 col-md-9"
            placeholder="Category"
            value={category}
          >
            <option>Select</option>
            {showCategoryOptions()}
          </select>
        </div>
        <div className="form-group row">
          <label className="col-md-2 col-form-label">Stock</label>
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control mx-1 col-md-9"
            placeholder="Quantity"
            value={stock}
          />
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success"
        >
          Update Product
        </button>
      </form>
    );
  };
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
            {updateProductForm()}
          </div>
          {formData}
        </div>
      </Base>
    </Fragment>
  );
};
export default UpdateProduct;
