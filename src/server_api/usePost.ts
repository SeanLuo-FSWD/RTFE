import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { server_url } from "../env.config";

const usePost = () => {
  const history = useHistory();

  const doPost = (path: string, dto: Object, cb?: Function) => {
    axios
      .post(`${server_url}${path}`, dto, { withCredentials: true })
      .then((response) => {
        // set_postData(response.data);
        if (cb) {
          console.log("doPost : response.data");
          console.log(response.data);
          cb(response.data);
        }
      })
      .catch((err) => {
        console.log("doPost : err");

        console.log(err);

        let errorMsg = err.response?.data?.message
          ? err.response.data.message
          : "Unhandled server side message?";
        let errorStatusCode = err.response?.data?.statusCode
          ? err.response.data.statusCode
          : 503;

        if (window.location.pathname !== "/error") {
          if (history) {
            history.replace(history.location.pathname, {
              errorStatusCode: errorStatusCode,
              errorMsg: errorMsg,
            });
          } else {
            window.location.replace("/error");
          }
        }
      });
  };

  return [doPost];
};

export default usePost;
