import React from "react";
import { render } from "@testing-library/react";
import LoginPanel from "login/LoginPanel";

test("should equal to value", () => {
  const { getByText } = render(
    <LoginPanel
      orgPrimaryCoreValue="Let Create"
      buttonText="Google Sign in"
      encouragementThought="office positive"
    />
  );
  expect(getByText("Peerly")).toHaveTextContent("Peerly");
  expect(getByText("Let Create")).toHaveTextContent("Let Create");
  expect(getByText("office positive")).toHaveTextContent("office positive");
  expect(getByText("Google Sign in")).toHaveTextContent("Google Sign in");
});
