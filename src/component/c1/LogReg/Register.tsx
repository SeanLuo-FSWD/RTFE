import React from "react";
import FormManager from "../../c0/FormManager";
import { helperPost } from "../../../helper/api/post";
import { Link } from "react-router-dom";

function Register() {
  const handleSubmit = (values: any) => {
    console.log("Register handleSubmit");
    console.log(values);
    const register_path = "user/";
    helperPost(register_path, values, (err: string, result: any) => {
      if (err) {
        console.log("Register handleSubmit error");
        console.log(err);
      } else {
        if (result.issue) {
          console.log("result.issue");
          console.log(result.issue);
        } else {
          console.log("result.payload");
          console.log(result.payload);
        }
      }
    });
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
