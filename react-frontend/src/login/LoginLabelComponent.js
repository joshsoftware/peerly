import React from "react";
import PropTypes from "prop-types";

const LoginLabelComponent = ({
  className,
  primaryGole,
  encoragementThought,
}) => (
  <div className={className}>
    <p>
      {primaryGole}
      <br />
      ___
      <h6>{encoragementThought}</h6>
    </p>
  </div>
);

LoginLabelComponent.propTypes = {
  className: PropTypes.string,
  primaryGole: PropTypes.string.isRequired,
  encoragementThought: PropTypes.string.isRequired,
};

export default LoginLabelComponent;
