import React from "react";
import PropTypes from "prop-types";

import LabelCoreComponent from "coreComponents/LabelCoreComponent";
const CoreValueComponent = ({ labelName }) => (
  <LabelCoreComponent labelName={labelName} />
);

CoreValueComponent.propTypes = {
  labelName: PropTypes.string.isRequired,
};

export default CoreValueComponent;
