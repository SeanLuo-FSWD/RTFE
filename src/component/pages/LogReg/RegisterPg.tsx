import React, { useState, useContext } from "react";
import FormManager from "../../helper/FormManager";
// import { helperPost } from "../../../services/api/post";
import { Link, Redirect } from "react-router-dom";
import UserService from "../../../../archive/services_api/User";
import usePost from "../../../services/usePost";
import { globalContext } from "../../../store/context/globalContext";
import useAuthenticate from "../../../helper/hooks/useAuthenticate";

function Register() {
  const [_message, set_message] = useState("");
  const { currentUser, setCurrentUser } = useContext(globalContext);

  const [doPost] = usePost();

  const handleSubmit = (values: any) => {
    console.log("Register handleSubmit");
    console.log(values);

    doPost("user", values, () => {
      set_message("Registration success, please login now");
    });

    // try {
    //   UserService.registerUser(values);
    //   console.log('returned!');

    // } catch (error) {
    //   const errorMessage = error.response.data.message;
    //   console.log(errorMessage);
    // }
  };

  useAuthenticate();

  if (currentUser) {
    console.log("vvvvvvvvvvvvvvvvvvv");
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h2>Register page</h2>

      {_message && <h2>{_message}</h2>}

      <FormManager initialValues={{ username: "", email: "", password: "" }}>
        {({ values, setValue }: any) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(values);
            }}
          >
            <input
              placeholder="Username"
              value={values.username}
              type="text"
              maxLength={20}
              onChange={(e) => {
                setValue("username", e.target.value);
              }}
            />
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
            <button type="submit">Register</button>
          </form>
        )}
      </FormManager>
      <Link to="/login">
        <button>Login instead</button>
      </Link>
      {/* <button onClick={() => setRegPageProp(false)}>Login</button> */}
    </div>
  );
}

export default Register;
