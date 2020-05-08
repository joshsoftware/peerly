import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ButtonCoreComponent = (props) => {
  const {
    value,
    className,
    type,
    onClick,
    variant,
    size,
    buttonNameText,
  } = props;

  return (
    <Button
      className={className}
      type={type}
      value={value}
      variant={variant}
      size={size}
      onClick={onClick}
    >
      {buttonNameText}
    </Button>
  );
};

ButtonCoreComponent.defaultProps = {
  type: "button",
  variant: "primary",
};

ButtonCoreComponent.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
  variant: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  buttonNameText: PropTypes.string.isRequired,
};

export default ButtonCoreComponent;
