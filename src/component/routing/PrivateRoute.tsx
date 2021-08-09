import React from "react";
import { Route } from "react-router-dom";
import HomePg from "../pages/HomePg/HomePg";

function PrivateRoute() {
  return (
    <>
      {/* <Route path="/users"></Route>

      <Route path="/account"></Route> */}

      <Route path="/">
        <HomePg />
      </Route>
    </>
  );
}

export default PrivateRoute;
