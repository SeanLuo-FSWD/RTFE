import React, { useContext, useEffect } from "react";
import { helperGet } from "../../../helper/api/get";
import { globalContext } from "../../../store/context/globalContext";

function FeedPg() {
  const { setCurrentUser } = useContext(globalContext);
  const get_users_path = "user/";

  useEffect(() => {
    helperGet(get_users_path, (err: string, result: any) => {
      if (err) {
        console.log("get_users_path error");
        console.log(err);
        //set page error here
      } else {
        // GET request here!
        if (result.issue) {
          console.log(result.issue);
        } else {
          console.log(result.payload);
        }
      }
    });
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div>
      <h2>Welcome, you are logged in</h2>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default FeedPg;
