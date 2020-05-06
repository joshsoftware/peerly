import App from "root/App";
import Dashboard from "root/Dashboard";
import UnauthorisedErrorComponent from "sharedComponents/UnauthorisedErrorComponent";
import { DASHBOARD_ROUTES, ROOT_ROUTES } from "constants/routeConstants";

export default [
  {
    path: ROOT_ROUTES.rootIndex,
    isProtected: false,
    includeNavbar: false,
    includeSidebar: false,
    component: App,
    exact: true,
    strict: false,
    key: ROOT_ROUTES.rootIndex,
  },
  {
    path: DASHBOARD_ROUTES.dashboardIndex,
    isProtected: true,
    includeNavbar: true,
    includeSidebar: true,
    component: Dashboard,
    exact: false,
    strict: false,
    key: DASHBOARD_ROUTES.dashboardIndex,
  },
  {
    path: ROOT_ROUTES.unauthorised,
    isProtected: false,
    includeNavbar: true,
    includeSidebar: true,
    component: UnauthorisedErrorComponent,
    exact: false,
    strict: false,
    key: ROOT_ROUTES.unauthorised,
  },
];
