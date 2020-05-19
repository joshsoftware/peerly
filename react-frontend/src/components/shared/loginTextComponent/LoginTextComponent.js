import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "components/core/Label/LabelComponent";

const LoginTextComponent = ({
  className,
  orgPrimaryCoreValue,
  encouragementThought,
}) => (
  <div className={className} data-testid="LoginTextComponent">
    <LabelComponent text={orgPrimaryCoreValue} />
    <hr className="w-25 bg-light" />
    <LabelComponent text={encouragementThought} />
  </div>
);

LoginTextComponent.propTypes = {
  className: PropTypes.string,
  orgPrimaryCoreValue: PropTypes.string.isRequired,
  encouragementThought: PropTypes.string.isRequired,
};

export default LoginTextComponent;
