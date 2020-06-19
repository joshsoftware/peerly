import React from "react";
import PropTypes from "prop-types";

import CoreValue from "shared-components/core-value/CoreValue";

const CoreValues = ({ coreValues, setCoreValueId }) =>
  coreValues.map((coreValue, index) => (
    <CoreValue
      key={index}
      coreValueId={coreValue.id}
      coreValueName={coreValue.text}
      coreValueImageSrc={coreValue.thumbnail_url}
      setCoreValueId={setCoreValueId}
    />
  ));

CoreValues.propTypes = {
  coreValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      description: PropTypes.string,
      parent_core_value_id: PropTypes.number,
      org_id: PropTypes.number,
      thumbnail_url: PropTypes.string,
    })
  ),
};

export default CoreValues;
