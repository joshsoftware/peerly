import React from "react";
import { render } from "@testing-library/react";
import PreLoginDashboardComponent from "login/PreLoginDashboardComponent";

describe("pre login panel component test", () => {
  test("should render pre login panel component", () => {
    const { asFragment, getByTestId } = render(
      <PreLoginDashboardComponent
        informativeText="Lets Create the Office Positive"
        encouragementThought="thought"
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId("officeInfo")).toHaveStyleRule(
      "background-color",
      "var(--atomic)"
    );
  });

  test("test case for style and classes", () => {
    const { getByTestId } = render(
      <PreLoginDashboardComponent
        theme="light"
        className="text-uppercase"
        informativeText="Lets Create the Office Positive"
        encouragementThought="thought"
      />
    );
    expect(getByTestId("officeInfo")).toHaveStyleRule(
      "background-color",
      "var(--white)"
    );
    expect(getByTestId("officeInfo")).toHaveClass("text-uppercase");
  });
});
