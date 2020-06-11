import React from "react";
import { render } from "@testing-library/react";

import LoginImageComponent from "login/LoginImageComponent";

describe("Image component test", () => {
  test("renders image component with image", () => {
    const { getByAltText } = render(<LoginImageComponent />);
    const testImage = getByAltText("login image");
    expect(testImage).toBeInTheDocument();
  });

  test("render image with correct size", () => {
    const { getByAltText } = render(<LoginImageComponent size="lg" />);
    const testImage = getByAltText("login image");
    expect(testImage.src.split("/")).toContainEqual("cat-img.png");
  });
});
