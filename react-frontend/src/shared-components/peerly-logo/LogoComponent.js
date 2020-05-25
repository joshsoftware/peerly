import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
//import { Col, Row } from "react-bootstrap";
import Styled from "styled-components";

import LabelComponent from "core-components/Label/LabelComponent";
import Row from "core-components/row/rowComponent";
import Col from "core-components/col/colComponents";
>>>>>>> 9962ed6... updated file with style guides
=======
import Styled from "styled-components";

import LabelComponent from "core-components/label/LabelComponent";
import Row from "core-components/row/RowComponent";
import Col from "core-components/col/ColComponent";
>>>>>>> 92c7ad4... updated logo component by adding core component wrapper over it

const Logo = Styled.div`
& {
  width: 50px;
  height: 50px;   
  position: absolute;
  top: 10px;
  transform: rotate(45deg);
}
&: before {
  content: "";
  width: 20px;
  height: 20px;
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
transform: translate(-50%, -50%) rotate(-45deg);
color: #FFFFFF;
`;

const LogoComponent = () => (
  <Row className="d-flex flex-column" data-testid="peerlyLogoComponent">
    <Col className="d-flex justify-content-center">
      <Logo>
        <PlusSign />
      </Logo>
    </Col>
    <Col>
<<<<<<< HEAD
      <Label className="text-white h2 mt-5 pt-5 text-center w-100">
        Peerly
      </Label>
=======
      <LabelComponent
        text="Peerly"
        className="text-white mt-5 pt-1 text-center w-100"
      />
>>>>>>> 9962ed6... updated file with style guides
    </Col>
  </Row>
);

export default LogoComponent;
