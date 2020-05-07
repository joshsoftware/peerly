import React from "react";
import PropTypes from "prop-types";

import CoreValueComponent from "sharedComponent/CoreValueComponent";
const CoreValuesComponent = ({ coreValues }) =>
  coreValues.map((coreValue, index) => (
    <CoreValueComponent key={index} labelName={coreValue.labelName} />
  ));

CoreValuesComponent.propTypes = {
  coreValues: PropTypes.arrayOf(
    PropTypes.shape({
      labelName: PropTypes.string.isRequired,
    })
  ),
};

export default CoreValuesComponent;
