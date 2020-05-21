import React from "react";
import { render } from "@testing-library/react";

import LogoComponent from "shared-components/peerly-Logo/LogoComponent";
import PreLoginImageComponent from "shared-components/prelogin-image-components/PreLoginImageComponent"
import LoginTextComponent from "shared-components/login-text-component/LoginTextComponent";

describe("Pre Login component test", () => {
  test("renders image component with image", () => {
    const { getByAltText } = render(<PreLoginImageComponent />);
    const testImage = getByAltText("pre login image");
    expect(testImage).toBeInTheDocument();
  });

  
test("should equal to + Peerly text", () => {
    const { getByTestId } = render(<LogoComponent  />);
    expect(getByTestId("peerlyLogoComponent")).toHaveTextContent("+ Peerly");
  });

test("should equal to value", () => {
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

    
});
