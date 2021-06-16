import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { server_url } from "../constant/constants";

const useGet = () => {
  const history = useHistory();
  // const [_postData, set_postData] = React.useState(null) as any;

  const doGet = (path: string, cb?: Function) => {
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
        console.log(err.response.data.statusCode);
        console.log(err.response.data.message);

        history.replace(history.location.pathname, {
          errorStatusCode: err.response.data.statusCode,
          errorMsg: err.response.data.message,
        });
      });
  };

  return [doGet];
};

export default useGet;
