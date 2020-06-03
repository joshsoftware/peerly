import React from "react";
import { render } from "@testing-library/react";

import PlusSign from "shared-components/plus-sign/PlusSign";

it("should equal to + text", () => {
  const { getByTestId } = render(<PlusSign />);
  expect(getByTestId("peerlyplussign")).toHaveTextContent("+");
});
