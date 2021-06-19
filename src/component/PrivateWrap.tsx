import React, { useContext, useState } from "react";
import { globalContext } from "../store/context/globalContext";
import { Redirect } from "react-router-dom";
import useGet from "../services/useGet";
import axios from "axios";

// import LogReg from "./c1/LogReg/LogReg";
// import Login from "./c1/LogReg/Login";

function PrivateWrap(props: any) {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doGet] = useGet();

  // make a callable hook here, and pass in currentUser
  // if user, return currentUserObj and replace 'currentUser' below.

  // if (!currentUser) {
  // doGet("auth/authenticate", (res: any) => {
  //   console.log("PrivateWrap auth/authenticate success : res.data");
  //   console.log(res);

  //   setCurrentUser(res);
  // });
  // axios
  //   .get("auth/authenticate", { withCredentials: true })
  //   .then((response) => {
  //     console.log("auth/authenticate : req.user");
  //     console.log(response);
  //   });
  // }

  // return <>{currentUser ? props.children : <Login />}</>;
  return <>{currentUser ? props.children : <Redirect to="/login" />}</>;
}

export default PrivateWrap;
