"use client";

import { Fragment, useContext } from "react";
import { GlobalContext } from "@/context/global-context";
import {
  adminNavOptions,
  clientNavOptions,
  NavOptionsType,
} from "@/utils/index";
import CommonModal from "./CommonModal";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type NavItemsProps = {
  isModalView?: boolean;
  isAdminView: boolean;
  router: AppRouterInstance;
  pathName: string;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function NavItems({
  isModalView = false,
  isAdminView,
  router,
  pathName,
  setShowNavModal,
}: NavItemsProps) {
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
                onClick={() => {
                  setShowNavModal(false);
                  router.push(`${path}`);
                }}
                key={id}
                className={`cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 hover:underline transition-all ease-in-out duration-300 ${
                  pathName === path ? "font-bold" : "underline-none"
                }`}
              >
                {label}
              </li>
            ))
          : clientNavOptions.map(({ id, label, path }: NavOptionsType) => (
              <li
                onClick={() => {
                  setShowNavModal(false);
                  router.push(`${path}`);
                }}
                key={id}
                className={`cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 hover:underline transition-all ease-in-out duration-300 ${
                  pathName === path ? "font-bold" : "underline-none"
                }`}
              >
                {label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const {
    showNavModal,
    setShowNavModal,
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
  } = useContext(GlobalContext);

  const handleLogout = () => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  };

  const isAdminView = pathName.includes("/admin");

  return (
    <>
      <nav className="bg-white w-full fixed z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
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
                <button onClick={() => router.push("/")} className="btn-small">
                  Client View
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin")}
                  className="btn-small"
                >
                  Admin View
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button onClick={handleLogout} className="btn-small">
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="btn-small"
              >
                Login
              </button>
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

          <NavItems
            isAdminView={isAdminView}
            router={router}
            pathName={pathName}
            setShowNavModal={setShowNavModal}
          />
        </div>
      </nav>

      <CommonModal
        showModelTitle={false}
        mainContent={
          <NavItems
            isModalView={true}
            isAdminView={isAdminView}
            router={router}
            pathName={pathName}
            setShowNavModal={setShowNavModal}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
    </>
  );
}
