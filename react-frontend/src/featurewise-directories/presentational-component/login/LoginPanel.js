import React from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { AiOutlineMail } from "react-icons/ai";
import Styled from "styled-components";

import LogoComponent from "shared-components/peerly-Logo/LogoComponent";
import ButtonComponent from "core-components/Button/ButtonComponent";
import LoginTextComponent from "shared-components/loginTextComponent/LoginTextComponent";

const StyledDiv = Styled.div`
background: #334856
`;

const FirstRow = Styled(Row)`
font: Helvetica Neue,Regular 
`;
const ButtonComponent2 = Styled(ButtonComponent)`
height: 40px
`;

const LoginPanel = ({ buttonText }) => (
  <StyledDiv className="h-100">
    <FirstRow className="h1 text-white">
      <LogoComponent />
    </FirstRow>
    <Row className="justify-content-center h-50">
      <ButtonComponent2
        className="btn-light "
        icon={<AiOutlineMail height={15} width={2} />}
        text={buttonText}
      />
    </Row>
    <Row className="">
      <LoginTextComponent className="text-white text-center" />
    </Row>
  </StyledDiv>
);

LoginPanel.propTypes = {
  buttonText: PropTypes.string,
};

LoginPanel.defaultProps = {
  buttonText: "Sign in with Google",
};

export default LoginPanel;
