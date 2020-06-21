import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Row, Col } from "core-components/grid/GridComponent";
import { Card } from "core-components/card/CardComponent";
import ImageComponent from "core-components/image/ImageComponent";
import RecognitionCardHeaderComponent from "recognition-list-components/RecognitionCardHeaderComponent";
import RecognitionTextComponent from "recognition-list-components/RecognitionTextComponent";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";

const CoreValueImage = styled(ImageComponent)`
  border-radius: 20px;
  overflow: hidden;
`;

const HighFive = styled(HighFiveComponent)`
  position: absolute;
  bottom: 50px;
`;

const CardComponent = styled(Card)`
  border-radius: 20px;
  margin: 20px 20px;
  box-shadow: 0px 5px 20px var(--box-shadow-color);
  opacity: 1;
  background: var(--white) 0% 0% no-repeat padding-box;
`;

const RecognitionCardComponent = ({
  recognitionId,
  giveHi5func,
  givenByName,
  givenByImage,
  givenForName,
  givenForImage,
  givenAt,
  text,
  coreValue,
  coreValueImage,
  hi5Count,
}) => (
  <CardComponent>
    <Card.Body>
      <Row>
        <Col sm="12" md="7">
          <RecognitionCardHeaderComponent
            givenAt={givenAt}
            givenForName={givenForName}
            coreValue={coreValue}
            givenForImage={givenForImage}
          />
          <CoreValueImage
            src={coreValueImage}
            alt="Core value"
            className="d-sm-block d-xs-block d-md-none mt-2"
          />
          <RecognitionTextComponent
            givenByImage={givenByImage}
            givenByName={givenByName}
            text={text}
          />
        </Col>
        <Col className="d-none d-md-block text-center">
          <div>
            <CoreValueImage
              src={coreValueImage}
              alt="Core value"
              className="mt-2"
            />
          </div>
        </Col>
      </Row>
      <div /* eslint-disable-line  jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
        onClick={(e) => {
          e.preventDefault();
          giveHi5func(recognitionId);
        }}
      >
        <HighFive />
      </div>
      <Card.Footer className="bg-white">
        <span className="font-weight-bold text-muted">+</span>
        <span className="font-weight-bold text-dark">{hi5Count}</span>
      </Card.Footer>
    </Card.Body>
  </CardComponent>
);

RecognitionCardComponent.propTypes = {
  recognitionId: PropTypes.number.isRequired,
  giveHi5func: PropTypes.func.isRequired,
  givenByName: PropTypes.string.isRequired,
  givenByImage: PropTypes.string,
  givenForName: PropTypes.string.isRequired,
  givenForImage: PropTypes.string,
  givenAt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  coreValue: PropTypes.string.isRequired,
  coreValueImage: PropTypes.string,
  hi5Count: PropTypes.number,
};

RecognitionCardComponent.defaultProps = {
  coreValueImage: "https://i.picsum.photos/id/654/300/200.jpg",
  recognitionId: 5,
};

export default React.memo(RecognitionCardComponent);
