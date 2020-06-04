import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import LogoComponent from "shared-components/peerly-logo/LogoComponent";
import LoginTextComponent from "shared-components/login-text-component/LoginTextComponent";
import { Col, Row } from "core-components/grid/GridComponent";
import GoogleLoginButton from "login/GoogleLoginButton";

const RowComponent = Styled(Row)`
  height: calc(100%/3);
`;

const FirstCol = Styled(Col)`
  font: Helvetica Neue,Regular;
  padding-top: 1rem;
`;

const GoogleButton = Styled(GoogleLoginButton)`
  border-radius: 25px;
`;

const LoginPanel = ({
  buttonText,
  orgPrimaryCoreValue,
  encouragementThought,
  responseGoogleOnSuccess,
  responseGoogleOnFailure,
}) => (
  <>
    <div className="d-sm-none d-md-block h-100">
      <RowComponent>
        <FirstCol className="h1 text-white">
          <LogoComponent />
        </FirstCol>
      </RowComponent>
      <RowComponent>
        <Col className="text-center m-auto">
          <GoogleButton
            responseGoogleOnSuccess={responseGoogleOnSuccess}
            responseGoogleOnFailure={responseGoogleOnFailure}
            buttonText={buttonText}
          ></GoogleButton>
        </Col>
      </RowComponent>
      <RowComponent className="d-none d-md-block">
        <Col>
          <LoginTextComponent
            className="text-white text-center "
            orgPrimaryCoreValue={orgPrimaryCoreValue}
            encouragementThought={encouragementThought}
          />
        </Col>
      </RowComponent>
    </div>
    <div className="d-none d-sm-block d-md-none h-100">
      <Row className="h-50">
        <FirstCol className="h1 text-white">
          <LogoComponent />
        </FirstCol>
      </Row>
      <Row className="h-50">
        <Col className="text-center m-auto">
          <GoogleButton
            responseGoogleOnSuccess={responseGoogleOnSuccess}
            responseGoogleOnFailure={responseGoogleOnFailure}
            buttonText={buttonText}
          ></GoogleButton>
        </Col>
      </Row>
    </div>
  </>
);

LoginPanel.propTypes = {
  buttonText: PropTypes.string,
  orgPrimaryCoreValue: PropTypes.string,
  encouragementThought: PropTypes.string,
  responseGoogleOnSuccess: PropTypes.func.isRequired,
  responseGoogleOnFailure: PropTypes.func.isRequired,
};

LoginPanel.defaultProps = {
  buttonText: " Sign in with Google",
};

export default LoginPanel;
