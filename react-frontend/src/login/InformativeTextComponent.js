import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Row } from "core-components/grid/GridComponent";

const HrLine = styled.hr`
  width: 10%;
  background: white;
`;

const H3 = styled.h3`
  margin: 2% 20% 0%;
`;

const InformativeTextComponent = ({
  className,
  informativeText,
  encouragementThought,
}) => (
  <Row className={className}>
    <H3>{informativeText}</H3>
    <HrLine />
    <h6>{encouragementThought}</h6>
  </Row>
);

InformativeTextComponent.defaultProps = {
  informativeText: "Lets Create the Office Positive",
  encouragementThought: "Encouragement Driven",
  className: "text-white bg-dark text-center d-flex flex-column",
};

InformativeTextComponent.propTypes = {
  className: PropTypes.string,
  informativeText: PropTypes.string.isRequired,
  encouragementThought: PropTypes.string.isRequired,
};

export default React.memo(InformativeTextComponent);
