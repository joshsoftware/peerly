import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Row } from "core-components/grid/GridComponent";
import { Form } from "core-components/form/FormComponent";

const HrLine = styled.hr`
  width: 10%;
  background: white;
`;

const CoreValueComponent = ({
  className,
  orgCoreValue,
  encouragementThought,
}) => (
  <Row className={className} data-testid="CoreValueComponent">
    <Form.Label className="font-wight-bold h3 mx-4">{orgCoreValue}</Form.Label>
    <HrLine />
    <Form.Label>{encouragementThought}</Form.Label>
  </Row>
);

CoreValueComponent.defaultProps = {
  orgCoreValue: "Lets Create the Office Positive",
  encouragementThought: "Encouragement Driven",
  className: "text-white bg-dark text-center d-flex flex-column",
};

CoreValueComponent.propTypes = {
  className: PropTypes.string,
  orgCoreValue: PropTypes.string.isRequired,
  encouragementThought: PropTypes.string.isRequired,
};

export default React.memo(CoreValueComponent);
