import React from "react";
import PropTypes from "prop-types";

import LabelCoreComponent from "../coreComponents/LabelCoreComponent";
import ButtonCoreComponent from "../coreComponents/ButtonCoreComponent";
const CreateRecognitionCardBody = (props) => {
  const {
    CoreValue,
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
      {CoreValue.map((object) => (
        <ButtonCoreComponent
          key={object.index}
          className={buttonclassName}
          type={type}
          variant={variant}
          size={size}
          value={object.name}
        />
      ))}
      {CoreValue.map((object) => (
        <LabelCoreComponent
          key={object.index}
          labelName={object.labelName}
          ClassName={object.labelClassName}
        />
      ))}
      <ButtonCoreComponent value="add comments" />
      <ButtonCoreComponent value="Done" />
    </>
  );
};

CreateRecognitionCardBody.propTypes = {
  type: PropTypes.string,
  CoreValue: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  buttonclassName: PropTypes.string,
  onClick: PropTypes.func,
  labelName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
};

export default CreateRecognitionCardBody;
