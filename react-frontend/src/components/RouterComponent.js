import React from "react";
//import { BrowserRouter as Switch, Route,Router } from 'react-router-dom';
import MainComponent from "./MainComponent";
//import LogoutComponent from './LogoutComponent';
const RouterComponent = () => {
  return (
    // <Router>
    // <Switch>
    //   <Route path="/"  > <MainComponent /></Route>
    //   <Route path="/Logout" component={LogoutComponent } />
    // </Switch>
    // </Router>
    <MainComponent />
  );
};
export default RouterComponent;
