import React from "react";
import { Switch } from "react-router-dom";

import GenerateRoutes from "shared-components/routes/GenerateRoutes";
import rootRoutesConfig from "root/root-routes-config";

function Routes() {
  return <Switch>{<GenerateRoutes config={rootRoutesConfig} />}</Switch>;
}

export default Routes;
