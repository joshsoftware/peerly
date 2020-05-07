import React from "react";
import PropTypes from "prop-types";

import LabelCoreComponent from "coreComponents/LabelCoreComponent";
import ButtonCoreComponent from "coreComponents/ButtonCoreComponent";
import CoreValuesComponent from "createRecognition/CoreValuesComponent";
const CreateRecognitionCardBody = (props) => {
  const {
    coreValues,
    buttonNameText,
    labelName,
    labelClassName,
    buttonclassName,
    type,
    variant,
    size,
    value,
  } = props;
  const onClick = () => {}; //eslint-disable-line no-empty-function
  return (
    <>
      <LabelCoreComponent labelName={labelName} ClassName={labelClassName} />
      <CoreValuesComponent coreValues={coreValues} />
      <ButtonCoreComponent
        onClick={onClick}
        buttonNameText={buttonNameText}
        value={value}
        buttonclassName={buttonclassName}
        type={type}
        variant={variant}
        size={size}
      />
      <ButtonCoreComponent
        onClick={onClick}
        buttonNameText={buttonNameText}
        value={value}
        buttonclassName={buttonclassName}
        type={type}
        variant={variant}
        size={size}
      />
    </>
  );
};

CreateRecognitionCardBody.propTypes = {
  type: PropTypes.string,
  coreValues: PropTypes.arrayOf(
    PropTypes.shape({
      labelName: PropTypes.string.isRequired,
    })
  ),
  variant: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  buttonclassName: PropTypes.string,
  labelName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  buttonNameText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CreateRecognitionCardBody;
