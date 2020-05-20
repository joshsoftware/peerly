import React from "react";
import { render } from "@testing-library/react";
import VideoComponent from "core-components/video/VideoComponent";

it("VideoComponent should equal to Title", () => {
  const { getByTitle } = render(
    <VideoComponent src={require("login/video.mp4")} title="peerly video" />
  );
  expect(getByTitle("peerly video")).toBeInTheDocument();
});
