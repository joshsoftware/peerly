import React from "react";
import { render } from "@testing-library/react";

import RowComponent from "core-components/row/RowComponent";

it("RowComponent should be render", () => {
  const { getByTitle } = render(<RowComponent title="my row" />);
  const data = getByTitle("my row");
  expect(data.title).toBe("my row");
});
