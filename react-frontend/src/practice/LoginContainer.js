import React from "react";
import { Button } from "react-bootstrap";
import { store } from "root/redux-store";
import { useSelector } from "react-redux";

import LoginContainerTwo from "practice/LoginContainerTwo";

const LoginContainer = () => {
  const apiResponse = () => {
    store.dispatch({ type: "LOGIN_API" });
  };
  let someVar = {};
  someVar = useSelector((state) => state.loginReducer);

  return (
    <div>
      <Button onClick={apiResponse}>Submit</Button>
      {someVar.map((el, key) => (
        <h1 key={key}>
          id:{el.id}
          <br />
          org_id: {el.org_id}
          <br />
          text: {el.text}
          <br />
          description: {el.description}
          <br />
          parent_core_value_id{el.parent_core_value_id}
        </h1>
      ))}
      <LoginContainerTwo />
    </div>
  );
};

export default LoginContainer;
