import React from "react";
import { render } from "@testing-library/react";
import CoreValueIconComponent from "./CoreValueIconComponent";

it("renders image component with image", () => {
  const { getByTestId } = render(
    <CoreValueIconComponent size="50px" color="red" />
  );
  const testIcon = getByTestId("CoreValueIcon");
  expect(testIcon).toBeInTheDocument();
});
