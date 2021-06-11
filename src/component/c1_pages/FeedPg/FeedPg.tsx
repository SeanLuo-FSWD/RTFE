import React, { useContext, useEffect, useState } from "react";
import useQuery from "../../../services/useQuery";
import { globalContext } from "../../../store/context/globalContext";
import { get } from "lodash";
import useFetchMyApi from "../../../services/useLazyQuery";

function FeedPg() {
  const { setCurrentUser } = useContext(globalContext);
  const [_dog, set_dog] = useState("husky");
  const [_lazy_data, set_lazy_data] = useState("");
  const [items, locationFetch] = useFetchMyApi();

  // useEffect(() => {
  //   locationFetch("mylocation1");
  // }, []);

  // const { data } = useQuery({
  const { data } = useQuery({
    url: `https://dog.ceo/api/breed/${_dog}/images/random`,
  });

  // const doLazyQuery = () => {
  //   const selectedLocation = "locationSelect.current.value";
  //   locationFetch(selectedLocation);
  // };

  const doLazyQuery = () => {
    locationFetch(`https://dog.ceo/api/breed/${_dog}/images/random`);
  };

  // const get_users_path = "user/";
  const get_users_path = "/auth/profile";
  const imageSrc = get(data, "message");

  useEffect(() => {
    console.log("999999999999999999999");
    console.log(_dog);
    console.log(items);
  });

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const toggleDog = () => {
    _dog === "husky" ? set_dog("pitbull") : set_dog("husky");
  };

  return (
    <div>
      <h2>Welcome, you are logged in</h2>
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
