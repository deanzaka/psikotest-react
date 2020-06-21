import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={(props) =>
          localStorage.getItem("user") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}

export default ProtectedRoute;
