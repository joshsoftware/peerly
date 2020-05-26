/*import React from "react";
import { shallow } from "enzyme";
import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginContainer from "login/LoginContainer";

enzyme.configure({ adapter: new Adapter() });
*/
import React from "react";
import { render } from "@testing-library/react";

import LoginContainer from "login/LoginContainer";

it("should render login container", () => {
  const { getByTestId } = render(<LoginContainer />);
  expect(getByTestId("LoginContainer")).toHaveTextContent("LoginComponent");
});
