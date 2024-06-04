"use client";

import {
  GlobalContext,
  GlobalStateContextType,
} from "@/context/global-context";
import {
  adminNavOptions,
  clientNavOptions,
  NavOptionsType,
} from "@/utils/index";
import { Fragment, useContext } from "react";
import CommonModal from "./CommonModal";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const isAdminView = false;
const isAuthUser = false;
const user = {
  role: "admin",
};

function NavItems({ isModalView = false }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map(({ id, label, path }: NavOptionsType) => (
              <li
                key={id}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 hover:underline transition-all ease-in-out duration-500"
              >
                {label}
              </li>
            ))
          : clientNavOptions.map(({ id, label, path }: NavOptionsType) => (
              <li
                key={id}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 hover:underline transition-all ease-in-out duration-500"
              >
                {label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const { showNavModal, setShowNavModal } =
    useContext<GlobalStateContextType>(GlobalContext);

  return (
    <>
      <nav className="bg-white w-full fixed z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              <span className="bg-black text-white">Fashion</span>Shop
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button className="btn-small">Account</button>
                <button className="btn-small">Cart</button>
              </Fragment>
            ) : null}
            {user?.role === "admin" && isAuthUser ? (
              isAdminView ? (
                <button className="btn-small">Client View</button>
              ) : (
                <button className="btn-small">Admin View</button>
              )
            ) : null}
            {isAuthUser ? (
              <button className="btn-small">Logout</button>
            ) : (
              <button className="btn-small">Login</button>
            )}

            {/* Hamburger Menu */}
            <div
              onClick={() => setShowNavModal(!showNavModal)}
              className="flex items-center justify-center mt-2 md:hidden cursor-pointer bg-white hover:bg-primary hover:rounded-lg"
            >
              {!showNavModal ? (
                <AiOutlineMenu
                  size={35}
                  className="text-primary hover:text-white "
                />
              ) : (
                <AiOutlineClose
                  className="text-primary hover:text-white hover:rounded-lg p-1"
                  size={35}
                />
              )}
            </div>
          </div>

          <NavItems />
        </div>
      </nav>

      <CommonModal
        showModelTitle={false}
        mainContent={<NavItems isModalView={true} />}
        show={showNavModal}
        setShow={setShowNavModal}
      />
    </>
  );
}
