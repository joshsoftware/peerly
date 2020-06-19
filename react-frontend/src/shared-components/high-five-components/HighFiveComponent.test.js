import React from "react";
import { render } from "@testing-library/react";

import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";

describe("Image component test", () => {
  test("renders image component with image", () => {
    const { getByAltText } = render(<HighFiveComponent />);
    const testImage = getByAltText("High five recognition");
    expect(testImage).toBeInTheDocument();
  });
});
