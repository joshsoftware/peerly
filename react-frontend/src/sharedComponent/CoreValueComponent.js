import React from "react";
import PropTypes from "prop-types";

import LabelCoreComponent from "coreComponents/LabelCoreComponent";
const CoreValueComponent = ({
  labelName,
  Icon,
  labelClassName,
  IconClassName,
}) => (
  <>
    <Icon className={IconClassName} />
    <LabelCoreComponent labelName={labelName} labelClassName={labelClassName} />
  </>
);

CoreValueComponent.propTypes = {
  labelName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  IconClassName: PropTypes.string,
  Icon: PropTypes.any.isRequired,
};

export default CoreValueComponent;
