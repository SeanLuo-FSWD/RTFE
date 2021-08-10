import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGet from "../../../services/useGet";
import { globalContext } from "../../../store/context/globalContext";
import { useHistory } from "react-router-dom";
import useAuthenticate from "../../../helper/hooks/useAuthenticate";
import { IUser } from "../../../interface/IUser";

function Navbar() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doGet] = useGet();
  const history = useHistory();

  const handleLogout = () => {
    doGet("auth/logout", (res: any) => {
      setCurrentUser(null);
      history.push("/login");
    });
  };

  const getUser = () => {
    doGet("auth/authenticate", (data: any) => {
      const userObj: IUser = {
        userId: data.userId,
        username: data.username,
      };
      setCurrentUser(userObj);
    });
  };

  return (
    <div>
      {currentUser ? <h3>Welcome, {currentUser!.username}</h3> : getUser()}

      <button onClick={handleLogout}>logout</button>
      <Link to="/public">
        <h2>Public pg</h2>
      </Link>
    </div>
  );
}

export default Navbar;
