import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Row, Col } from "core-components/grid/GridComponent";
import { Card } from "core-components/card/CardComponent";
import ImageComponent from "core-components/image/ImageComponent";
import RecognitionTopBarComponent from "./RecognitionTopBarComponent";
import RecognitionTextComponent from "./RecognitionTextComponent";
import CoreValueIconComponent from "shared-components/core-value-icon-components/CoreValueIconComponent";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";

const giveHighFive = () => {
  //to to for give high five
};

const ImgD = styled.div`
  border-radius: 20px;
  height: auto;
  width: auto;
  overflow: hidden;
`;

const ImgM = styled.div`
  border-radius: 20px;
  height: auto;
  width: auto;
  overflow: hidden;
`;

const HighFive = styled.div`
  position: absolute;
  bottom: 50px;
`;

const RecognitionCardComponent = ({ recognition }) => (
  <Card
    className="my-4 mx-2 shadow p-3 mb-4 border border-secondary bg-light grey"
    style={{ borderRadius: "36px" }}
  >
    <Card.Body>
      <Row>
        <Col sm="12" md="7">
          <RecognitionTopBarComponent
            recognitionForName={recognition.recognitionForName}
            recognitionForImage={recognition.recognitionForImage}
            recognitionOn={recognition.recognitionOn}
            coreValue={recognition.coreValue}
          />
          <ImgM className="bg-dark d-sm-block d-md-none mt-2">
            <ImageComponent src={recognition.coreValueImage} />
          </ImgM>
          <RecognitionTextComponent
            recognitionText={recognition.recognitionText}
            recognitionByName={recognition.recognitionByName}
            recognitionByImage={recognition.recognitionByImage}
          />
        </Col>
        <Col className="d-none d-md-block">
          <Col className=" d-flex  justify-content-center">
            <Row className="d-flex flex-column">
              <ImgD>
                <ImageComponent src={recognition.coreValueImage} />
              </ImgD>
              <Col className="d-flex justify-content-center align-items-center">
                <CoreValueIconComponent size="50px" color="red" />
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
      <HighFive onClick={giveHighFive}>
        <HighFiveComponent />
      </HighFive>
    </Card.Body>
    <Card.Footer className="bg-light grey">
      <span className="font-weight-bold text-muted">+</span>
      <span className="font-weight-bold text-dark">
        {recognition.highFiveCount}
      </span>
    </Card.Footer>
  </Card>
);

RecognitionCardComponent.propTypes = {
  recognition: PropTypes.object.isRequired,
};

RecognitionCardComponent.defaultProps = {
  coreValueImage: "https://i.picsum.photos/id/654/300/200.jpg",
};

export default React.memo(RecognitionCardComponent);
