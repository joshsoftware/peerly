import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ButtonComponent = ({ className, type, onClick, size, text }) => (
  <Button className={className} type={type} onClick={onClick} size={size}>
    {text}
  </Button>
);

ButtonComponent.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "lg"]),
  text: PropTypes.string.isRequired,
};

export default ButtonComponent;
