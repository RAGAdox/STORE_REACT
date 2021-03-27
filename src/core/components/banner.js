import React, { useState } from "react";
const Banner = ({
  header = "Please Provide a header",
  body = "Please provide a body",
  index = 0,
}) => {
  const [display, setDisplay] = useState("flex");
  const hideBanner = () => {
    setDisplay("none");
  };
  return (
    <div
      className="home-cards my-1  card shadow-lg  card-quality notification"
      style={{
        display: `${display}`,
        WebkitAnimation: `notify-fadeIn 1s ease-in-out ${
          2 + index / 10
        }s 1 forwards,
    notify-fadeOut 2s ease-out ${8 + index / 2}s 1 forwards`,
        animation: `notify-fadeIn 1s ease-in-out ${2 + index / 10}s 1 forwards,
    notify-fadeOut 2s ease-out ${8 + index / 2}s 1 forwards`,
      }}
    >
      <div className="card-header d-flex">
        <h3 className="mr-auto align-self-baseline">{header}</h3>
        <div className="fas fa-times btn" onClick={hideBanner}></div>
      </div>
      <div className="card-body">{body}</div>
    </div>
  );
};
export default Banner;
