import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivateWrap from "./PrivateWrap";
import Login from "./c1/LogReg/Login";
import Register from "./c1/LogReg/Register";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateWrap>
          <PrivateRoute />
        </PrivateWrap>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
