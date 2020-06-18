import React from "react";
import { render } from "@testing-library/react";
import MobileDashboardComponent from "login/MobileDashboardComponent";

describe("mobile dashboard component test", () => {
  test("should render  dashboard component", () => {
    const { asFragment } = render(<MobileDashboardComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
