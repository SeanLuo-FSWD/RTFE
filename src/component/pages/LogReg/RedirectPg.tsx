import React, { useState, useEffect, useContext } from "react";
import useGet from "../../../services/useGet";
import { IUser } from "../../../interface/IUser";
import { Link, Redirect } from "react-router-dom";
import { globalContext } from "../../../store/context/globalContext";
import axios from "axios";
import { AxiosResponse } from "axios";
import { server_url } from "../../../constants";

function RedirectPg() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [_error, set_error] = useState(null);

  useEffect(() => {
    axios
      .get(`${server_url}auth/authenticate`, {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        console.log("3rd party auth successsss in RedirectPg");
        const userObj: IUser = {
          userId: res.data.userId,
          username: res.data.username,
        };
        setCurrentUser(userObj);
      })
      .catch((err) => {
        console.log("error in RedirectPg");

        console.log(err);
        console.log(err.response);
        console.log(err.response.data);
        console.log(err.response.data.statusCode);
        console.log(err.response.data.message);
        set_error(err.response.data.message);
      });

    // doGet("auth/authenticate", (res: any) => {
    //   console.log("auth/authenticate success inside RedirectPg : res.data");
    //   console.log(res.data);
    //   setCurrentUser(res.data);
    // });
  }, []);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  if (_error) {
    return (
      <div>
        <h3>User not found, please try login again</h3>
        <Link to="/login">Back to login page</Link>
      </div>
    );
  }
  return (
    <div>
      <h2>Please wait as we redirect you</h2>
    </div>
  );
}

export default RedirectPg;
