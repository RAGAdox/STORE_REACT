import React, { useEffect } from "react";
import { scrollToTop } from "./utility";
import Menu from "./Menu";
export default function Base({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div>
      <Menu />
      <div className="container-fluid ">
        <div className="jumbotron bg-dark text-white text-center main-body">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="page-footer footer bg-dark mt-auto py-3 fixed-bottom">
        <div className="container">
          <span className="text-muted">An Amazing place to buy sarees</span>
        </div>
      </footer>
    </div>
  );
}
