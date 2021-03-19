import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { goAdminHome, loadingBanner, redirectTo } from "../core/utility";
import {
  createCategory,
  getCategories,
  createProduct,
} from "../helper/adminapicall";
const AddProduct = ({ history }) => {
  const { user, token } = isAuthenticated();
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState("");
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
  const [fileList, setFileList] = useState([]);
  const [fileValidationError, setFileValidationError] = useState(false);
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
    setValues({ ...values, error: false });
    setSuccess(false);
    if (name !== "photo") {
      const value = event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    } else {
      formData.delete(name);
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      for (let i = 0; i < event.target.files.length; i++) {
        const imageFile = event.target.files[i];
        console.log("File Type", imageFile.type);
        if (imageFile.type === "image/jpeg" || imageFile.type === "image/png") {
          imageCompression(imageFile, options).then((compressedFile) => {
            console.log(
              "File Name",
              compressedFile.name,
              compressedFile.size / (1024 * 1024)
            );
            formData.append(name, compressedFile);
            setValues({ ...values, [name]: compressedFile });
          });
        } else {
          setFileValidationError({
            error: "Only Images are supported as of now ",
          });
        }
        setFileList((fileList) => [...fileList, imageFile.name]);
      }
    }
    console.log(error);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data) {
        if (data.error) {
          setValues({ ...values, error: data.error });
          data.redirect ? setRedirect(data.redirect) : setRedirect("");
        } else {
          console.log("Photo Field after success", formData.get("photo").name);
          formData.delete("photo");
          setFileList([]);
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
            error: false,
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
  const fileValidationWarnings = () =>
    fileValidationError && (
      <h4 className="text-warning">{fileValidationError.error}</h4>
    );

  const addProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success rounded">
          <input
            onChange={handleChange("photo")}
            onClick={() => {
              setFileValidationError(false);
              setFileList([]);
            }}
            style={{ display: "none" }}
            type="file"
            name="photo"
            accept="image/*"
            // value={formData.get("photo") ? "" : ""}
            placeholder="choose a file"
            multiple
          />
          {fileList.length == 0 && (
            <p className="py-1 my-1 lead">Upload Image</p>
          )}
          <div className="">
            {fileList.map((file, key) => {
              return (
                <p className="p-1 m-1 border rounded row" key={key}>
                  {file}
                </p>
              );
            })}
          </div>
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
      {redirectTo(history, redirect)}
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
            {fileValidationWarnings()}
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
