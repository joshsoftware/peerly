import React from "react";
import { Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>main page this is</p>
        <li>
          <Link to="/dashboard">Protected Page</Link>
        </li>
      </header>
    </div>
  );
}

export default App;
