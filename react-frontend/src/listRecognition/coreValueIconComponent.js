import React from "react";
import PropTypes from "prop-types";
import { MdBlurOn } from "react-icons/md";
import { Form } from "react-bootstrap";

const CoreValueIconComponent = (props) => {
  const { size, color, className } = props;
  return (
    <div>
      <Form.Label className={className}>
        <MdBlurOn size={size} color={color} />
      </Form.Label>
    </div>
  );
};

CoreValueIconComponent.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CoreValueIconComponent;
