import React from "react";
import PropTypes from "prop-types";

import LabelCoreComponent from "coreComponents/LabelCoreComponent";
import ButtonCoreComponent from "coreComponents/ButtonCoreComponent";
import CoreValuesComponent from "./CoreValuesComponent";
const CreateRecognitionCardBody = (props) => {
  const {
    coreValues,
    labelName,
    labelClassName,
    buttonclassName,
    type,
    variant,
    size,
  } = props;

  return (
    <>
      <LabelCoreComponent labelName={labelName} ClassName={labelClassName} />
      <CoreValuesComponent coreValues={coreValues} />
      <ButtonCoreComponent
        onClick={""}
        value="add comments"
        buttonclassName={buttonclassName}
        type={type}
        variant={variant}
        size={size}
      />
      <ButtonCoreComponent
        onClick={""}
        value="Done"
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
      value: PropTypes.string.isRequired,
    })
  ),
  variant: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  buttonclassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
};

export default CreateRecognitionCardBody;
