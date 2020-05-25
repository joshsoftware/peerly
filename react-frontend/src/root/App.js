import React from "react";
import LoginContainer from "login/LoginContainer";

function App() {
  return (
    <div>
      <header>
        <LoginContainer />
      </header>
    </div>
  );
}

export default React.memo(App);
