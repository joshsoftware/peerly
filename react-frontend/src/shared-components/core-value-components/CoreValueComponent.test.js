import React from "react";
import { render } from "@testing-library/react";
import CoreValueComponent from "shared-components/core-value-components/CoreValueComponent";

it("login text component should equal to value", () => {
  const { getByTestId } = render(
    <CoreValueComponent
      orgPrimaryCoreValue="Lets Create the Office Positive"
      encouragementThought=" positive"
    />
  );
  expect(getByTestId("CoreValueComponent")).toHaveTextContent(
    "Lets Create the Office Positive positive"
  );
});
