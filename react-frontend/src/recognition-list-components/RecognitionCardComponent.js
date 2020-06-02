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
            given_for={recognition.given_for}
            given_at={recognition.given_at}
            core_value={recognition.core_value}
          />
          <ImgM className="bg-dark d-sm-block d-md-none mt-2">
            <ImageComponent
              src="https://i.picsum.photos/id/654/300/200.jpg"
              alt="CoreValueImage"
            />
          </ImgM>
          <RecognitionTextComponent
            text={recognition.text}
            given_by={recognition.given_by}
          />
        </Col>
        <Col className="d-none d-md-block">
          <Col className=" d-flex  justify-content-center">
            <Row className="d-flex flex-column">
              <ImgD>
                <ImageComponent
                  src="https://i.picsum.photos/id/654/300/200.jpg"
                  alt="CoreValueImage"
                />
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

export default React.memo(RecognitionCardComponent);
