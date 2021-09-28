import React, { useContext, useState } from "react";
import { globalContext } from "../../../store/context/globalContext";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { server_url } from "../../../env.config";

function LoginPg() {
  const { currentUser } = useContext(globalContext);

  const googleLogin = () => {
    window.open(`${server_url}api/auth/google`, "_self");
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <h2 data-cy="LoginPg_title">Login page</h2>

      <button onClick={googleLogin}>Google Login</button>
    </div>
  );
}

export default LoginPg;
