import React from "react";
import PropTypes from "prop-types";

import CreateRecognitionCard from "createRecognition/CreateRecognitionCard";
import CreateRecognitionSharedComponent from "sharedComponent/CreateRecognitionSharedComponent";
const CreateRecognitionComponent = ({ createRecognitionComponent }) => (
  <>
    <CreateRecognitionCard card={createRecognitionComponent.card} />
    <CreateRecognitionSharedComponent
      createRecognitionSharedComponent={
        createRecognitionComponent.createRecognitionSharedComponent
      }
    />
  </>
);

CreateRecognitionComponent.propTypes = {
  createRecognitionComponent: PropTypes.shape({
    card: PropTypes.shape({
      cardBody: PropTypes.shape({
        coreValues: PropTypes.arrayOf(
          PropTypes.shape({
            labelName: PropTypes.string.isRequired,
            labelClassName: PropTypes.string,
            IconClassName: PropTypes.string,
            Icon: PropTypes.any.isRequired,
          })
        ),
        type: PropTypes.string,
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
      cardHeader: PropTypes.shape({
        labelName: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        imgClassName: PropTypes.string,
        labelClassName: PropTypes.string,
        alt: PropTypes.string,
        height: PropTypes.string,
        width: PropTypes.string,
      }),
    }),
    createRecognitionSharedComponent: PropTypes.shape({
      src: PropTypes.string.isRequired,
      imgClassName: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string,
      variant: PropTypes.string,
      size: PropTypes.oneOf(["sm", "lg"]),
      buttonclassName: PropTypes.string,
      labelName: PropTypes.string.isRequired,
      labelClassName: PropTypes.string,
      buttonIcon: PropTypes.any.isRequired,
      hi5CountComponent: PropTypes.shape({
        availabilityStatus: PropTypes.string.isRequired,
        availabilityStatusClassName: PropTypes.string,
        src: PropTypes.string.isRequired,
        imgClassName: PropTypes.string,
        alt: PropTypes.string,
        height: PropTypes.string,
        width: PropTypes.string,
        hi5CountClassName: PropTypes.string,
        hi5Count: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default CreateRecognitionComponent;
