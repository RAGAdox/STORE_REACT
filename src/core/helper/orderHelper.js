import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
