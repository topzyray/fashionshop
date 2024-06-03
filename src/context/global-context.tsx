"use client";

import { createContext } from "react";

type GlobalStateProps = {
  children: React.ReactNode;
};

export const GlobalContext = createContext(null);

export default function GlobalState({ children }: GlobalStateProps) {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}
