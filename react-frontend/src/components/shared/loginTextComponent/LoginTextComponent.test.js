import React from "react";
import { render } from "@testing-library/react";

import LoginTextComponent from "components/shared/loginTextComponent/LoginTextComponent";

it("should equal to value", () => {
  const { getByTestId } = render(
    <LoginTextComponent
      orgPrimaryCoreValue="core value"
      encouragementThought="positive"
    />
  );
  expect(getByTestId("LoginTextComponent")).toHaveTextContent(
    "core value positive"
  );
});
