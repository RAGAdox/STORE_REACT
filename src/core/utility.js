import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../auth/helper";
export const getExtention = (string) => {
  return string.substring(string.lastIndexOf("."));
};
export const supportedPhotoExtensions = [
  ".jpg",
  ".png",
  ".jpeg",
  ".gif",
  ".bmp",
];
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
export const redirectTo = (history, route) => {
  if (route !== "") {
    signOut(() => {});
    setTimeout(() => {
      history.push(`/${route}`);
    }, 2000);
  }
};
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const modal = (show) => {
  return (
    <Fragment>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              {/* <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button> */}
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
