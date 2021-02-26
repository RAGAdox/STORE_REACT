import React, { useState, useEffect } from "react";
const Card = ({
  name = "Product Name",
  description = "Product Description",
  imageUrls = ["https://via.placeholder.com/150"],
  price = 0,
  addedToCart = false,
}) => {
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState(imageUrls[index]);

  useEffect(() => {
    let interval = setInterval(() => {
      if (index < imageUrls.length - 1) setIndex(index + 1);
      else setIndex(0);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className="card bg-light rounded-lg shadow p-1 m-1 col-sm-3 product-card">
      <div className="card-body">
        <div
          style={{
            backgroundImage: `url(${imageUrls[index]})`,
          }}
          className="mb-1 embed-responsive embed-responsive-1by1 product-card-image"
        ></div>
        <div className="px-3">
          <h5 className="row font-weight-bold">{name}</h5>
          <p className=" row font-weight-normal text-truncate product-card-description">
            {description}
          </p>
        </div>
      </div>
      <div className="card-footer bg-light">
        <p className="col">Rs. {price}</p>
        <button
          className="btn btn-success rounded col"
          {...(addedToCart && { disabled: true })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Card;
