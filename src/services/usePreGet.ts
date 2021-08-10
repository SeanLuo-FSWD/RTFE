import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const usePreGet = ({ url }: { url: string }) => {
  const history = useHistory();
  const [apiData, setApiData] = React.useState();

  // S1. initial run, apiData undefined
  // S5. second rub, apiData defined

  React.useEffect(() => {
    // S3. useEffect runs after initial return.
    // S7. "url and history" not changed, so this WON'T run a second time.
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        // S4. Setting this triggers a rerender
        console.log('useQuery response data : ' + response.data.payload);
        setApiData(response.data);
      })
      .catch((err) => {
        console.log('useQuery Error :');
        history.replace(history.location.pathname, {
          errorStatusCode: err.response.data.statusCode,
          errorMsg: err.response.data.message,
        });
      });
  }, [url, history]);

  // S2. Returning {data: undefined}
  // S6. second run, returning desired data
  return  apiData ;
};

export default usePreGet;
