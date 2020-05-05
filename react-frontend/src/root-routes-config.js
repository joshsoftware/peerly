import App from "App";
import Dashboard from "Dashboard";
import UnathorisedFallback from "sharedComponents/UnathorisedFallback";

export default [
  {
    path: "/",
    is_protected: false,
    is_navbar: false,
    is_sidebar: false,
    component: App,
    exact: true,
  },
  {
    path: "/dashboard",
    is_protected: true,
    is_navbar: true,
    is_sidebar: true,
    component: Dashboard,
    exact: false,
  },
  {
    path: "/unathorised",
    is_protected: false,
    is_navbar: true,
    is_sidebar: true,
    component: UnathorisedFallback,
    exact: false,
  },
];
