"use client";

import {
  adminNavOptions,
  clientNavOptions,
  NavOptionsType,
} from "@/utils/index";
import Image from "next/image";
import { Fragment, useState } from "react";

const isAdminView = false;
const isAuthUser = false;
const user = {
  role: "admin",
};

function NavItems() {
  return (
    <div
      className="items-center justify-between w-full md:flex md:w-auto"
      id="nav-items"
    >
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white">
        {isAdminView
          ? adminNavOptions.map(({ id, label, path }: NavOptionsType) => (
              <li
                key={id}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
              >
                {label}
              </li>
            ))
          : clientNavOptions.map(({ id, label, path }: NavOptionsType) => (
              <li
                key={id}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
              >
                {label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);

  return (
    <>
      <nav className="bg-white w-full fixed z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Fashionware
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button className="btn">Account</button>
                <button className="btn">Cart</button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button className="btn">Client View</button>
              ) : (
                <button className="btn">Admin View</button>
              )
            ) : null}
            {isAuthUser ? (
              <button className="btn">Logout</button>
            ) : (
              <button className="btn">Login</button>
            )}

            {/* Hamburger Menu */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              // onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
            </button>
          </div>

          <NavItems />
        </div>
      </nav>
    </>
  );
}
