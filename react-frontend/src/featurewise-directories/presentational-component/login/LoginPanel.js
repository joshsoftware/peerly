import React from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { AiOutlineMail } from "react-icons/ai";
import Styled from "styled-components";

import LogoComponent from "shared-components/peerly-Logo/LogoComponent";
import ButtonComponent from "core-components/Button/ButtonComponent";
import LoginTextComponent from "shared-components/loginTextComponent/LoginTextComponent";

const Div = Styled.div`
background: #334856;
height: auto
`;

const FirstRow = Styled(Row)`
font: Helvetica Neue,Regular;
height: auto
`;
const SignInButtonComponent = Styled(ButtonComponent)`
border-radius: 25px;

`;

const LoginPanel = ({ buttonText }) => (
  <Div className="h-100 align-items-center">
    <FirstRow className="h1 text-white ">
      <LogoComponent />
    </FirstRow>
    <Div className="h-25 d-sm-block d-md-none"></Div>
    <Row className="justify-content-center h-50">
      <div className="align-items-center d-flex justify-content-center">
        <SignInButtonComponent
          className="btn-light "
          icon={<AiOutlineMail height={15} width={2} />}
          text={buttonText}
        />
      </div>
    </Row>
    <Row className="d-none d-md-block h-25">
      <LoginTextComponent className="text-white text-center" />
    </Row>
  </Div>
);

LoginPanel.propTypes = {
  buttonText: PropTypes.string,
};

LoginPanel.defaultProps = {
  buttonText: "Sign in with Google",
};

export default LoginPanel;
