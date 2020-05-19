import React from "react";
import { render } from "@testing-library/react";

import LogoComponent from "components/shared/peerly-logo/LogoComponent";

it("should equal to + Peerly text", () => {
  const { getByTestId } = render(<LogoComponent text="Peerly" />);
  expect(getByTestId("peerlyLogoComponent")).toHaveTextContent("+ Peerly");
});
