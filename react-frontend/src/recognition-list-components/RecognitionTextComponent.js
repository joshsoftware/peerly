import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row } from "react-bootstrap";
import LabelComponent from "core-components/label/LabelComponent";
import ImageComponent from "core-components/image/ImageComponent";

const Border = styled.fieldset`
  border: 1px solid;
  border-radius: 11px;
  opacity: 1;
  margin-left: 5%;
  margin-right: 5%;
`;

const Legend = styled.legend`
  width: auto;
  margin-left: 10%;
`;

const Img = styled.div`
  width: 7vh;
  margin-right: 5%;
`;

const RecognitionTextComponent = ({ recognitionText, recognitionBy }) => (
  <Row className="d-flex flex-column">
    <Border>
      <Legend>“</Legend>
      <LabelComponent text={recognitionText} className="px-2 pb-2 pt-0" />
    </Border>
    <Row className="d-flex justify-content-end">
      <LabelComponent
        text={recognitionBy.name}
        className="font-weight-bold text-dark"
      />
      <Img>
        <ImageComponent src={recognitionBy.image} roundedCircle="true" />
      </Img>
    </Row>
  </Row>
);

RecognitionTextComponent.propTypes = {
  className: PropTypes.string,
  recognitionText: PropTypes.string.isRequired,
  recognitionBy: PropTypes.object.isRequired,
};

export default React.memo(RecognitionTextComponent);
