import React from "react";
import PropTypes from "prop-types";

const LoginLabelComponent = ({
  className,
  orgPrimaryCoreValue,
  encoragementThought,
}) => (
  <div className={className}>
    <span>
      {orgPrimaryCoreValue}
      <hr className="w-25 bg-light" />
      <h6>{encoragementThought}</h6>
    </span>
  </div>
);

LoginLabelComponent.propTypes = {
  className: PropTypes.string,
  orgPrimaryCoreValue: PropTypes.string.isRequired,
  encoragementThought: PropTypes.string.isRequired,
};

export default LoginLabelComponent;
