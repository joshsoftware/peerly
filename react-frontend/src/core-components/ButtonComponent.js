import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyButtonComponent = ({ className, type, onClick, size, text }) => (
  <Button
    className={className}
    type={type}
    onClick={() => {
      onClick();
    }}
    size={size}
  >
    {text}
  </Button>
);

PeerlyButtonComponent.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "lg"]),
  text: PropTypes.string.isRequired,
};

export default PeerlyButtonComponent;
