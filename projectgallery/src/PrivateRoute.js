import React, { Component } from "react";
import { Route } from "react-router-dom";
import Signin from "./components/screens/Signin";

const PrivateRoute = ({ path, component: Component, ...rest }) => (
  <Route
    {...rest}
    path={path}
    render={(props) => {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (!user) return <Signin {...props} />;
      else return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
