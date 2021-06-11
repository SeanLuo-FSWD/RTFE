import React, { useContext } from "react";
import FormManager from "../../c0_common/FormManager";
import { globalContext } from "../../../store/context/globalContext";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../../services/Auth";
import usePost from "../../../services/usePost";

function Login() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doPost] = usePost();
  console.log("000000000000000000000");
  console.log("currentUser");
  console.log(currentUser);

  const handleSubmit = (values: any) => {
    console.log("handleSubmit");
    console.log(values);

    // const queryData = LazyPost("auth/login", {
    //   email: "bob@bob.com",
    //   password: "bob@bob.com",
    // });

    // console.log("queryData");
    // console.log(queryData);
    doPost("auth/login", values, (res: any) => {
      console.log("callback res");
      console.log(res);
      setCurrentUser(res);
    });

    console.log("1111111111111111111111");
    console.log("currentUser");
    console.log(currentUser);

    // AuthService.login(values);
    // Makes an api call.
    // setCurrentUser({ id: "123", username: "bob" });
  };

  if (currentUser) {
    console.log("currentUser");

    console.log(currentUser);

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
              handleSubmit(values);
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
    </div>
  );
}

export default Login;
