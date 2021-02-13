import React from "react";
const Card = ({
  name = "Product Name",
  description = "Product Description",
  imageUrls = [
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
    "https://media.wired.com/photos/5cadec1fb75f9b23c6466d74/1:1/w_1398,h_1398,c_limit/blackhole.jpg",
  ],
  price = 1000,
  addedToCart = false,
}) => {
  return (
    <div className="card bg-dark text-white rounded-lg shadow m-1">
      <div className="card-body">
        <div className="rounded p2">
          {/* <img
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="rounded mb-3"
            src={imageUrls[0]}
          ></img> */}
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                class="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  class="d-block w-100"
                  src={imageUrls[0]}
                  alt="First slide"
                />
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src={imageUrls[1]}
                  alt="Second slide"
                />
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src={imageUrls[2]}
                  alt="Third slide"
                />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <p className="lead  font-weight-bold">{name}</p>
          <p className="  font-weight-normal text-wrap">{description}</p>
          <p className="rounded btn btn-success ">Rs. {price}</p>
          <button
            className="btn btn-success col-12 px-2 rounded"
            {...(addedToCart && { disabled: true })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
