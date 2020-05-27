import React from "react";
import { render } from "@testing-library/react";

import LogoComponent from "shared-components/peerly-Logo/LogoComponent";
import PreLoginImageComponent from "shared-components/prelogin-image-components/PreLoginImageComponent";
import PrimaryCoreValueComponent from "shared-components/primary-core-value-components/PrimaryCoreValueComponent";

describe("Pre Login component test", () => {
  test("renders image component with image", () => {
    const { getByAltText } = render(<PreLoginImageComponent />);
    const testImage = getByAltText("pre login image");
    expect(testImage).toBeInTheDocument();
  });

  test("should equal to + Peerly text", () => {
    const { getByTestId } = render(<LogoComponent />);
    expect(getByTestId("peerlyLogoComponent")).toHaveTextContent("+ Peerly");
  });

  test("login text component should equal to value", () => {
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
});
