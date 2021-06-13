import axios from "axios";
import { server_url } from "../../constant/constants";

export const helperGet = (path: string, cb: Function) => {
  const api_url = server_url + path;
  axios
    .get(api_url, { withCredentials: true })
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => cb(err.response.data.message));
};
