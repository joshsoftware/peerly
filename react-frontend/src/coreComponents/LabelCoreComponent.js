import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const LabelCoreComponent = ({ labelName, ClassName }) => (
  <Form.Label className={ClassName}>{labelName}</Form.Label>
);

LabelCoreComponent.propTypes = {
  labelName: PropTypes.string.isRequired,
  ClassName: PropTypes.string,
};

export default LabelCoreComponent;
