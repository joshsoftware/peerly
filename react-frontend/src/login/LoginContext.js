import React from "react";
import LoginReducer, { initialState } from "./LoginReducer";
import PropTypes from "prop-types";

export const LoginContext = React.createContext();

export const LoginContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(LoginReducer, initialState);
  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LoginContext.Provider>
  );
};

LoginContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
