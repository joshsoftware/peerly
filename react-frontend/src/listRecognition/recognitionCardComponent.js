import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import ImageComponent from "../core-component/imageComponent";
import HighFiveButtonComponent from "./highFiveButtonComponent";
import RecognitionCardHeaderComponent from "./recogntionCardHeaderComponent";
import RecognitionCardBodyComponent from "./recognitionCardBodyComponent";

const onclickHighFiveButton = () => {
  //todo function for increase high five count
};
const RecognitionCardComponent = (props) => {
  const { recognition } = props;
  return (
    <div>
      {/*for web version*/}
      <div className="d-none d-md-block">
        <Card className="mt-4 ml-2 mr-2 shadow p-3 mb-4 rounded border border-secondary bg-light grey">
          <Card.Body className="d-flex justify-content-around">
            <div>
              <RecognitionCardHeaderComponent
                recognition_for={recognition.recognition_for}
                recognition_on={recognition.recognition_on}
                core_value={recognition.core_value}
                highFiveText={recognition.highFiveText}
              />
              <RecognitionCardBodyComponent
                recognition_text={recognition.recognition_text}
                recognition_by={recognition.recognition_by}
              />
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
              iconImage={recognition.highFiveImage}
              highFiveIncrement={recognition.highFiveIncrement}
              buttonClassName="bg-light grey btn-sm font-weight-bold text-dark btn-outline-light grey"
              onClickEvent={onclickHighFiveButton}
            />
          </Card.Footer>
        </Card>
      </div>

      {/* for mobile version */}
      <div className=" d-sm-block d-md-none">
        <Card className="mt-4 ml-2 mr-2 shadow p-3 mb-4 rounded border border-secondary bg-light grey">
          <Card.Body className="d-flex justify-content-around">
            <div>
              <RecognitionCardHeaderComponent
                recognition_for={recognition.recognition_for}
                recognition_on={recognition.recognition_on}
                core_value={recognition.core_value}
                highFiveText={recognition.highFiveText}
              />
              <ImageComponent
                src={recognition.rightColumnImage}
                className="rounded"
              />
              <RecognitionCardBodyComponent
                recognition_text={recognition.recognition_text}
                recognition_by={recognition.recognition_by}
              />
            </div>
          </Card.Body>
          <Card.Footer className="bg-light grey d-flex justify-content-start ">
            <HighFiveButtonComponent
              iconImage={recognition.highFiveImage}
              highFiveIncrement={recognition.highFiveIncrement}
              buttonClassName="bg-light grey btn-sm font-weight-bold text-dark btn-outline-light grey"
              onClickEvent={onclickHighFiveButton}
            />
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};
RecognitionCardComponent.propTypes = {
  recognition: PropTypes.object.isRequired,
};
export default RecognitionCardComponent;
