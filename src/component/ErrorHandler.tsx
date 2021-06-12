import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import { get } from "lodash";
import ErrorPg from "./c1_pages/ErrorPg/ErrorPg";

const ErrorHandler = ({ children }: any) => {
  const location = useLocation();

  const errorMsg = get(location.state, "errorMsg");
  const pathname = window.location.pathname;

  return errorMsg ? (
    <Redirect
      push
      to={{
        pathname: "/error",
        state: { err_msg: errorMsg, pathname },
      }}
    />
  ) : (
    children
  );
};

export default ErrorHandler;
