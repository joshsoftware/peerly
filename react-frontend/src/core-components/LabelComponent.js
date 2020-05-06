import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const LabelComponent = ({ text, className }) => (
  <Form.Label className={className}> {text} </Form.Label>
);

LabelComponent.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default LabelComponent;
