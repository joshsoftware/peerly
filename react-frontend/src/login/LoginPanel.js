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
const FirstCol = styled(Col)`
  padding-top: 1rem;
`;
const Wrapper = styled.div`
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--atomic)" : "var(--white)"};
`;

const LoginPanel = ({
  buttonText,
  informativeText,
  encouragementThought,
  responseGoogleOnSuccess,
  responseGoogleOnFailure,
  theme,
}) => (
  <>
    <Wrapper className="d-none d-md-block  h-100" theme={theme}>
      <RowComponent>
        <FirstCol>
          <PeerlyTextAndLogo theme={theme} />
        </FirstCol>
      </RowComponent>
      <RowComponent>
        <Col className="text-center m-auto">
          <GoogleLoginButton
            responseGoogleOnSuccess={responseGoogleOnSuccess}
            responseGoogleOnFailure={responseGoogleOnFailure}
            buttonText={buttonText}
          ></GoogleLoginButton>
        </Col>
      </RowComponent>
      <RowComponent>
        <Col>
          <InformativeTextComponent
            informativeText={informativeText}
            encouragementThought={encouragementThought}
            theme={theme}
          />
        </Col>
      </RowComponent>
    </Wrapper>
    <Wrapper className="d-block d-sm-block d-md-none h-100" theme={theme}>
      <Row className="h-50">
        <FirstCol>
          <PeerlyTextAndLogo theme={theme} />
        </FirstCol>
      </Row>
      <Row className="h-50">
        <Col className="text-center m-auto">
          <GoogleLoginButton
            responseGoogleOnSuccess={responseGoogleOnSuccess}
            responseGoogleOnFailure={responseGoogleOnFailure}
            buttonText={buttonText}
          ></GoogleLoginButton>
        </Col>
      </Row>
    </Wrapper>
  </>
);

LoginPanel.propTypes = {
  buttonText: PropTypes.string,
  informativeText: PropTypes.string,
  encouragementThought: PropTypes.string,
  responseGoogleOnSuccess: PropTypes.func.isRequired,
  responseGoogleOnFailure: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["dark", "light"]),
};

LoginPanel.defaultProps = {
  buttonText: " Sign in with Google",
  theme: "dark",
};

export default React.memo(LoginPanel);
