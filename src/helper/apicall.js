import { API } from "../backend";
//Get All Products
export const getProducts = ({
  limit,
  skip,
  sortBy,
  sortOrder,
  category,
  minPrice,
  maxPrice,
}) => {
  return fetch(
    `${API}/product?limit=${limit}&skip=${skip}&sortBy=${sortBy}&sortOrder=${sortOrder}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      //console.log(err);
    });
};
