import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import PeerlyTextAndLogo from "shared-components/peerly-logo/PeerlyTextAndLogo";
import InformativeTextComponent from "login/InformativeTextComponent";
import { Col, Row } from "core-components/grid/GridComponent";
import GoogleLoginButton from "login/GoogleLoginButton";

const RowComponent = styled(Row)`
  height: calc(100% / 3);
`;
const Wrapper = styled.div`
  background-color: var(--atomic);
`;

const LoginPanel = ({ responseGoogleOnSuccess, responseGoogleOnFailure }) => (
  <>
    <Wrapper className="d-none d-md-block  h-100">
      <RowComponent>
        <Col className="pt-3">
          <PeerlyTextAndLogo theme="dark" />
        </Col>
      </RowComponent>
      <RowComponent>
        <Col className="text-center m-auto">
          <GoogleLoginButton
            responseGoogleOnSuccess={responseGoogleOnSuccess}
            responseGoogleOnFailure={responseGoogleOnFailure}
            buttonText="Google sign in"
          />
        </Col>
      </RowComponent>
      <RowComponent>
        <Col className="my-auto">
          <InformativeTextComponent theme="dark" />
        </Col>
      </RowComponent>
    </Wrapper>
    <Wrapper className="d-block d-sm-block d-md-none h-100">
      <Row className="h-50 pt-3">
        <Col className="p-1">
          <PeerlyTextAndLogo theme="dark" />
        </Col>
      </Row>
      <Row className="h-50">
        <Col className="text-center m-auto">
          <GoogleLoginButton
            responseGoogleOnSuccess={responseGoogleOnSuccess}
            responseGoogleOnFailure={responseGoogleOnFailure}
            buttonText="Google sign in"
          ></GoogleLoginButton>
        </Col>
      </Row>
    </Wrapper>
  </>
);

LoginPanel.propTypes = {
  responseGoogleOnSuccess: PropTypes.func.isRequired,
  responseGoogleOnFailure: PropTypes.func.isRequired,
};

export default React.memo(LoginPanel);
