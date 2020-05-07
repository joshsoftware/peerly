import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "@reach/menu-button/styles.css";
import ImageComponent from "./imageComponent";
import RecognitionProfileComponent from "./recognitionProfileComponent";
import RecognitionTextComponent from "./recognitionTextComponent";
import HighFiveButtonComponent from "./highFiveButtonComponent";

const RecognitionCardComponent = (props) => {
  const { object } = props;
  return (
    <Card className="mt-4 ml-2 mr-2 shadow p-3 mb-4 rounded border border-secondary bg-light grey">
      <Card.Body>
        <div className="d-flex justify-content-around">
          <div>
            <RecognitionProfileComponent
              recognition_for={object.recognition_for}
              recognition_on={object.recognition_on}
              core_value={object.core_value}
            />
            <RecognitionTextComponent
              recognition_text={object.recognition_text}
              recognition_by={object.recognition_by}
            />
          </div>
          <div className="d-flex flex-column">
            <ImageComponent src={object.pixelimage} shape="rounded" />
            <HighFiveButtonComponent />
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="bg-light grey d-flex justify-content-start ">
        <HighFiveButtonComponent />
      </Card.Footer>
    </Card>
  );
};
RecognitionCardComponent.propTypes = {
  object: PropTypes.object.isRequired,
};
export default RecognitionCardComponent;
