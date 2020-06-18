import React from "react";
import { render } from "@testing-library/react";

import GoogleLoginButton from "login/GoogleLoginButton";

test("GoogleLoginButton should pass a snapshot", () => {
  const responseCheckFunction = () => {
    return true;
  };

  const { asFragment } = render(
    <GoogleLoginButton
      buttonText="Google Sign in"
      responseGoogleOnFailure={responseCheckFunction}
      responseGoogleOnSuccess={responseCheckFunction}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
