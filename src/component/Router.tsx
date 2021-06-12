import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivateWrap from "./PrivateWrap";
import Login from "./c1_pages/LogReg/Login";
import Register from "./c1_pages/LogReg/Register";
import ErrorHandler from "./ErrorHandler";
import ErrorPg from "./c1_pages/ErrorPg/ErrorPg";

function Router() {
  return (
    <BrowserRouter>
      <ErrorHandler>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/error" component={ErrorPg} />
          {/* <Route path="/error" render={() => <ErrorPg />} /> */}
          <PrivateWrap>
            <PrivateRoute />
          </PrivateWrap>
        </Switch>
      </ErrorHandler>
    </BrowserRouter>
  );
}

export default Router;
