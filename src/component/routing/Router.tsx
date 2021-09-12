import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPg from "../pages/LoginPg/LoginPg";
import ErrorHandler from "./ErrorHandler";
import ErrorPg from "../pages/ErrorPg/ErrorPg";
import useGet from "../../server_api/useGet";
import ProtectedRoute from "./ProtectedRoute";
import HomePg from "../pages/HomePg/HomePg";
import { globalContext } from "../../store/context/globalContext";

function Router() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doGet] = useGet();
  let user;

  doGet("auth/authenticate", (res: any) => {
    console.log("Router - Get auth/authenticate: res");
    console.log(res);

    if (res) {
      user = res.username;
      setCurrentUser(res.username);
    }

    return res;
  });

  useEffect(() => {
    doGet("auth/authenticate", (res: any) => {
      console.log("Router - Get auth/authenticate: res");
      console.log(res);

      if (res) {
        setCurrentUser(res.username);
      }
    });
  }, [currentUser]);

  return (
    <BrowserRouter>
      <ErrorHandler>
        <Switch>
          <Route path="/error" component={ErrorPg} />
          <Route path="/login" component={LoginPg} />

          <ProtectedRoute path="/" Component={HomePg} isAuth={currentUser} />
        </Switch>
      </ErrorHandler>
    </BrowserRouter>
  );
}

export default Router;
