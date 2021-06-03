import axios from "axios";

export const helperPost = (url: string, dto: any, cb: Function) => {
  axios
    .post(url, dto, { withCredentials: true })
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => cb(err));
};
