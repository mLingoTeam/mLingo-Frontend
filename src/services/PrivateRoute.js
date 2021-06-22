import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CURRENT_LOGGED_USER } from '../config/constants/localStorageConstants';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!localStorage.getItem(CURRENT_LOGGED_USER)) {
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
