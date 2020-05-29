import React from "react";
import PropTypes from "prop-types";

import CoreValue from "shared-components/core-value/coreValue";
const CoreValues= ({ coreValues }) =>
  coreValues.map((coreValue, index) => (
    <CoreValue
      key={index}
      coreValueName={coreValue.coreValueName}
    />
  ));

CoreValues.propTypes = {
  coreValues: PropTypes.arrayOf(
    PropTypes.shape({
      coreValueName: PropTypes.string.isRequired,
    })
  ),
};

export default CoreValues;