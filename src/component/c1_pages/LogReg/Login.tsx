import React, { useContext } from "react";
import FormManager from "../../c0_common/FormManager";
import { globalContext } from "../../../store/context/globalContext";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../../services/archive/Auth";
import usePost from "../../../services/usePost";
import useGet from "../../../services/useGet";

function Login() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doPost] = usePost();
  const [doGet] = useGet();
  console.log("000000000000000000000");
  console.log("currentUser");
  console.log(currentUser);

  const googleLogin = () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  const handlePostSubmit = (url: string, values: any) => {
    doPost(url, values, (res: any) => {
      console.log("callback res");
      console.log(res);
      setCurrentUser(res);
    });
  };

  const handleGetSubmit = (url: string) => {
    doGet(url, (res: any) => {
      console.log("handleGetSubmit callback res");
      console.log(res);
    });
  };

  if (currentUser) {
    return <Redirect to="/home" />;
  }
  return (
    <div>
      <h2>Login page</h2>

      <FormManager initialValues={{ email: "", password: "" }}>
        {({ values, setValue }: any) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePostSubmit("auth/login", values);
            }}
          >
            <input
              placeholder="Email"
              value={values.email}
              type="email"
              onChange={(e) => {
                setValue("email", e.target.value);
              }}
            />
            <input
              placeholder="Password"
              value={values.password}
              type="password"
              onChange={(e) => {
                setValue("password", e.target.value);
              }}
            />
            <button type="submit">Login</button>
          </form>
        )}
      </FormManager>
      <Link to="/register">
        <button>Register page</button>
      </Link>

      <button
        // onClick={() => {
        //   handleGetSubmit("auth/google");
        // }}
        onClick={googleLogin}
      >
        Google Login
      </button>
    </div>
  );
}

export default Login;
