import React, { useContext, useEffect, useState } from "react";
import useQuery from "../../../services/archive/useQuery";
import { globalContext } from "../../../store/context/globalContext";
import { get } from "lodash";
import useFetchMyApi from "../../../services/archive/useLazyQuery";
import useGet from "../../../services/useGet";

function FeedPg() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [_dog, set_dog] = useState("husky");
  const [_lazy_data, set_lazy_data] = useState("");
  const [items, locationFetch] = useFetchMyApi();
  const [doGet] = useGet();

  const { data } = useQuery({
    url: `https://dog.ceo/api/breed/${_dog}/images/random`,
  });

  const doLazyQuery = () => {
    locationFetch(`https://dog.ceo/api/breed/${_dog}/images/random`);
  };

  const imageSrc = get(data, "message");

  const handleLogout = () => {
    doGet("auth/logout", (res: any) => {
      console.log("handleLogout callback res");
      console.log(res);
      setCurrentUser(null);
    });
  };

  const toggleDog = () => {
    _dog === "husky" ? set_dog("pitbull") : set_dog("husky");
  };

  const handleGetSubmit = (url: string) => {
    doGet(url, (res: any) => {
      console.log("handleGetSubmit callback res");
      console.log(res);
    });
  };

  // useEffect(() => {
  //   handleGetSubmit("auth/profile");
  // }, []);

  useEffect(() => {
    console.log("999999999999999999999");
    console.log(_dog);
    console.log(items);
  });

  return (
    <div>
      <h2>Welcome, you are logged in as {currentUser!.username}</h2>
      <button onClick={handleLogout}>logout</button>
      {!imageSrc && <p>Loading...</p>}
      {imageSrc && <img alt={`A nice husky`} src={imageSrc} height={200} />}
      <button onClick={toggleDog}>reload this</button>
      <button onClick={doLazyQuery}>get Lazy loadeding</button>
      <h2>lazyloaded below</h2>

      {items && <img alt={`A nice dog`} src={items} height={200} />}

      {/* <ul>
        {items.map((item: any) => (
          <li>{item}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default FeedPg;
