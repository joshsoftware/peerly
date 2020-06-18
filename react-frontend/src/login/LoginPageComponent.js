import React from "react";
import styled from "styled-components";

import { Row, Col } from "core-components/grid/GridComponent";
import LoginImageComponent from "./LoginImageComponent";
import LoginPanel from "./LoginPanel";
import HowItsWorkComponent from "./HowItsWorkComponent";

const Wrapper = styled(Row)`
  height: 100vh;
`;

const LoginPageComponent = () => (
  <Wrapper>
    <Col className="p-0 d-none d-md-block">
      <HowItsWorkComponent />
    </Col>
    <Col className="p-0 h-100 d-none d-md-block">
      <LoginImageComponent size="lg" className="h-100 w-100" />
    </Col>
    <Col className="p-0">
      <LoginPanel />
    </Col>
  </Wrapper>
);

export default React.memo(LoginPageComponent);
