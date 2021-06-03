import axios from "axios";
import { server_url } from "../../constant/server_url";

export const helperPost = (path: string, dto: any, cb: Function) => {
  const api_url = server_url + path;
  axios
    .post(api_url, dto, { withCredentials: true })
    .then((res) => {
      console.log('post register response');  
      console.log(res);
      
      cb(null, res.data);
    })
    .catch((err) => cb(err.response.data.message));
};
