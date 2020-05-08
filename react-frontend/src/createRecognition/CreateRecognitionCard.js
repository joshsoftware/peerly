import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import CreateRecognitionCardHeader from "createRecognition/CreateRecognitionCardHeader";
import CreateRecognitionCardBody from "createRecognition/CreateRecognitionCardBody";

const CreateRecognitionCard = ({ card }) => (
  <Card>
    <Card.Header>
      <CreateRecognitionCardHeader cardHeader={card.cardHeader} />
    </Card.Header>
    <Card.Body>
      <CreateRecognitionCardBody cardBody={card.cardBody} />
    </Card.Body>
  </Card>
);

CreateRecognitionCard.propTypes = {
  card: PropTypes.shape({
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
      toggleButtonNameText: PropTypes.string.isRequired,
      toggleButtonValue: PropTypes.string.isRequired,
      addCoreValueButtonNameText: PropTypes.string.isRequired,
      addCoreValueButtonValue: PropTypes.string.isRequired,
    }),
  }),
};

export default CreateRecognitionCard;
