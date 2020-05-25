import React from "react";

import { Col, Row } from "react-bootstrap";
import Styled from "styled-components";

import LabelComponent from "core-components/Label/LabelComponent";

const Logo = Styled.div`
& {
  width: 50px;
  height: 50px;   
  position: absolute;
  top: 10px;
  align-content: center;
  transform: rotate(45deg);   
}
&: before {
  content: "";
  width: 30px;
  height: 30px;
  border: 2px solid #FFFFFF;            
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
}  
`;
const PlusSign = Styled.div`
  position: absolute;
  top: 55%;
  left: 55%;
  transform: translate(-50%, -50%) rotate(-45deg)
  color: #FFFFFF;
`;

const LogoComponent = () => (
  <Row className="d-flex flex-column" data-testid="peerlyLogoComponent">
    <Col className="d-flex justify-content-center">
      <Logo>
        <PlusSign>
          <LabelComponent text="+" className="text-center w-100" />
        </PlusSign>
      </Logo>
    </Col>
    <Col>
      <LabelComponent
        text="Peerly"
        className="text-white mt-5 pt-1 text-center w-100"
      />
    </Col>
  </Row>
);

export default LogoComponent;
