import React from "react";
import PropTypes from "prop-types";

import CoreValue from "shared-components/core-value/CoreValue";

const CoreValues = ({ coreValues, fontSize, backgroundColor }) =>
  coreValues.map((coreValue, index) => (
    <CoreValue
      key={index}
      coreValueId={coreValue.id}
      coreValueName={coreValue.coreValueName}
      coreValueImageSrc={coreValue.coreValueImageSrc}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
    />
  ));

CoreValues.propTypes = {
  coreValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      coreValueName: PropTypes.string.isRequired,
      fontSize: PropTypes.string,
      backgroundColor: PropTypes.string,
      coreValueImageSrc: PropTypes.string,
    })
  ),
};

export default CoreValues;
