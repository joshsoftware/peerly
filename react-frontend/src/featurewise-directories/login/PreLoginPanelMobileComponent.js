import React from "react";
import { Container, Row } from "react-bootstrap";

import LogoComponent from "../../shared-components/peerly-Logo/LogoComponent";
import LoginTextComponent from "../../shared-components/login-text-component/LoginTextComponent";
import PreLoginImageComponent from "../../shared-components/prelogin-image-components/PreLoginImageComponent";

const PreLoginPanelMobileComponent = () => (
  <Container className="bg-dark h-100  w-100 " fluid={true}>
    <Row className="h-25 py-3">
      <LogoComponent />
    </Row>
    <Row className="h-50" >
      <PreLoginImageComponent size="lg" className="w-100 img-fluid" />
    </Row>
    <Row className="h-25 mt-4">
      <LoginTextComponent  />
    </Row>
  </Container>
);

PreLoginPanelMobileComponent.defaultProps = {};

PreLoginPanelMobileComponent.propTypes = {};

export default PreLoginPanelMobileComponent;
