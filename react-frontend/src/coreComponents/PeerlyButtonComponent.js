import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyButtonComponent = (props) => {
  const { buttonText, className, type, onClick, value, variant, size } = props;
  return (
    <Button
      className={className}
      type={type}
      value={value}
      variant={variant}
      size={size}
      onClick={() => {
        onClick();
      }}
    >
      {buttonText}
    </Button>
  );
};

PeerlyButtonComponent.defaultProps = {
  type: "button",
  variant: "primary",
};

PeerlyButtonComponent.propTypes = {
  type: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default PeerlyButtonComponent;
