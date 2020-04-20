import React from "react";
import LoginComponent from "./LoginComponent";
import SignInComponent from "./SignInComponent";
import CopyrightComponent from "../core-components/CopyrightComponent";
const MainComponent = () => {
  return (
    <div>
      <LoginComponent />
      <br></br>
      <SignInComponent />
      <br></br>
      <CopyrightComponent />
    </div>
  );
};
export default MainComponent;
