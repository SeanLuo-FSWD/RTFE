import React from "react";
import { Route } from "react-router-dom";
import FeedPg from "../pages/FeedPg/FeedPg";

function PrivateRoute() {
  return (
    <>
      {/* <Route path="/users"></Route>

      <Route path="/account"></Route> */}

      <Route path="/">
        <FeedPg />
      </Route>
    </>
  );
}

export default PrivateRoute;
