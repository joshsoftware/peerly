import React from "react";
import { render } from "@testing-library/react";

import LoginTextComponent from "components/shared/loginTextComponent/LoginTextComponent";

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
