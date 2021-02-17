import React, { useEffect } from "react";
import { scrollToTop } from "./utility";
import Menu from "./Menu";
export default function Base({
  title = "My Title",
  description = "My description",
  className = "p-4",
  children,
}) {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div>
      <Menu />
      <div className="container-fluid main-body-scroll shadow rounded col-md-8 bg-light">
        <div className="jumbotron text-center main-body">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="page-footer footer  mt-auto py-3 fixed-bottom">
        <div className="container">
          <span className="text-muted">An Amazing place to buy sarees</span>
        </div>
      </footer>
    </div>
  );
}
