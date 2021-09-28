import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPg from "../pages/LoginPg/LoginPg";
import ErrorHandler from "./ErrorHandler";
import ErrorPg from "../pages/ErrorPg/ErrorPg";
import useGet from "../../server_api/useGet";
import ProtectedRoute from "./ProtectedRoute";
import HomePg from "../pages/HomePg/HomePg";
import { globalContext } from "../../store/context/globalContext";
import CalendarPg from "../pages/Calendar/CalendarPg";

function Router() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doGet] = useGet();
  let user;

  useEffect(() => {
    doGet("auth/authenticate", (res: any) => {
      if (res) {
        user = res.username;
        setCurrentUser(res);
      } else {
        console.log("Router: user not authenticated");
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <ErrorHandler>
        <Switch>
          <Route path="/error" component={ErrorPg} />
          <Route path="/login" component={LoginPg} />

          <ProtectedRoute
            path="/calendar"
            Component={CalendarPg}
            isAuth={currentUser}
            key="uniquevalue"
          />
          <ProtectedRoute path="/" Component={HomePg} isAuth={currentUser} />
        </Switch>
      </ErrorHandler>
    </BrowserRouter>
  );
}

export default Router;
