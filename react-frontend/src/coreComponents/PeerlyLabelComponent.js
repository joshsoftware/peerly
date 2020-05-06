import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyLabelComponent = ({ labelName, labelClassName }) => (
  <Form.Label className={labelClassName}>{labelName}</Form.Label>
);

PeerlyLabelComponent.propTypes = {
  labelName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
};

export default PeerlyLabelComponent;
