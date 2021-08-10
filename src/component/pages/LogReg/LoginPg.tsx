import React, { useContext } from "react";
import FormManager from "../../helper/FormManager";
import { globalContext } from "../../../store/context/globalContext";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../../../archive/services_api/Auth";
import usePost from "../../../services/usePost";
import useGet from "../../../services/useGet";
import useAuthenticate from "../../../helper/hooks/useAuthenticate";
import { IUser } from "../../../interface/IUser";
import { Helmet } from "react-helmet";

function LoginPg() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doPost] = usePost();
  const [doGet] = useGet();

  const googleLogin = () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  const handlePostSubmit = (url: string, values: any) => {
    doPost(url, values, (res: any) => {
      doGet("auth/authenticate", (res: any) => {
        console.log("auth/authenticate success : res.data");
        const userObj: IUser = {
          userId: res.userId,
          username: res.username,
        };
        setCurrentUser(userObj);
      });
    });
  };

  useAuthenticate();

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <h2 data-cy="LoginPg_title">Login page</h2>

      <FormManager initialValues={{ email: "", password: "" }}>
        {({ values, setValue }: any) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePostSubmit("auth/login", values);
            }}
          >
            <input
              name="email"
              placeholder="Email"
              value={values.email}
              type="email"
              onChange={(e) => {
                setValue("email", e.target.value);
              }}
            />
            <input
              name="password"
              placeholder="Password"
              value={values.password}
              type="password"
              onChange={(e) => {
                setValue("password", e.target.value);
              }}
            />
            <button type="submit" data-cy="LoginPg_submit">
              Login
            </button>
          </form>
        )}
      </FormManager>
      <Link to="/register">
        <button>Register page</button>
      </Link>

      <button onClick={googleLogin}>Google Login</button>
    </div>
  );
}

export default LoginPg;
