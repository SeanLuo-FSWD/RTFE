import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivateWrap from "./PrivateWrap";
import Login from "./c1_pages/LogReg/Login";
import Register from "./c1_pages/LogReg/Register";
import ErrorHandler from "./ErrorHandler";

function Router() {
  return (
    <BrowserRouter>
      <ErrorHandler>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateWrap>
            <PrivateRoute />
          </PrivateWrap>
        </Switch>
      </ErrorHandler>
    </BrowserRouter>
  );
}

export default Router;
