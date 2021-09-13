import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useErrorCatcher from "./errorCatcher.helper";
import { server_api } from "../env.config";
const usePostForm = () => {
  const [doErrorCatcher] = useErrorCatcher();

  const doPostForm = (path: string, bodyFormData: any, cb?: any) => {
    axios({
      method: "POST",
      url: `${server_api}${path}`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
      .then(function (response) {
        cb(response.data);
      })
      .catch((err) => {
        doErrorCatcher(err);
      });
  };

  return [doPostForm];
};

export default usePostForm;
