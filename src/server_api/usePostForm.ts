import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { server_url } from "../env.config";

const usePostForm = () => {
  const history = useHistory();

  const doPostForm = (path: string, bodyFormData: any, cb?: any) => {
    axios({
      method: "POST",
      url: path,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
      .then(function (response) {
        console.log("doPostSubmit response");
        console.log(response);
        // let post_obj = response.data;
        // post_obj["like_arr"] = [];
        // cb(post_obj);
      })
      .catch(function (err) {
        console.log("doPostSubmit : err");

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

  return [doPostForm];
};

export default usePostForm;
