import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IUser } from "../../interface/IUser";
import axios from "axios";
import { AxiosResponse } from "axios";
import useGet from "../../services/useGet";

interface IGlobalContext {
  currentUser: IUser | null;
  setCurrentUser: Dispatch<SetStateAction<any | null>>;
}

export const globalContext = createContext({} as IGlobalContext);

export default function GlobalContext(props: any) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [doGet] = useGet();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/auth/authenticate", {
  //       withCredentials: true,
  //     })
  //     .then((res: AxiosResponse) => {
  //       console.log("3rd party auth successsss");

  //       console.log(res.data);
  //       if (res.data) {
  //         setCurrentUser(res.data);
  //       }
  //     });

  //   doGet("auth/authenticate", (res: any) => {
  //     console.log("auth/authenticate success : res.data");
  //     console.log(res.data);

  //     setCurrentUser(res.data);
  //   });
  // }, []);

  return (
    <globalContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </globalContext.Provider>
  );
}
