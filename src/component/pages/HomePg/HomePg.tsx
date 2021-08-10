import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "../../../store/context/globalContext";
import useGet from "../../../services/useGet";
import { Helmet } from "react-helmet";
import usePreGet from "../../../services/usePreGet";
import { server_url } from "../../../constants";
import { IUser } from "../../../interface/IUser";
import { useHistory } from "react-router-dom";
import Navbar from "../../composable/80/Navbar";

function HomePg() {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doGet] = useGet();
  const [users_arr, setUsers] = useState([])
  // let users_arr: any ;

  // const users_arr = usePreGet({
  //   url: `${server_url}user`,
  // }) as any;
  useEffect(() => {
    doGet('user', (data: any) => {
      // users_arr = data;
      setUsers(data);
    })
  }, [])



  const handleLogout = () => {
    doGet("auth/logout", (res: any) => {
      setCurrentUser(null);
      history.push("/login");
    });
  };

  return (
    <div>
      <Navbar></Navbar>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      {/* <h2>Welcome, you are logged in as {currentUser!.username}</h2> */}
      {/* <button onClick={handleLogout}>logout</button> */}

      { users_arr &&
      users_arr!.map((user: IUser) => {
        
         return <p key={user.userId}>{user.username}</p>
      })}
    </div>
  );
}

export default HomePg;
