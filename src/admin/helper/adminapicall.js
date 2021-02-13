import React from "react";
import { Link, Redirect } from "react-router-dom";
import { API } from "../../backend";
//Category Calls
//Create Catagories
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      //console.log(err);
    });
};
//Update Category
export const updateCategory = (categoryId, token, userId, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};
//get category by id
export const getCategoryById = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
//get all catagories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
//Product Calls
export const getProductByCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}/products`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
};
//Create Product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",

    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
//get all products
export const getProducts = (limit, skip) => {
  //console.log(limit, skip);
  return fetch(`${API}/product?limit=${limit}&skip=${skip}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      //console.log(err);
    });
};
//get count of products
export const getProductCount = () => {
  return fetch(`${API}/product/count`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {});
};
//delete products
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",

    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
//modify products
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",

    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
//get a product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//Add Product Photo
export const addProductPhoto = (productId, userId, token, photo) => {
  return fetch(`${API}/product/photo/${productId}/${userId}`, {
    method: "PUT",

    headers: {
      Accept: "application/json",
      Authorization: `bearer ${token}`,
    },
    body: photo,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return { error: "Unable to add photos to product" };
    });
};
export const deleteProductPhoto = (productId, userId, token, photoPath) => {
  return fetch(
    `${API}/product/photo/${productId}/${userId}?path=${photoPath}`,
    {
      method: "DELETE",

      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
