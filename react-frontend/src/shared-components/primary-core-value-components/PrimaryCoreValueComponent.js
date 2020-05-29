import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Row } from "core-components/grid/GridComponent";
import { Form } from "core-components/form/FormComponent";

const HrLine = styled.hr`
  width: 10%;
  background: white;
`;

const PrimaryCoreValueComponent = ({
  className,
  orgPrimaryCoreValue,
  encouragementThought,
}) => (
  <Row className={className} data-testid="PrimaryCoreValueComponent">
    <Form.Label className="font-wight-bold h3 mx-4">
      {orgPrimaryCoreValue}
    </Form.Label>
    <HrLine />
    <Form.Label>{encouragementThought}</Form.Label>
  </Row>
);

PrimaryCoreValueComponent.defaultProps = {
  orgPrimaryCoreValue: "Lets Create the Office Positive",
  encouragementThought: "Encouragement Driven",
  className: "text-white bg-dark text-center d-flex flex-column",
};

PrimaryCoreValueComponent.propTypes = {
  className: PropTypes.string,
  orgPrimaryCoreValue: PropTypes.string.isRequired,
  encouragementThought: PropTypes.string.isRequired,
};

export default React.memo(PrimaryCoreValueComponent);
