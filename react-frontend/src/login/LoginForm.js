import React from "react";
import { LoginContext } from "./LoginContext";

export default function LoginForm() {
  const { dispatch } = React.useContext(LoginContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    //... login api call
    dispatch({ type: "SET_TOKEN", payload: { token: "dummy_token" } });
  };
  return (
    <div>
      <label>Username</label>
      <input
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password</label>

      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={login}>
        Submit
      </button>
    </div>
  );
}
