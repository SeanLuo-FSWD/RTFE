import React, { useContext, useEffect, useState } from "react";
import useGet from "../../server_api/useGet";
import { globalContext } from "../../store/context/globalContext";
import { useHistory, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

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

  return (
    <div className={`${styles.nav_container}`}>
      <h3>Welcome, {currentUser.username}</h3>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/calendar">
        <p>Calendar</p>
      </Link>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Navbar;
