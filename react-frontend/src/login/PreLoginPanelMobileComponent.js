import React from "react";
import { Container, Row } from "react-bootstrap";
import LogoComponent from "shared-components/peerly-Logo/LogoComponent";
import LoginTextComponent from "shared-components/login-text-component/LoginTextComponent";
import PreLoginImageComponent from "shared-components/prelogin-image-components/PreLoginImageComponent";

const PreLoginPanelMobileComponent = () => (
  <Container className="bg-dark w-100" fluid={true}>
    <Row className="h-25 py-5">
      <LogoComponent className="text-white" />
    </Row>
    <Row className="h-50">
      <PreLoginImageComponent className="w-100 img-fluid" />
    </Row>
    <Row className="h-25 py-5">
      <LoginTextComponent />
    </Row>
  </Container>
);

export default PreLoginPanelMobileComponent;
