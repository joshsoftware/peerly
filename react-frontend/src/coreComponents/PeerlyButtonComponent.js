import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyButtonComponent = (props) => {
  const { value, className, type, onClick, variant, size } = props;
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
      {value}
    </Button>
  );
};

PeerlyButtonComponent.defaultProps = {
  type: "button",
  variant: "primary",
};

PeerlyButtonComponent.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
  variant: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default PeerlyButtonComponent;
