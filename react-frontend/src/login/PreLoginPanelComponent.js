import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

import LogoComponent from "shared-components/peerly-Logo/LogoComponent";
import PrimaryCoreValueComponent from "shared-components/primary-core-value-components/PrimaryCoreValueComponent";
import LoginImageComponent from "login/LoginImageComponent";

const Wrapper = styled(Container)`
  height: 100vh;
`;

const Div = styled(Row)`
  height: calc(100% / 3);
`;

const PreLoginPanelComponent = ({
  orgPrimaryCoreValue,
  encouragementThought,
}) => (
  <Wrapper className="bg-dark  d-sm-block d-xs-block d-md-none">
    <Div>
      <Col className="m-auto">
        <LogoComponent />
      </Col>
    </Div>
    <Div className="overflow-hidden">
      <Col className="p-0">
        <LoginImageComponent className="img-fluid" />
      </Col>
    </Div>
    <Div>
      <Col className="m-auto">
        <PrimaryCoreValueComponent
          orgPrimaryCoreValue={orgPrimaryCoreValue}
          encouragementThought={encouragementThought}
        />
      </Col>
    </Div>
  </Wrapper>
);

PreLoginPanelComponent.propTypes = {
  orgPrimaryCoreValue: PropTypes.string,
  encouragementThought: PropTypes.string,
};

export default React.memo(PreLoginPanelComponent);
