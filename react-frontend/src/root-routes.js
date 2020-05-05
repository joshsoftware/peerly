import React from "react";
import { Switch } from "react-router-dom";

import GenerateRoutes from "sharedComponents/GenerateRoutes";
import rootRoutesConfig from "root-routes-config";

function Routes() {
  return <Switch>{<GenerateRoutes configs={rootRoutesConfig} />}</Switch>;
}

export default Routes;
