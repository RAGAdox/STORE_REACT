import React, { useState } from "react";
import { isAuthenticated, signOut } from "../auth/helper";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";
import { redirectTo, modal } from "../core/utility";
const AddCategory = ({ history }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState("");
  const { user, token } = isAuthenticated();
  const handleChange = (event) => {
    setError(false);
    setSuccess(false);
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (!data || data.error) {
        setError(true);
        data.redirect ? setRedirect(data.redirect) : setRedirect("");
      } else {
        setError(false);
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () =>
    success && (
      <h4 className="text-success">{`Category created successfully`}</h4>
    );
  const warningMessage = () =>
    error && <h4 className="text-warning">Unable to create category</h4>;
  const goBack = () => (
    <div className="col">
      <Link className="btn btn-sm btn-success" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );
  const addCategoryForm = () => {
    return (
      <form>
        <div className="from-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            autoFocus
            required
            placeholder="For eg. Summer Collecttion"
            onChange={handleChange}
            value={name}
            name=""
            id=""
            className="form-control my-3"
          />
          <button className="btn btn-outline-info" onClick={onSubmit}>
            Create Category
          </button>
        </div>
      </form>
    );
  };
  return (
    <Base
      title="Create a new Category"
      description="Add new categories for Saree"
      className="container bg-info p-4"
    >
      {/* {redirect && modal(true)} */}
      {redirectTo(history, redirect)}
      <div className="row">{goBack()}</div>
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2 py-4">
          {successMessage()}
          {warningMessage()}
          {addCategoryForm()}
        </div>
      </div>
    </Base>
  );
};
export default AddCategory;
