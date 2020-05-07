import React from "react";
import PropTypes from "prop-types";

const LoginLabelComponent = ({
  className,
  orgPrimaryCoreValue,
  encoragementThought,
}) => (
  <div className={className}>
    <p>
      {orgPrimaryCoreValue}
      <br />
      ___
      <h6>{encoragementThought}</h6>
    </p>
  </div>
);

LoginLabelComponent.propTypes = {
  className: PropTypes.string,
  orgPrimaryCoreValue: PropTypes.string.isRequired,
  encoragementThought: PropTypes.string.isRequired,
};

export default LoginLabelComponent;
