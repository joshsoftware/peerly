import React from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { AiOutlineMail } from "react-icons/ai";
import Styled from "styled-components";

import LogoComponent from "shared-components/peerly-logo/LogoComponent";
import ButtonComponent from "core-components/Button/ButtonComponent";
import LoginTextComponent from "shared-components/login-text-component/LoginTextComponent";
import styled from "styled-components";

const Div = Styled.div`
background: #334856;
height: auto
`;

const SecondRow = styled(Row)`
  height: 33.33%;
  @media (max-width: 768px) {
    height: 55.5%;
  }
`;
const ThirdRow = styled(Row)`
  @media (mix-width: 768px) {
    height: 33.33%;
  }
`;
const FirstRow = Styled(Row)`
  font: Helvetica Neue,Regular;
  padding-top: 1rem;
  height: 33.33%;
`;

const SignInButtonComponent = Styled(ButtonComponent)`
  border-radius: 25px;
  height: auto;
`;

const LoginPanel = ({
  buttonText,
  orgPrimaryCoreValue,
  encouragementThought,
}) => (
  <Div className="h-100 align-items-center">
    <FirstRow className="h1 text-white ">
      <LogoComponent />
    </FirstRow>
    <SecondRow className="align-items-center auto-height d-flex justify-content-center">
      <SignInButtonComponent
        className="btn-light "
        icon={<AiOutlineMail height={15} width={2} fontSize={15} />}
        text={buttonText}
      />
    </SecondRow>
    <div className="d-none d-md-block ">
      <ThirdRow className="align-items-center d-flex justify-content-center">
        <LoginTextComponent
          className="text-white text-center "
          orgPrimaryCoreValue={orgPrimaryCoreValue}
          encouragementThought={encouragementThought}
        />
      </ThirdRow>
    </div>
  </Div>
);

LoginPanel.propTypes = {
  buttonText: PropTypes.string,
  orgPrimaryCoreValue: PropTypes.string,
  encouragementThought: PropTypes.string,
};

LoginPanel.defaultProps = {
  buttonText: " Sign in with Google",
};

export default LoginPanel;
