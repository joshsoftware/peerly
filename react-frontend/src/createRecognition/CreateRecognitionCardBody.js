import React from "react";
import PropTypes from "prop-types";

import PeerlyLabelComponent from "../coreComponents/LabelCoreComponent";
import PeerlyButtonComponent from "../coreComponents/ButtonCoreComponent";
const CreateRecognitionCardBody = (props) => {
  const {
    CoreValue,
    labelName,
    labelClassName,
    className,
    type,
    variant,
    size,
  } = props;

  return (
    <>
      <PeerlyLabelComponent labelName={labelName} ClassName={labelClassName} />
      {CoreValue.map((object) => (
        <PeerlyButtonComponent
          key={object.index}
          className={className}
          type={type}
          variant={variant}
          size={size}
          value={object.name}
        />
      ))}
      <PeerlyButtonComponent value="add comments" />
      <PeerlyButtonComponent value="Done" />
    </>
  );
};

CreateRecognitionCardBody.propTypes = {
  type: PropTypes.string,
  CoreValue: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  labelName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
};

export default CreateRecognitionCardBody;
