import React from "react";
import PropTypes from "prop-types";
import { AiOutlineMail } from "react-icons/ai";
import Styled from "styled-components";

import LogoComponent from "shared-components/peerly-logo/LogoComponent";
import ButtonComponent from "core-components/button/ButtonComponent";
import LoginTextComponent from "shared-components/login-text-component/LoginTextComponent";
import Col from "core-components/col/ColComponent";

const Wrapper = Styled.div`
  background: #334856;
`;
const FirstCol = Styled(Col)`
  font: Helvetica Neue,Regular;
  padding-top: 1rem;
`;
const SignInButtonComponent = Styled(ButtonComponent)`
  border-radius: 25px;
`;

const LoginPanel = ({
  buttonText,
  orgPrimaryCoreValue,
  encouragementThought,
  onClick,
}) => (
  <Wrapper className="h-100 align-items-center d-flex flex-column">
    <FirstCol className="h1 text-white">
      <LogoComponent />
    </FirstCol>
    <Col className="align-items-center d-flex justify-content-center ">
      <SignInButtonComponent
        className="btn-light"
        icon={<AiOutlineMail fontSize={15} />}
        text={buttonText}
        onClick={onClick}
      />
    </Col>
    <Col className="d-none d-md-block d-lg-block">
      <LoginTextComponent
        className="text-white text-center "
        orgPrimaryCoreValue={orgPrimaryCoreValue}
        encouragementThought={encouragementThought}
      />
    </Col>
  </Wrapper>
);

LoginPanel.propTypes = {
  buttonText: PropTypes.string,
  orgPrimaryCoreValue: PropTypes.string,
  encouragementThought: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

LoginPanel.defaultProps = {
  buttonText: " Sign in with Google",
};

export default LoginPanel;
