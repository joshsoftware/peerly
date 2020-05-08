import React from "react";
import PropTypes from "prop-types";

import LabelCoreComponent from "coreComponents/LabelCoreComponent";
import ButtonCoreComponent from "coreComponents/ButtonCoreComponent";
import CoreValuesComponent from "createRecognition/CoreValuesComponent";
const CreateRecognitionCardBody = ({ cardBody }) => {
  const onClick = () => {}; //eslint-disable-line no-empty-function

  return (
    <>
      <LabelCoreComponent
        labelName={cardBody.labelName}
        ClassName={cardBody.labelClassName}
      />
      <CoreValuesComponent coreValues={cardBody.coreValues} />
      <ButtonCoreComponent
        onClick={onClick}
        buttonNameText={cardBody.toggleButtonNameText}
        value={cardBody.toggleButtonValue}
        buttonclassName={cardBody.buttonclassName}
        type={cardBody.type}
        variant={cardBody.variant}
        size={cardBody.size}
      />
      <ButtonCoreComponent
        onClick={onClick}
        buttonNameText={cardBody.addCoreValueButtonNameText}
        value={cardBody.addCoreValueButtonValue}
        buttonclassName={cardBody.buttonclassName}
        type={cardBody.type}
        variant={cardBody.variant}
        size={cardBody.size}
      />
    </>
  );
};

CreateRecognitionCardBody.propTypes = {
  cardBody: PropTypes.shape({
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
    toggleButtonNameText: PropTypes.string.isRequired,
    toggleButtonValue: PropTypes.string.isRequired,
    addCoreValueButtonNameText: PropTypes.string.isRequired,
    addCoreValueButtonValue: PropTypes.string.isRequired,
  }),
};

export default CreateRecognitionCardBody;
