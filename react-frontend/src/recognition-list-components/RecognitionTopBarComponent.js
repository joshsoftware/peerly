import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

import ImageComponent from "core-components/image/ImageComponent";
import LabelComponent from "core-components/label/LabelComponent";
import ButtonComponent from "core-components/button/ButtonComponent";

const onclickMenuButton = () => {
  //todo function for menu
};

const Img = styled.div`
  hight: 12vh;
`;

const RecognitionTopBarComponent = (props) => {
  const { recognition_on, recognition_for, core_value } = props;
  return (
    <Col>
      <Row className="d-flex justify-content-end">
        <ButtonComponent
          className="bg-white font-weight-bold text-dark btn-outline-light grey"
          onClickEvent={onclickMenuButton}
          icon="..."
        />
      </Row>
      <Row className="d-flex flex-column-left">
        <Img>
          <ImageComponent
            src={recognition_for.image}
            roundedCircle="true"
            alt="profile"
          />
        </Img>
        <Row className="d-flex flex-column text-start ml-4">
          <LabelComponent
            text={recognition_for.name}
            className="font-weight-bold "
          />
          <Row className="d-flex flex-row">
            <LabelComponent text="got a high five for" />
            <LabelComponent
              text={core_value}
              className="font-weight-bold ml-1"
            />
          </Row>
          <LabelComponent text={recognition_on} className="text-muted" />
        </Row>
      </Row>
    </Col>
  );
};
RecognitionTopBarComponent.propTypes = {
  recognition_for: PropTypes.object.isRequired,
  recognition_on: PropTypes.string.isRequired,
  core_value: PropTypes.string.isRequired,
};
export default React.memo(RecognitionTopBarComponent);
