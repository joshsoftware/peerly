import React from "react";
import PropTypes from "prop-types";

import CoreValue from "shared-components/core-value/coreValue";

const CoreValues = ({ coreValues, fontSize, backgroundColor }) =>
  coreValues.map((coreValue, index) => (
    <CoreValue
      key={index}
      coreValueName={coreValue.coreValueName}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
    />
  ));

CoreValues.propTypes = {
  coreValues: PropTypes.arrayOf(
    PropTypes.shape({
      coreValueName: PropTypes.string.isRequired,
      fontSize: PropTypes.string,
      backgroundColor: PropTypes.string,
    })
  ),
};

export default CoreValues;
