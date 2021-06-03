import React, { useContext } from "react";
import { globalContext } from "../store/context/globalContext";
import { Redirect } from "react-router-dom";
// import LogReg from "./c1/LogReg/LogReg";
// import Login from "./c1/LogReg/Login";

function PrivateWrap(props: any) {
  const { currentUser } = useContext(globalContext);

  // return <>{currentUser ? props.children : <Login />}</>;
  return <>{currentUser ? props.children : <Redirect to="/login" />}</>;
}

export default PrivateWrap;
