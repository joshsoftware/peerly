import React from "react";
import styled from "styled-components";

import { Label } from "core-components/form/FormComponent";
import { Row, Col } from "core-components/grid/GridComponents";

const PlusSign = styled.div`
  &: after {
    content: " ";
    position: absolute;
    display: block;
    background-color: #fffff;
    width: 3px;
    height: 35px;
    left: 44%;
    top: 14%;
    bottom: 4%;
    z-index: 9;
    transform: rotate(135deg);
  }
  &: before {
    content: " ";
    position: absolute;
    display: block;
    background-color: #fffff;
    width: 3px;
    height: 35px;
    left: 45%;
    top: 14%;
    bottom: 4%;
    z-index: 9;
    transform: rotate(45deg);
  }
`;
const Logo = styled.div`
  & {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 32px;
    transform: rotate(45deg);
  }
  &: before {
    content: "";
    width: 50px;
    height: 50px;
    border: 3px solid #fffff;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`;

const LogoComponent = () => (
  <Row className="d-flex flex-column" data-testid="peerlyLogoComponent">
    <Col className="d-flex justify-content-center">
      <Logo>
        <PlusSign />
      </Logo>
    </Col>
    <Col>
      <Label className="text-white h2 mt-5 pt-5 text-center w-100">
        Peerly
      </Label>
    </Col>
  </Row>
);

export default LogoComponent;
