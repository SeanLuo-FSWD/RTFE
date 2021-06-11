import React from "react";
import FormManager from "../../c0_common/FormManager";
// import { helperPost } from "../../../services/api/post";
import { Link } from "react-router-dom";
import UserService from "../../../services/User";

function Register() {
  const handleSubmit = (values: any) => {
    console.log("Register handleSubmit");
    console.log(values);

    try {
      UserService.registerUser(values);
      console.log('returned!');
      
    } catch (error) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
    }
  };

  return (
    <div>
      <h2>Register page</h2>

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
