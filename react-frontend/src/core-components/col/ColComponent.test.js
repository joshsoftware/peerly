import React from "react";
import { render } from "@testing-library/react";
import ColComponent from "core-components/col/ColComponent";

it("ColComponent should equal to submit text", () => {
  const { getByTitle } = render(<ColComponent title="my col" />);
  const data = getByTitle("my col");
  expect(data.title).toBe("my col");
});
