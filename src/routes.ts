/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/not-found",
  "/unauthorized",
  "/product/listing/all-products",
  "/product/listing/men",
  "/product/listing/women",
  "/product/listing/kids",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api";

/**
 * The prefix for product route with a dynamic parameter
 * @type {string}
 */
export const productDetails = "/product";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * An array of routes that are only accessible to admin users
 * These routes will redirect unauthorized users to /unauthorized page
 * @type {string[]}
 */
export const adminRoutes = [
  "/admin",
  "/admin/add-product",
  "/admin/all-products",
];
