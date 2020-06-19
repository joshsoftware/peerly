import React from "react";
import { Link } from "react-router-dom";

import { DASHBOARD_ROUTES } from "constants/routeConstants";

function App() {
  return (
    <div>
      <header>
        <p>Welcome to Peerly</p>
        <Link to={DASHBOARD_ROUTES.dashboardIndex}>dashboard</Link>
      </header>
    </div>
  );
}

export default React.memo(App);
