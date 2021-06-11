import React from "react";
import { useLocation } from "react-router-dom";
import { get } from "lodash";
import ErrorPg from "./c1_pages/ErrorPg/ErrorPg";

const ErrorHandler = ({ children }: any) => {
  const location = useLocation();

  const err_code = get(location.state, "errorStatusCode");
  console.log("errorHandler location.state : err_code");
  console.log(location.state);

  console.log(err_code);

  return err_code ? <ErrorPg /> : children;

  //   switch (get(location.state, "errorStatusCode")) {
  //     case 404:
  //       return <ErrorPg />;

  //     default:
  //       return children;
  //   }
};

export default ErrorHandler;
