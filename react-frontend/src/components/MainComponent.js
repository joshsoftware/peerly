import React from "react";
import SignInComponent from "components/SignInComponent";
import HomeComponent from "./HomeComponent";
const MainComponent = () => {
  return (
    <div>
      <HomeComponent />
      <br></br>
      <br></br>
      <SignInComponent />
      <br></br>
    </div>
  );
};
export default MainComponent;
