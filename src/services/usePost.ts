import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { server_url } from "../constant/server_url";

const usePost = () => {
  const history = useHistory();
  // const [_postData, set_postData] = React.useState(null) as any;

  const doPost = (path: string, dto: Object, cb: Function) => {
    axios
      .post(`${server_url}${path}`, dto, { withCredentials: true })
      .then((response) => {
        // set_postData(response.data);
        cb(response.data);
      })
      .catch((err) => {
        console.log("doPost err");
        console.log(err.response.message);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(err.response.statusCode);
        console.log("bbbbbbbbbbbbbbbbbb");
        console.log(err.response.error);
        console.log("cccccccccccccccccccc");
        console.log(err.response.status);
        console.log("ddddddddddddddddddddddd");
        console.log(err.response.data.error);

        console.log("err");
        console.log(err.response);

        history.replace(history.location.pathname, {
          errorStatusCode: err.data,
          errorMsg: err.message,
        });
      });
  };

  return [doPost];
};

export default usePost;
