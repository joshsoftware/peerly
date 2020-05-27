import React from "react";
import { render } from "@testing-library/react";
import PrimaryCoreValueComponent from "shared-components/primary-core-value-components/PrimaryCoreValueComponent";

it("login text component should equal to value", () => {
  const { getByTestId } = render(
    <PrimaryCoreValueComponent
      orgPrimaryCoreValue="Lets Create the Office Positive"
      encouragementThought="positive"
    />
  );
  expect(getByTestId("PrimaryCoreValueComponent")).toHaveTextContent(
    "Lets Create the Office Positive positive"
  );
});
