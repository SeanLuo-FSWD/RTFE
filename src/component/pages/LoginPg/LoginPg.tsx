import React, { useContext } from "react";
import { globalContext } from "../../../store/context/globalContext";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

function LoginPg() {
  const { currentUser } = useContext(globalContext);

  const googleLogin = () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
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
