import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { signUp } from "../auth/helper";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;
  const handelChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            password: "",
            email: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => {
        console.log("Error in Signup ");
      });
  };
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handelChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handelChange("email")}
                type="text"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handelChange("password")}
                type="text"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div
        className="alert alert-success col-md-6 offset-sm-3 text-center"
        style={{ display: success ? "" : "none" }}
      >
        <p>New Account was created successfully</p>
        <p>
          Please<Link to="/signin"> Sign In</Link>
        </p>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger col-md-6 offset-sm-3 text-center "
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  return (
    <Base title="Sign up page" description="A page for user signup">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};
export default Signup;
