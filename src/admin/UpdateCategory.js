import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { goAdminHome, loadingBanner } from "../core/utility";
import { getCategoryById, updateCategory } from "./helper/adminapicall";
const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [category, setCategory] = useState({
    _id: match.params.categoryId,
    name: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    getCategoryById(match.params.categoryId).then((data) => {
      setCategory(data);
    });
  }, []);
  const handleChange = (name) => (event) => {
    setSuccess(false);
    setCategory({ ...category, name: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    setError(false);
    updateCategory(category._id, token, user._id, category)
      .then((data) => {
        if (data) {
          setSuccess(true);
          setError(false);
          setCategory(data);
        }
      })
      .catch((err) => {
        setSuccess(false);
        setError(true);
      });
  };
  const successMessage = () =>
    success && (
      <h4 className="text-success">
        Category {category.name} was updated successfully
      </h4>
    );
  const warningMessage = () =>
    error && <h4 className="text-warning">Unable to update category</h4>;
  return (
    <Base
      title="Update Category"
      description="update category here"
      className="container bg-info p-4"
    >
      <div className="row">{goAdminHome()}</div>
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2 py-4">
          {successMessage()}
          {warningMessage()}
        </div>
        <div className="col-md-8 offset-md-2 py-4">
          <input
            className="form-control"
            type="text"
            value={category.name}
            name="name"
            placeholder="Category Name"
            onChange={handleChange("name")}
          ></input>
          <button
            className="btn btn-outline-success mt-1"
            type="submit"
            onClick={onSubmit}
          >
            Update Category
          </button>
        </div>
      </div>
    </Base>
  );
};
export default UpdateCategory;
