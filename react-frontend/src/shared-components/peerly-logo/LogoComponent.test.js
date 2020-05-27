import React from "react";
import { render } from "@testing-library/react";

import LogoComponent from "shared-components/peerly-logo/LogoComponent";

it("should equal to + Peerly text", () => {
  const { getByTestId } = render(<LogoComponent />);
  expect(getByTestId("peerlyLogoComponent")).toHaveTextContent("Peerly");
});
