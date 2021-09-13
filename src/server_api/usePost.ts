import React from "react";
import axios from "axios";
import { server_api } from "../env.config";
import useErrorCatcher from "./errorCatcher.helper";

const usePost = () => {
  const [doErrorCatcher] = useErrorCatcher();

  const doPost = (path: string, dto: any, cb?: Function) => {
    axios
      .post(`${server_api}${path}`, dto, { withCredentials: true })
      .then((response) => {
        if (cb) {
          console.log("doPost : response.data");
          console.log(response.data);
          cb(response.data);
        }
      })
      .catch((err) => {
        doErrorCatcher(err);
      });
  };

  return [doPost];
};

export default usePost;
