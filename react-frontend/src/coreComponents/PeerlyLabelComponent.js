import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyLabelComponent = (props) => {
  const { labelName, labelClassName } = props;
  return <Form.Label className={labelClassName}>{labelName}</Form.Label>;
};

PeerlyLabelComponent.defaultProps = {
  labelName: "No Label",
};

PeerlyLabelComponent.propTypes = {
  labelName: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default PeerlyLabelComponent;
