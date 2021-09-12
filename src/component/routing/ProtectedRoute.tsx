import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ isAuth, Component }: any) {
  return (
    <Route
      //   {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
