import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivateWrap from "./PrivateWrap";
import Login from "./c1_pages/LogReg/LoginPg";
import Register from "./c1_pages/LogReg/RegisterPg";
import ErrorHandler from "./ErrorHandler";
import ErrorPg from "./c1_pages/ErrorPg/ErrorPg";
import RedirectPg from "./c1_pages/LogReg/RedirectPg";

function Router() {
  return (
    <BrowserRouter>
      <ErrorHandler>
        <Switch>
          <Route path="/redirect" component={RedirectPg} />
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
