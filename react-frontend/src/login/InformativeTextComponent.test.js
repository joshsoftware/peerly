import React from "react";
import { render } from "@testing-library/react";
import InformativeTextComponent from "login/InformativeTextComponent";

describe("informative Text component test", () => {
  test("should render informative text component", () => {
    const { asFragment, getByTestId } = render(
      <InformativeTextComponent
        informativeText="Lets Create the Office Positive"
        encouragementThought="thought"
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId("info")).toHaveStyleRule("color", "var(--white)");
    expect(getByTestId("info")).toHaveStyleRule(
      "background-color",
      "var(--black)"
    );
    expect(getByTestId("hrLine")).toHaveStyleRule("width", "10%");
    expect(getByTestId("hrLine")).toHaveStyleRule("background", "var(--white)");
  });

  test("test case for style", () => {
    const { getByTestId } = render(
      <InformativeTextComponent
        theme="light"
        informativeText="Lets Create the Office Positive"
        encouragementThought="thought"
      />
    );
    expect(getByTestId("info")).toHaveStyleRule("color", "var(--black)");
    expect(getByTestId("info")).toHaveStyleRule(
      "background-color",
      "var(--white)"
    );
    expect(getByTestId("hrLine")).toHaveStyleRule("background", "var(--black)");
    expect(getByTestId("hrLine")).toHaveStyleRule("width", "10%");
  });

  test("test case for classes", () => {
    const { getByTestId } = render(
      <InformativeTextComponent
        className="text-uppercase"
        informativeText="Lets Create the Office Positive"
        encouragementThought="thought"
      />
    );
    expect(getByTestId("info")).toHaveClass("text-uppercase");
  });
});
