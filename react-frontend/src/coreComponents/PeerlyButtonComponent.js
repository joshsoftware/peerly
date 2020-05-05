import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyButtonComponent = (props) => {
  const { buttonName, className, type, onClick, value, variant, size } = props;
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
      {buttonName}
    </Button>
  );
};

PeerlyButtonComponent.defaultProps = {
  type: "button",
  buttonName: "button",
  value: "null",
  variant: "primary",
  size: "sm",
};

PeerlyButtonComponent.propTypes = {
  type: PropTypes.string,
  buttonName: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.string,
};

export default PeerlyButtonComponent;
