import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import ImageComponent from "../core-component/imageComponent";
import RecognitionProfileComponent from "./recognitionProfileComponent";
import RecognitionByComponent from "./recognitionByComponent";
import RecognitionTextComponent from "./recognitionTextComponent";
import HighFiveButtonComponent from "./highFiveButtonComponent";

const RecognitionCardComponent = (props) => {
  const { recognition } = props;
  return (
    <Card className="mt-4 ml-2 mr-2 shadow p-3 mb-4 rounded border border-secondary bg-light grey">
      <Card.Body className="d-flex justify-content-around">
        <div>
          <RecognitionProfileComponent
            recognition_for={recognition.recognition_for}
            recognition_on={recognition.recognition_on}
            core_value={recognition.core_value}
            highFiveText={recognition.highFiveText}
          />
          <RecognitionTextComponent
            recognition_text={recognition.recognition_text}
          />
          <RecognitionByComponent recognition_by={recognition.recognition_by} />
        </div>
        <div className="d-flex flex-column">
          <ImageComponent
            src={recognition.rightColumnImage}
            className="rounded"
          />
        </div>
      </Card.Body>
      <Card.Footer className="bg-light grey d-flex justify-content-start ">
        <HighFiveButtonComponent
          src={recognition.highFiveImage}
          highFiveIncrement="+1"
        />
      </Card.Footer>
    </Card>
  );
};
RecognitionCardComponent.propTypes = {
  recognition: PropTypes.object.isRequired,
};
export default RecognitionCardComponent;
