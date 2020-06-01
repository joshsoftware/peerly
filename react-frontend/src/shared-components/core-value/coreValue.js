import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import CoreValueIcon from "shared-components/core-value-icon/coreValueIconComponent";
import { Row, Container } from "core-components/grid/GridComponent";

const Wrapper = Styled.div`
  max-width:75px;
  min-height:75px;
  border-radius: 10px;
  border: 3px solid black;
  display: flex;
  text-align: center;
  font-size: 0.75em;
`;

const CoreValueComponent = ({ coreValueName }) => {
  const onClick = () => {
    onClick(10);
  };

  return (
    <Wrapper onClick={onClick}>
      <Container>
        <Row className="justify-content-center mt-1">
          <CoreValueIcon size="30" color="red" />
        </Row>
        <Row className="justify-content-center mt-2">{coreValueName}</Row>
      </Container>
    </Wrapper>
  );
};

CoreValueComponent.propTypes = {
  coreValueName: PropTypes.string.isRequired,
};

export default CoreValueComponent;
