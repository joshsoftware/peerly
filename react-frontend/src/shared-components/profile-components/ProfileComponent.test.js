import React from "react";
import { render } from "@testing-library/react";

import ImageComponent from "core-components/image/ImageComponent";
import LabelComponent from "core-components/image/ImageComponent";

describe("Image component test", () => {
  test("renders image component with image", () => {
    const { getByAltText } = render(<ImageComponent />);
    const testImage = getByAltText("profile");
    expect(testImage).toBeInTheDocument();
  });

  test("LabelComponent should equal to submit text", () => {
    const { getByText } = render(<LabelComponent text="name" />);
    expect(getByText("name")).toHaveTextContent("name");
  });
});
