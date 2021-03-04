//Adds Item from Cart from multiple components
export const addItemToCard = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    let index = cart.findIndex((product) => product._id === item._id);
    if (index !== -1) {
      cart[index].count += 1;
    } else cart.push({ ...item, count: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
//To Load all the products in cart from local storage
export const getItemsFromCart = () => {
  if (typeof window !== undefined) {
    return JSON.parse(localStorage.getItem("cart"));
  }
};
//Remove the product completely from the cart
export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.map((product, index) => {
        if (product._id === productId) {
          cart.splice(index, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  return cart;
};
//Clears the cart all together . Needed after successfull checkout
export const clearCart = (next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("cart", JSON.stringify([]));
    next();
  }
};
//Get the count of the product currently in cart
export const getProductCount = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      let index = cart.findIndex((product) => product._id === productId);
      if (index !== -1) {
        return cart[index].count;
      }
    }
  }
  return 0;
};
//Remove a quantity of a particular product
export const decreaseProductCount = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      let index = cart.findIndex((product) => product._id === productId);
      if (index !== -1 && cart[index].count > 0) {
        cart[index].count -= 1;
      }
      if (cart[index].count == 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};
//Increase the number of products in cart
export const increaseProductCount = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      let index = cart.findIndex((product) => product._id === productId);
      if (index !== -1 && cart[index].count < cart[index].stock) {
        cart[index].count += 1;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};
