import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const CommentBoxCoreComponent = ({ as, rows, onChange, placeholder }) => (
  <Form.Control
    as={as}
    rows={rows}
    onChange={onChange}
    placeholder={placeholder}
  />
);

CommentBoxCoreComponent.defaultProps = {
  as: "input",
  placeholder: "Enter Input",
};

CommentBoxCoreComponent.propTypes = {
  as: PropTypes.string,
  rows: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default CommentBoxCoreComponent;
