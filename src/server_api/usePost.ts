import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { server_url } from "../constants";

const usePost = () => {
  const history = useHistory();
  // const [_postData, set_postData] = React.useState(null) as any;

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

  return [doPost];
};

export default usePost;
