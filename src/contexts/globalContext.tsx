import React, { createContext, PropsWithChildren, useContext } from "react";

interface Props {
  colors: {offWhite: string, black: string, green: string, aliceBlue: string}
}

const globalContext = createContext<Props | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error("Global context is undefined")
  }

  return context;
}

const GlobalContextProvider:React.FC<PropsWithChildren> = ({children}) => {
  const colors = {
    offWhite: "#faf9f6", black: "#171717", green: "#60f0c5", aliceBlue: "#f0f8ff"
  }

  return (
    <globalContext.Provider value={{colors}}>
      {children}
    </globalContext.Provider>
  )
};

export default GlobalContextProvider;