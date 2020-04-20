import React from "react";
import "./App.css";
import { LoginContext } from "login/LoginContext";
import LoginForm from "login/LoginForm";

function App() {
  const { state } = React.useContext(LoginContext);
  return (
    <div className="App">
      <header className="App-header">
        {/* Code to be removed */}
        <LoginForm />
        <p>{state.authToken}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
