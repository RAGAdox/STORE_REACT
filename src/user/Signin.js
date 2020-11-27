import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import { signIn, authenticate, isAuthenticated } from "../auth/helper";
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handelChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info col-md-6 offset-sm-3 text-center">
          <i className="fas fa-truck-loading    "></i>
          loading ...
        </div>
      )
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
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>Redirect to admin</p>;
      } else {
        return <p>Redirect to user</p>;
      }
    }
    if (isAuthenticated()) {
      //return <Redirect to="/" />;
      console.log(isAuthenticated());
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signIn({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              loading: false,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Sign in failed"));
  };
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={handelChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="text"
                value={password}
                onChange={handelChange("password")}
              />
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>
              Submit
            </button>
          </form>
          <p className="text-white text-center">{JSON.stringify(values)}</p>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign up page" description="A page for user signup">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};
export default Signin;