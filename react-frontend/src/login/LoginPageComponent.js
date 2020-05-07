import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";

import LoginLabelComponent from "login/LoginLabelComponent";
import LogoComponent from "login/LogoComponent";
import ImageComponent from "core-components/ImageComponent";

const LoginPageComponent = ({ orgPrimaryCoreValue, encoragementThought }) => (
  <Container className="bg-dark d-sm-block d-md-none h-100">
    <Row>
      <LogoComponent
        className="text-white h1 text-center w-100 font-weight-bold justify-content-center"
        text="Peerly"
      />
    </Row>
    <Row>
      <ImageComponent className="w-100" src={require("login/image2.png")} />
    </Row>
    <Row>
      <Col className="col-3 p-0"></Col>
      <Col className="col-6 p-0">
        <LoginLabelComponent
          className="text-center text-white h3 font-weight-bold"
          orgPrimaryCoreValue={orgPrimaryCoreValue}
          encoragementThought={encoragementThought}
        />
      </Col>
      <Col className="col-3 p-0"></Col>
    </Row>
  </Container>
);

LoginPageComponent.propTypes = {
  orgPrimaryCoreValue: PropTypes.string,
  encoragementThought: PropTypes.string,
};

export default LoginPageComponent;
