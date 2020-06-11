import React from "react";
import { render } from "@testing-library/react";

import LoginPanel from "login/LoginPanel";

test("LoginPanel should pass a snapshot", () => {
  const responseCheckFunction = () => {
    return true;
  };

  const { asFragment } = render(
    <LoginPanel
      responseGoogleOnFailure={responseCheckFunction}
      responseGoogleOnSuccess={responseCheckFunction}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
