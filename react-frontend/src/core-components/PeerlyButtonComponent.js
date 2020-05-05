import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PeerlyButtonComponent = (props) => {
  const { className, type, onClick, value, size, text } = props;

  return (
    <Button
      className={className}
      type={type}
      onClick={() => {
        if (value) onClick(value);
        else onClick();
      }}
      size={size}
    >
      {text}
    </Button>
  );
};

PeerlyButtonComponent.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.any,
  size: PropTypes.string,
  text: PropTypes.string,
};

PeerlyButtonComponent.defaultProps = {
  type: "submit",
  text: "Submit",
  size: "sm",
};

export default PeerlyButtonComponent;
