import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import LogoComponent from "shared-components/peerly-Logo/LogoComponent";
import LoginTextComponent from "shared-components/login-text-component/LoginTextComponent";
import PreLoginImageComponent from "shared-components/prelogin-image-components/PreLoginImageComponent";

const RowText = styled.div`
  hight: 33%;
  width: 100%;
`;

const RowImage = styled.div`
  hight: 34%;
  width: 100%;
`;

const PreLoginPanelMobileComponent = ({
  classNameContainer,
  orgPrimaryCoreValue,
  encouragementThought,
}) => (
  <Container className={classNameContainer} fluid={true}>
    <RowText className="py-5">
      <LogoComponent />
    </RowText>
    <RowImage>
      <PreLoginImageComponent className="w-100 img-fluid" />
    </RowImage>
    <RowText className="py-5">
      <LoginTextComponent
        orgPrimaryCoreValue={orgPrimaryCoreValue}
        encouragementThought={encouragementThought}
      />
    </RowText>
  </Container>
);

PreLoginPanelMobileComponent.defaultProps = {
  classNameContainer: "bg-dark w-100",
};

PreLoginPanelMobileComponent.propTypes = {
  classNameContainer: PropTypes.string,
  orgPrimaryCoreValue: PropTypes.string,
  encouragementThought: PropTypes.string,
};

export default PreLoginPanelMobileComponent;
