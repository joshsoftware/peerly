import React from "react";
import { render } from "@testing-library/react";
import PreLoginDashboardComponent from "login/PreLoginDashboardComponent";

describe("pre login dashboard component test", () => {
  test("should render pre login dashboard component", () => {
    const { asFragment } = render(<PreLoginDashboardComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
