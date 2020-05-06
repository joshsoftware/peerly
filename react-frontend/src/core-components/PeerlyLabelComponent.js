import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyLabelComponent = (props) => {
  const { text, className } = props;
  return <Form.Label className={className}> {text} </Form.Label>;
};

PeerlyLabelComponent.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

PeerlyLabelComponent.defaultProps = {
  text: "Peerly Label",
};

export default PeerlyLabelComponent;
