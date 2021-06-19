import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { globalContext } from "../../store/context/globalContext";
import { server_url } from "../../constant/constants";
import { IUser } from "../../interface/IUser";
import { AxiosResponse } from "axios";

function useAuthenticate() {
  const { setCurrentUser } = useContext(globalContext);

  axios
    .get(`${server_url}auth/authenticate`, { withCredentials: true })
    .then((res: AxiosResponse) => {
      console.log(`${server_url}auth/authenticate --------`);
      console.log(res);
      const userObj: IUser = {
        userId: res.data.userId,
        username: res.data.username,
      };
      setCurrentUser(userObj);
    });
}

export default useAuthenticate;
