import React from "react";
import PropTypes from "prop-types";
import { BsCircle } from "react-icons/bs";

const CoreValueIconComponent = (props) => {
  const { size, color } = props;
  return <BsCircle size={size} color={color} data-testid="CoreValueIcon" />;
};

CoreValueIconComponent.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CoreValueIconComponent;
