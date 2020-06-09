import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Row, Col } from "core-components/grid/GridComponent";
import { Card } from "core-components/card/CardComponent";
import { BsCircle } from "core-components/icon/icons";
import ImageComponent from "core-components/image/ImageComponent";
import RecognitionCardHeaderComponent from "recognition-list-components/RecognitionCardHeaderComponent";
import RecognitionTextComponent from "recognition-list-components/RecognitionTextComponent";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";

const CoreValueImage = styled(ImageComponent)`
  border-radius: 20px;
  overflow: hidden;
`;

const HighFive = styled.div`
  position: absolute;
  bottom: 50px;
`;

const CardComponent = styled(Card)`
  border-radius: 20px;
  margin: 20px 20px;
  box-shadow: 0px 5px 20px #505c623b;
  opacity: 1;
  background: #ffffff 0% 0% no-repeat padding-box;
`;

const RecognitionCardComponent = ({
  givenByName,
  givenByImage,
  givenForName,
  givenForImage,
  givenAt,
  text,
  coreValue,
  coreValueImage,
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
            className="d-sm-block d-md-none mt-2"
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
          <BsCircle size="50px" className="mt-4" />
        </Col>
      </Row>
      <HighFive>
        <HighFiveComponent />
      </HighFive>
      <Card.Footer className="bg-white">
        <span className="font-weight-bold text-muted">+</span>
        <span className="font-weight-bold text-dark">1</span>
      </Card.Footer>
    </Card.Body>
  </CardComponent>
);

RecognitionCardComponent.propTypes = {
  givenByName: PropTypes.string.isRequired,
  givenByImage: PropTypes.string,
  givenForName: PropTypes.string.isRequired,
  givenForImage: PropTypes.string,
  givenAt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  coreValue: PropTypes.string.isRequired,
  coreValueImage: PropTypes.string,
};

RecognitionCardComponent.defaultProps = {
  coreValueImage: "https://i.picsum.photos/id/654/300/200.jpg",
};

export default React.memo(RecognitionCardComponent);
