import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import CreateRecognitionSharedCardHeader from "sharedComponent/CreateRecognitionSharedCardHeader";
import CreateRecognitionSharedCardBody from "sharedComponent/CreateRecognitionSharedCardBody";
const CreateRecognitionSharedComponent = ({
  createRecognitionSharedComponent,
}) => (
  <Card>
    <Card.Header>
      <CreateRecognitionSharedCardHeader
        src={createRecognitionSharedComponent.src}
        imgClassName={createRecognitionSharedComponent.imgClassName}
        labelName={createRecognitionSharedComponent.labelName}
        labelClassName={createRecognitionSharedComponent.labelClassName}
        alt={createRecognitionSharedComponent.alt}
        height={createRecognitionSharedComponent.height}
        width={createRecognitionSharedComponent.width}
      />
    </Card.Header>
    <Card.Body>
      <CreateRecognitionSharedCardBody
        className={createRecognitionSharedComponent.buttonclassName}
        type={createRecognitionSharedComponent.type}
        value={createRecognitionSharedComponent.value}
        variant={createRecognitionSharedComponent.variant}
        size={createRecognitionSharedComponent.size}
        buttonNameText={createRecognitionSharedComponent.buttonNameText}
      />
    </Card.Body>
  </Card>
);

CreateRecognitionSharedComponent.propTypes = {
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
    alt: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    buttonNameText: PropTypes.string.isRequired,
  }),
};

export default CreateRecognitionSharedComponent;
