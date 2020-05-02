import App from "App";
import Dashboard from "Dashboard";
import Fallback from "Fallback";
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
    path: "/fallback",
    is_protected: true,
    is_navbar: true,
    is_sidebar: true,
    component: Fallback,
    exact: true,
  },
];
