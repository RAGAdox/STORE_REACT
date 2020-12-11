import React, { Fragment } from "react";
import { Link } from "react-router-dom";
export const scrollToTop = () => {
  window.scrollTo(0, 0);
};
export const loadingBanner = () => (
  <div className="loading">
    <div className="uil-ring-css">
      <div></div>
    </div>
  </div>
);
export const goAdminHome = () => (
  <div className="col">
    <Link className="btn btn-sm btn-success" to="/admin/dashboard">
      Admin Home
    </Link>
  </div>
);

export const shrinkText = (text, className) => {};
