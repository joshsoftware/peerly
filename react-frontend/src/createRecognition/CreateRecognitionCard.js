import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import CreateRecognitionCardHeader from "createRecognition/CreateRecognitionCardHeader";
import CreateRecognitionCardBody from "createRecognition/CreateRecognitionCardBody";

const CreateRecognitionCard = ({ cardHeader, cardBody }) => (
  <Card>
    <Card.Header>
      <CreateRecognitionCardHeader
        labelName={cardHeader.labelName}
        src={cardHeader.src}
        imgClassName={cardHeader.imgClassName}
        labelClassName={cardHeader.labelClassName}
      />
    </Card.Header>
    <Card.Body>
      <CreateRecognitionCardBody
        coreValues={cardBody.coreValues}
        labelName={cardBody.labelName}
        labelClassName={cardBody.labelName}
        buttonclassName={cardBody.buttonclassName}
        type={cardBody.type}
        variant={cardBody.variant}
        size={cardBody.size}
        buttonNameText={cardBody.buttonNameText}
        value={cardBody.value}
      />
    </Card.Body>
  </Card>
);

CreateRecognitionCard.propTypes = {
  cardHeader: PropTypes.shape({
    labelName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    imgClassName: PropTypes.string,
    labelClassName: PropTypes.string,
  }),
  cardBody: PropTypes.shape({
    coreValues: PropTypes.arrayOf(
      PropTypes.shape({
        labelName: PropTypes.string.isRequired,
      })
    ),
    labelName: PropTypes.string.isRequired,
    labelClassName: PropTypes.string,
    buttonclassName: PropTypes.string,
    type: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.oneOf(["sm", "lg"]),
    buttonNameText: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
};

export default CreateRecognitionCard;
