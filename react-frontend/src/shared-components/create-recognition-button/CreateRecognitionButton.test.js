import React from "react";
import { render } from "@testing-library/react";

import CreateRecognitionButton from "shared-components/create-recognition-button/CreateRecognitionButton";

describe("Image component test", () => {
  const onClick = () => {
    onClick;
  };

  test("renders + sign for the component", () => {
    const { getByText } = render(
      <CreateRecognitionButton onClick={onClick} imageUrl="xxx" />
    );
    const testImage = getByText("+");
    expect(testImage).toBeInTheDocument();
  });
});
