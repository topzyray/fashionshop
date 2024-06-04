"use client";

import { GlobalContext } from "@/context/global-context";
import { useContext } from "react";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  console.log(isAuthUser);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Fashionware</h1>
    </main>
  );
}
