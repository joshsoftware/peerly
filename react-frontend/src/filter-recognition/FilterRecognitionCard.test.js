import React from "react";
import { render } from "@testing-library/react";
import FilterRecognitionCard from "filter-recognition/FilterRecognitionCard";

describe("FilterRecognitionCard component test", () => {
  test("should render FilterRecognitionCard component", () => {
    const { asFragment } = render(<FilterRecognitionCard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
