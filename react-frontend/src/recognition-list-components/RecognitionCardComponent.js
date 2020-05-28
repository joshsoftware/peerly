import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Card, Col } from "react-bootstrap";
import ImageComponent from "core-components/image/ImageComponent";
import RecognitionTopBarComponent from "./RecognitionTopBarComponent";
import RecognitionTextComponent from "./RecognitionTextComponent";
import CoreValueIconComponent from "shared-components/core-value-icon-components/CoreValueIconComponent";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";

const ImgD = styled.div`
  border-radius: 20px;
  height: 70%;
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

const RecognitionCardComponent = ({
  recognitionFor,
  recognitionBy,
  recognitionOn,
  recognitionText,
  coreValue,
  highFiveCount,
  image,
}) => (
  <Card
    className="my-4 mx-2 shadow p-3 mb-4 border border-secondary bg-light grey"
    style={{ borderRadius: "36px" }}
  >
    <Card.Body>
      <Row>
        <Col sm="12" md="7">
          <RecognitionTopBarComponent
            recognitionFor={recognitionFor}
            recognitionOn={recognitionOn}
            coreValue={coreValue}
          />
          <ImgM className="bg-dark d-sm-block d-md-none mt-2">
            <ImageComponent src={image} />
          </ImgM>
          <RecognitionTextComponent
            recognitionText={recognitionText}
            recognitionBy={recognitionBy}
          />
        </Col>
        <Col className="d-none d-md-block">
          <Col className=" d-flex  justify-content-center">
            <Row className="d-flex flex-column">
              <ImgD>
                <ImageComponent src={image} />
              </ImgD>
              <Col className="d-flex justify-content-center align-items-center">
                <CoreValueIconComponent size="50px" color="red" />
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
      <HighFive>
        <HighFiveComponent />
      </HighFive>
    </Card.Body>
    <Card.Footer className="bg-light grey">
      <span className="font-weight-bold text-muted">+</span>
      <span className="font-weight-bold text-dark">{highFiveCount}</span>
    </Card.Footer>
  </Card>
);

RecognitionCardComponent.propTypes = {
  recognitionFor: PropTypes.object.isRequired,
  recognitionBy: PropTypes.object.isRequired,
  recognitionOn: PropTypes.string.isRequired,
  recognitionText: PropTypes.string.isRequired,
  coreValue: PropTypes.string.isRequired,
  highFiveCount: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default React.memo(RecognitionCardComponent);
