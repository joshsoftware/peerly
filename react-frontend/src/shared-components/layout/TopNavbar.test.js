import React from "react";
import { render } from "@testing-library/react";

import TopNavbar from "shared-components/layout/TopNavbar";

describe("Navbar tests", () => {
  test("test brand header to be Peerly", () => {
    const { getByText } = render(<TopNavbar />);
    let brandText = getByText("Peerly");

    expect(brandText).toBeInTheDocument();
  });

  test("test `this week's` text not rendered for mobile responsive", () => {
    const { getByText } = render(<TopNavbar />);

    let weekText = getByText("This week's");

    expect(weekText.classList.contains("d-sm-block")).toBe(true);
    expect(weekText.classList.contains("d-none")).toBe(true);
  });
});
