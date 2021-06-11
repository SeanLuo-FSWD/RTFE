import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useQuery = ({ url }: { url: string }) => {
  const history = useHistory();
  const [apiData, setApiData] = React.useState();

  // S1. initial run, apiData undefined
  // S5. second rub, apiData defined

  React.useEffect(() => {
    // S3. useEffect runs after initial return.
    // S7. "url and history" not changed, so this WON'T run a second time.
    axios
      .get(url)
      .then((response) => {
        // S4. Setting this triggers a rerender
        setApiData(response.data);
      })
      .catch((err) => {
        history.replace(history.location.pathname, {
          errorStatusCode: err.code,
        });
      });
  }, [url, history]);

  // S2. Returning {data: undefined}
  // S6. second run, returning desired data
  return { data: apiData };
};

export default useQuery;
