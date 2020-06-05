import React from "react";

import { Col, Row } from "react-bootstrap";

import LabelComponent from "core-components/core/Label/LabelComponent";

const LogoComponent = () => (
  <Col data-testid="peerlyLogoComponent">
    <Row>
      <LabelComponent text="+" className="text-white text-center w-100" />
    </Row>
    <Row>
      <LabelComponent text="Peerly" className="text-white text-center w-100" />
    </Row>
  </Col>
);

export default LogoComponent;
