import React from "react";
import { render } from "@testing-library/react";

import PeerlyTextAndLogo from "shared-components/peerly-logo/PeerlyTextAndLogo";

it("should equal to Peerly text", () => {
  const { asFragment } = render(
    <PeerlyTextAndLogo theme={{ variant: "dark" }} fontSize="48px" />
  );
  expect(asFragment()).toMatchSnapshot();
});
