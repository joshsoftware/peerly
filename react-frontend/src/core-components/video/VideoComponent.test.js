import React from "react";
import { render } from "@testing-library/react";

import VideoComponent from "core-components/video/VideoComponent";

it("VideoComponent should equal to Title", () => {
  const { getByTitle } = render(<VideoComponent title="peerly video" />);
  expect(getByTitle("peerly video")).toBeInTheDocument();
});
