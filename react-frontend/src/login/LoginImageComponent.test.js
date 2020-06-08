import React from "react";
import { render } from "@testing-library/react";

import LoginImageComponent from "login/LoginImageComponent";
import { IMG_BASE_PATH } from "constants/appConstants";
import Image from "../../public/assets/images/cat-img.png";

describe("Image component test", () => {
  test("renders image component with image", () => {
    const { getByAltText } = render(<LoginImageComponent />);
    const testImage = getByAltText("login image");
    expect(testImage).toBeInTheDocument();
  });

  test("render image with correct size", () => {
    const { getByAltText } = render(<LoginImageComponent size="lg" />);
    const testImage = getByAltText("login image");
    expect(testImage.src).toBe(`http://localhost${IMG_BASE_PATH}/${Image}`);
  });
});
