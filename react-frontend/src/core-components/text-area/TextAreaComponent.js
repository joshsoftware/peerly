import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const TextAreaComponent = ({ text, className }) => (
  <Form.Text className={className}> {text} </Form.Text>
);

TextAreaComponent.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default TextAreaComponent;
