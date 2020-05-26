import React from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import LabelComponent from "core-components/Label/LabelComponent";

const HrLine = styled.hr`
  width: 10%;
  background: white;
`;

const LoginTextComponent = ({
  className,
  orgPrimaryCoreValue,
  encouragementThought,
}) => (
  <Row className={className} data-testid="LoginTextComponent">
    <LabelComponent
      text={orgPrimaryCoreValue}
      className="font-wight-bold h3 mx-4"
    />
    <HrLine />
    <LabelComponent text={encouragementThought} />
  </Row>
);

LoginTextComponent.defaultProps = {
  orgPrimaryCoreValue: "Lets Create the Office Positive",
  encouragementThought: "Encouragement Driven",
  className: "text-white text-center d-flex flex-column",
};

LoginTextComponent.propTypes = {
  className: PropTypes.string,
  orgPrimaryCoreValue: PropTypes.string.isRequired,
  encouragementThought: PropTypes.string.isRequired,
};

export default LoginTextComponent;
