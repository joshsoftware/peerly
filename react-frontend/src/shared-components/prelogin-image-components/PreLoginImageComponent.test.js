import React from "react";
import { render } from "@testing-library/react";

import PreLoginImageComponent from "shared-components/prelogin-image-components/PreLoginImageComponent";

describe("Image component test", () => {
  test("renders image component with image", () => {
    const { getByAltText } = render(<PreLoginImageComponent />);
    const testImage = getByAltText("pre login image");
    expect(testImage).toBeInTheDocument();
  });
});
