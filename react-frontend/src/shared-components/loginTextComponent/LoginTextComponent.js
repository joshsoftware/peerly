import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import LabelComponent from "components/core/Label/LabelComponent";

const LoginTextComponent = ({
  className,
  orgPrimaryCoreValue,
  encouragementThought,
}) => (
  <Col className={className} data-testid="LoginTextComponent">
    <LabelComponent text={orgPrimaryCoreValue} className="font-weight-bold" />
    <hr className="w-25 bg-light" />
    <LabelComponent text={encouragementThought} />
  </Col>
);

LoginTextComponent.defaultProps = {
  orgPrimaryCoreValue: "Lets Create the Office Positive",
  encouragementThought: "Encouragement Driven",
  className: "text-white text-center bg-dark",
};

LoginTextComponent.propTypes = {
  className: PropTypes.string,
  orgPrimaryCoreValue: PropTypes.string.isRequired,
  encouragementThought: PropTypes.string.isRequired,
};

export default LoginTextComponent;
