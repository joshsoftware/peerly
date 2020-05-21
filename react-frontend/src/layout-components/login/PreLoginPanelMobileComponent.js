import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import LogoComponent from "../../shared-components/peerly-Logo/LogoComponent";
import LoginTextComponent from "../../shared-components/loginTextComponent/LoginTextComponent";
import PreLoginImageComponent from "../../shared-components/prelogin-image-components/PreLoginImageComponent";

const PreLoginPanelMobileComponent = () => (
  <Container className="bg-dark p-0" fluid={true}>
    <Row className="pt-3 w-100 ">
      <LogoComponent />
    </Row>
    <Row>
      <Col className="d-flex justify-content-center">
        <PreLoginImageComponent width="290px" />
      </Col>
    </Row>
    <Row className="pt-3">
      <LoginTextComponent />
    </Row>
  </Container>
);

export default PreLoginPanelMobileComponent;
