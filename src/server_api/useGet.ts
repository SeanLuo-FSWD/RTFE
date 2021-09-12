import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { server_url } from "../constants";

const useGet = () => {
  const history = useHistory();
  // const [_postData, set_postData] = React.useState(null) as any;

  const doGet = (path: string, cb?: Function) => {
    console.log("doGet called with ===== : " + path);

    axios
      .get(`${server_url}${path}`, { withCredentials: true })
      .then((response) => {
        // set_postData(response.data);
        if (cb) {
          console.log("doGet : response.data");
          console.log(response.data);
          cb(response.data);
        }
      })
      .catch((err) => {
        console.log("doGet : err");

        console.log(err);

        const errorStatusCode = err.response
          ? err.response.data.statusCode
          : 503;

        const errorMsg = err.response
          ? err.response.data.message
          : "Server is down";

        history.replace(history.location.pathname, {
          errorStatusCode: errorStatusCode,
          errorMsg: errorMsg,
        });
      });
  };

  return [doGet];
};

export default useGet;
