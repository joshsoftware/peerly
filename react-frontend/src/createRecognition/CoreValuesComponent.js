import React from "react";
import PropTypes from "prop-types";

const CoreValuesComponent = ({ coreValues }) => {
  return (
    <>
      {coreValues.map((coreValue, index) => (
        <div
          key={index}
          value={coreValue.value}
          labelname={coreValue.labelName}
        />
      ))}
    </>
  );
};

CoreValuesComponent.propTypes = {
  type: PropTypes.string,
  coreValues: PropTypes.arrayOf(
    PropTypes.shape({
      labelName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

export default CoreValuesComponent;
