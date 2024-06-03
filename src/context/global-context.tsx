"use client";

import { createContext, useState } from "react";

type GlobalStateProps = {
  children: React.ReactNode;
};

export type GlobalStateContextType = {
  showNavModal: boolean;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalStateContextType | null>(null);

export default function GlobalState({ children }: GlobalStateProps) {
  const [showNavModal, setShowNavModal] = useState(false);
  return (
    <GlobalContext.Provider value={{ showNavModal, setShowNavModal }}>
      {children}
    </GlobalContext.Provider>
  );
}
