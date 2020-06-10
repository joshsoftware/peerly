import React from "react";
import { render } from "@testing-library/react";

import CreateRecognitionButton from "shared-components/create-recognition-button/CreateRecognitionButton";

it("create recognition component should render correctly", () => {
  const onClick = () => {
    return true;
  };

  const { asFragment } = render(
    <CreateRecognitionButton onClick={onClick} imageUrl="ccc" theme="dark" />
  );

  expect(asFragment()).toMatchSnapshot();
});
