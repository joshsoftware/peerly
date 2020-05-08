import React from "react";
import PropTypes from "prop-types";

import CoreValueComponent from "sharedComponent/CoreValueComponent";
const CoreValuesComponent = ({ coreValues }) =>
  coreValues.map((coreValue, index) => (
    <CoreValueComponent
      key={index}
      labelName={coreValue.labelName}
      labelClassName={coreValue.labelClassName}
      IconClassName={coreValue.IconClassName}
      Icon={coreValue.Icon}
    />
  ));

CoreValuesComponent.propTypes = {
  coreValues: PropTypes.arrayOf(
    PropTypes.shape({
      labelName: PropTypes.string.isRequired,
      labelClassName: PropTypes.string,
      IconClassName: PropTypes.string,
      Icon: PropTypes.any.isRequired,
    })
  ),
};

export default CoreValuesComponent;
