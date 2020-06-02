import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Row, Col } from "core-components/grid/GridComponent";
import { Card } from "core-components/card/CardComponent";
import ImageComponent from "core-components/image/ImageComponent";
import RecognitionCardHeaderComponent from "recognition-list-components/RecognitionCardHeaderComponent";
import RecognitionTextComponent from "recognition-list-components/RecognitionTextComponent";
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

const RecognitionCardComponent = ({
  given_by,
  given_for,
  given_at,
  text,
  core_value,
  high_five_count,
}) => (
  <Card
    className="my-4 mx-2 shadow p-3 mb-4 border border-secondary bg-light grey"
    style={{ borderRadius: "36px" }}
  >
    <Card.Body>
      <Row>
        <Col sm="12" md="7">
          <RecognitionCardHeaderComponent
            given_for={given_for}
            given_at={given_at}
            core_value={core_value}
          />
          <ImgM className="bg-dark d-sm-block d-md-none mt-2">
            <ImageComponent
              src="https://i.picsum.photos/id/654/300/200.jpg"
              alt="CoreValueImage"
            />
          </ImgM>
          <RecognitionTextComponent text={text} given_by={given_by} />
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
              <Col className="d-flex justify-content-center mt-4">
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
      <span className="font-weight-bold text-dark">{high_five_count}</span>
    </Card.Footer>
  </Card>
);

RecognitionCardComponent.propTypes = {
  given_by: PropTypes.string.isRequired,
  given_for: PropTypes.string.isRequired,
  given_at: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  core_value: PropTypes.string.isRequired,
  high_five_count: PropTypes.string.isRequired,
};

export default React.memo(RecognitionCardComponent);
