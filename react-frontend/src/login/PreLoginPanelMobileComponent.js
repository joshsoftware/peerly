import React from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import LogoComponent from "shared-components/peerly-Logo/LogoComponent";
import PrimaryCoreValueComponent from "shared-components/primary-core-value-components/PrimaryCoreValueComponent";
import PreLoginImageComponent from "shared-components/prelogin-image-components/PreLoginImageComponent";

const Wrapper = styled.div`
  height: 100vh;
`;

const PreLoginPanelMobileComponent = ({
  orgPrimaryCoreValue,
  encouragementThought,
}) => (
  <Wrapper className="bg-dark d-flex flex-column" fluid={true}>
    <Col className=" d-flex justify-content-center align-items-center">
      <LogoComponent />
    </Col>
    <Col className="d-flex justify-content-center align-items-center">
      <PreLoginImageComponent className="img-fluid" />
    </Col>
    <Col className="d-flex justify-content-center align-items-center ">
      <PrimaryCoreValueComponent
        orgPrimaryCoreValue={orgPrimaryCoreValue}
        encouragementThought={encouragementThought}
      />
    </Col>
  </Wrapper>
);

PreLoginPanelMobileComponent.propTypes = {
  orgPrimaryCoreValue: PropTypes.string,
  encouragementThought: PropTypes.string,
};

export default React.memo(PreLoginPanelMobileComponent);
