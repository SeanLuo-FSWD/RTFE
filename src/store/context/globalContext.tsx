import { createContext, Dispatch, SetStateAction, useState } from "react";

interface IGlobalContext {
  currentUser: any;
  setCurrentUser: Dispatch<SetStateAction<any | null>>;
}

export const globalContext = createContext({} as IGlobalContext);

export default function GlobalContext(props: any) {
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  return (
    <globalContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </globalContext.Provider>
  );
}
