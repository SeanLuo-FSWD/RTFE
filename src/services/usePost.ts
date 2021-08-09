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
        console.log(err.response.data.statusCode);
        console.log(err.response.data.message);
        // throw new HttpException("Forbiddenzzzzzzz", 408);

        history.replace(history.location.pathname, {
          errorStatusCode: err.response.data.statusCode,
          errorMsg: err.response.data.message,
        });
      });
  };

  return [doPost];
};

export default usePost;
