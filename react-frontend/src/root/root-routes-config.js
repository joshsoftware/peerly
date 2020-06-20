import App from "root/App";
import Dashboard from "root/Dashboard";
import LeftPanel from "shared-components/left-panel/LeftPanelComponent";
import CreateRecognition from "create-recognition/CreateRecognitionContainer";
import LoginContainer from "login/LoginContainer";
import UserListContainer from "shared-components/user-list/UserListContainer";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
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
    path: DASHBOARD_ROUTES.loginRoute,
    isProtected: false,
    includeNavbar: false,
    includeSidebar: false,
    component: LoginContainer,
    exact: false,
    strict: false,
    key: DASHBOARD_ROUTES.loginRoute,
  },
  {
    path: DASHBOARD_ROUTES.leftPanel,
    isProtected: true,
    includeNavbar: true,
    includeSidebar: true,
    component: LeftPanel,
    exact: false,
    strict: false,
    key: DASHBOARD_ROUTES.leftPanel,
  },
  {
    path: DASHBOARD_ROUTES.usersList,
    isProtected: true,
    includeNavbar: true,
    includeSidebar: true,
    component: UserListContainer,
    exact: false,
    strict: false,
    key: DASHBOARD_ROUTES.usersList,
  },
  {
    path: DASHBOARD_ROUTES.createRecognition,
    isProtected: true,
    includeNavbar: true,
    includeSidebar: true,
    component: CreateRecognition,
    exact: false,
    strict: false,
    key: DASHBOARD_ROUTES.createRecognition,
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
