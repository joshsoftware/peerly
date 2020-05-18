import React from "react";
import { render } from "@testing-library/react";

import ImageComponent from "core-components/ImageComponent";
import { IMG_BASE_PATH } from "constants/appConstants";

describe("Image component test", () => {
  test("renders image component with image", () => {
    const { getByAltText } = render(
      <ImageComponent alt="test image" src={`${IMG_BASE_PATH}/high-five.png`} />
    );
    const testImage = getByAltText("test image");
    expect(testImage).toBeInTheDocument();
  });
});
