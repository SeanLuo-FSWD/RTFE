import React, { useContext } from "react";
import { globalContext } from "../../../store/context/globalContext";
import useGet from "../../../services/useGet";
import { Helmet } from "react-helmet";
import useQuery from "../../../services/useQuery";
import { server_url } from "../../../constants";
import { IUser } from "../../../interface/IUser";


function HomePg() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doGet] = useGet();

  const users_arr = useQuery({
    url: `${server_url}user`,
  }) as any;


  const handleLogout = () => {
    doGet("auth/logout", (res: any) => {
      setCurrentUser(null);
    });
  };

  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h2>Welcome, you are logged in as {currentUser!.username}</h2>
      <button onClick={handleLogout}>logout</button>

      { users_arr &&
      users_arr.map((user: IUser) => {
        
         return <p key={user.userId}>{user.username}</p>
      })}
    </div>
  );
}

export default HomePg;
