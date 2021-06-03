import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IUser } from "../../interface/IUser";

interface IGlobalContext {
  currentUser: IUser | null;
  setCurrentUser: Dispatch<SetStateAction<any | null>>;
}

export const globalContext = createContext({} as IGlobalContext);

export default function GlobalContext(props: any) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  return (
    <globalContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </globalContext.Provider>
  );
}
