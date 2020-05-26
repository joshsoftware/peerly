import React from "react";
import { shallow } from "enzyme";
import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginContainer from "login/LoginContainer";

enzyme.configure({ adapter: new Adapter() });

test("responseGoogle is called", () => {
  const wrapper = shallow(<LoginContainer />);
  const instance = wrapper.instance();
  instance.responseGoogle = jest.fn();
  expect(instance.responseGoogle).toEqual();
});
