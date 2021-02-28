import React from "react";
const Banner = ({
  header = "Please Provide a header",
  body = "Please provide a body",
}) => (
  <div className="bg-light rounded-lg home-cards ml-5 d-flex card shadow-lg align-self-end">
    <div className="card-header bg-light">
      <h3>{header}</h3>
    </div>
    <div className="card-body">{body}</div>
  </div>
);
export default Banner;
