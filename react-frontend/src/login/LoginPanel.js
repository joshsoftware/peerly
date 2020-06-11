import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import PeerlyTextAndLogo from "shared-components/peerly-logo/PeerlyTextAndLogo";
import InformativeTextComponent from "login/InformativeTextComponent";
import { Container } from "core-components/grid/GridComponent";
import GoogleLoginButton from "login/GoogleLoginButton";

const WrapperContainer = styled(Container)`
  height: 100vh;
  background-color: var(--atomic);
`;

const LoginPanel = ({ responseGoogleOnSuccess, responseGoogleOnFailure }) => (
  <WrapperContainer
    className="flex-column justify-content-around d-flex"
    fluid={true}
  >
    <div className="mb-5">
      <PeerlyTextAndLogo theme="dark" />
    </div>
    <div className="text-center mb-3 pb-4">
      <GoogleLoginButton
        responseGoogleOnSuccess={responseGoogleOnSuccess}
        responseGoogleOnFailure={responseGoogleOnFailure}
        buttonText="Google sign in"
      ></GoogleLoginButton>
    </div>
    <InformativeTextComponent
      className="d-none d-md-block d-lg-block mt-4"
      theme="dark"
      informativeText="Lets Create the Office Positive"
      encouragementThought="Encouragement Driven"
    />
  </WrapperContainer>
);

LoginPanel.propTypes = {
  responseGoogleOnSuccess: PropTypes.func.isRequired,
  responseGoogleOnFailure: PropTypes.func.isRequired,
};

export default React.memo(LoginPanel);
