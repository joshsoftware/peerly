import React from "react";
import { render } from "@testing-library/react";

import LoginTextComponent from "shared-components/login-text-component/LoginTextComponent";

it("should equal to value", () => {
  const { getByTestId } = render(
    <LoginTextComponent
      orgPrimaryCoreValue="Lets Create the Office Positive"
      encouragementThought="positive"
    />
  );
  expect(getByTestId("LoginTextComponent")).toHaveTextContent(
    "Lets Create the Office Positive positive"
  );
});
