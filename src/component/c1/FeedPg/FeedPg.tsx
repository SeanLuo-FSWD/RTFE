import React, { useContext } from "react";

import { globalContext } from "../../../store/context/globalContext";

function FeedPg() {
  const { setCurrentUser } = useContext(globalContext);

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
