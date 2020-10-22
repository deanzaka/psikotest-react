import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        if (user) {
          let complete = true;
          const check = [
            "name",
            "address",
            "phone",
            "birthDate",
            "gender",
            "education",
            "occupation",
          ];
          for (let item of check) {
            if (!user[item]) {
              complete = false;
              break;
            }
          }
          console.log("value:" + complete);
          console.log(props.location.pathname);
          if (complete || props.location.pathname === "/profile")
            return <Component {...rest} {...props} />;
          else return <Redirect to="/profile" />;
        } else return <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
