"use client";

import { Fragment, useContext, useEffect } from "react";
import { GlobalContext, User } from "@/context/global-context";
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
import CartModal from "./CartModal";
import { ProductDetailsProps } from "./CommonListing";

type NavItemsProps = {
  isModalView?: boolean;
  isAdminView: boolean;
  router: AppRouterInstance;
  pathName: string;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthUser: boolean;
  cartItems: ProductDetailsProps[] | [];
  user: User | null;
  handleLogout: () => void;
};

function NavItems({
  isModalView = false,
  isAdminView,
  router,
  pathName,
  setShowNavModal,
  isAuthUser,
  cartItems,
  user,
  handleLogout,
}: NavItemsProps) {
  return (
    <div
      className={`items-center justify-between w-full lg:flex lg:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col lg:p-0 font-medium rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 bg-white ${
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
                className={`cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded lg:p-0 hover:underline transition-all ease-in-out duration-300 ${
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
                className={`cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded lg:p-0 hover:underline transition-all ease-in-out duration-300 ${
                  pathName === path ? "font-bold" : "underline-none"
                }`}
              >
                {label}
              </li>
            ))}
      </ul>

      {/* Navigation button menu only for mobile screens */}
      <div className=" flex flex-col sm:hidden gap-2">
        {!isAdminView && isAuthUser ? (
          <Fragment>
            <button className="btn-small">Account</button>
            <button
              onClick={() => {
                setShowNavModal(false);
                router.push("/cart");
              }}
              className="btn-small"
            >
              Cart
              <span className="bg-red-500 rounded-full ml-2 py-0.5 px-1 ">
                {cartItems && cartItems.length}
              </span>
            </button>
          </Fragment>
        ) : null}
        {user?.role === "admin" && isAuthUser ? (
          isAdminView ? (
            <button
              onClick={() => {
                setShowNavModal(false);
                router.push("/");
              }}
              className="btn-small"
            >
              Client View
            </button>
          ) : (
            <button
              onClick={() => {
                setShowNavModal(false);
                router.push("/admin");
              }}
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
            onClick={() => {
              router.push("/login");
              setShowNavModal(false);
              setShowNavModal(false);
            }}
            className="btn-small"
          >
            Login
          </button>
        )}
      </div>
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
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
    cartItems,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (pathName !== "/admin/add-product" && currentUpdatedProduct !== null) {
      setCurrentUpdatedProduct(null);
    }
  }, [pathName]);

  const handleLogout = () => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
    setShowNavModal(false);
    setShowCartModal(false);
  };

  const isAdminView = pathName.includes("/admin");

  return (
    <>
      <nav className="bg-white w-full fixed z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="w-full sm:w-0 flex items-center justify-between cursor-pointer">
            <span
              onClick={() => router.push("/")}
              className="self-center text-2xl font-semibold whitespace-nowrap"
            >
              <span className="bg-black text-white">Fashion</span>Shop
            </span>

            {/* Hamburger Menu only mobile screen */}
            <div
              onClick={() => setShowNavModal(!showNavModal)}
              className="flex items-center justify-center mt-2 sm:hidden cursor-pointer bg-white hover:bg-primary hover:rounded-lg"
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

          {/* Navigation butotn menu for small, medium and large screen */}
          <div className="hidden sm:flex lg:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button className="btn-small">Account</button>
                <button
                  onClick={() => router.push("/cart")}
                  className="btn-small"
                >
                  Cart
                  <span className="bg-red-500 rounded-full ml-1 py-0.5 px-1">
                    {cartItems && cartItems.length}
                  </span>
                </button>
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

            {/* Hamburger Menu for small and medium screen  */}
            <div
              onClick={() => setShowNavModal(!showNavModal)}
              className="hidden items-center justify-center mt-2 sm:flex lg:hidden cursor-pointer bg-white hover:bg-primary hover:rounded-lg"
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
            isAuthUser={isAuthUser}
            cartItems={cartItems}
            handleLogout={handleLogout}
            user={user}
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
            isAuthUser={isAuthUser}
            cartItems={cartItems}
            handleLogout={handleLogout}
            user={user}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />

      {showCartModal && <CartModal />}
    </>
  );
}
