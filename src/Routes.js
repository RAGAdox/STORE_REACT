import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";

import AdminDashboard from "./user/AdminDashBoard";
import UserDashboard from "./user/UserDashBoard";

import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategory from "./admin/ManageCategory";
import ManageProduct from "./admin/ManageProducts";
export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/dashboard" component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute path="/admin/create/category" component={AddCategory} />
        <AdminRoute path="/admin/create/product" component={AddProduct} />
        <AdminRoute path="/admin/category" component={ManageCategory} />
        <AdminRoute path="/admin/product" component={ManageProduct} />
      </Switch>
    </Router>
  );
}
