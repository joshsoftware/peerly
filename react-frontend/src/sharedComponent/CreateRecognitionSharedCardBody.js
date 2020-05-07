import React from "react";
import PropTypes from "prop-types";

import ButtonCoreComponent from "coreComponents/ButtonCoreComponent";
const EmployeeNameAndImageComponent = (props) => {
  const { buttonclassName, type, value, variant, size, buttonNameText } = props;
  const onClick = () => {}; //eslint-disable-line no-empty-function
  return (
    <ButtonCoreComponent
      className={buttonclassName}
      type={type}
      value={value}
      variant={variant}
      size={size}
      buttonNameText={buttonNameText}
      onClick={onClick}
    />
  );
};

EmployeeNameAndImageComponent.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  buttonclassName: PropTypes.string,
  buttonNameText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default EmployeeNameAndImageComponent;
