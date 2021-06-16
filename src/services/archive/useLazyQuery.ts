import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// const useFetchMyApi = () => {
//   const [items, setItems] = useState([] as any);

//   // custom fetch function consumes location
//   const locationFetch = (location: string = "") => {
//     // let's stimulate the API call with a 2 seconds response time
//     setTimeout(() => setItems([location, Math.random()]), 1000);
//   };

//   return [items, locationFetch]; // <-- return state and fetch function
// };

const useFetchMyApi = () => {
  const [items, setItems] = useState([] as any);
  const history = useHistory();

  // custom fetch function consumes location
  const locationFetch = (url: string = "") => {
    // let's stimulate the API call with a 2 seconds response time
    // setTimeout(() => setItems([location, Math.random()]), 1000);
    axios
      .get(url)
      .then((response) => {
        // S4. Setting this triggers a rerender
        console.log("444444444444444444");
        console.log(response.data);
        setItems(response.data.message);
      })
      .catch((err) => {
        history.replace(history.location.pathname, {
          errorStatusCode: err.code,
        });
      });
  };

  return [items, locationFetch]; // <-- return state and fetch function
};

export default useFetchMyApi;
