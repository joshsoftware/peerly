import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Row } from "core-components/grid/GridComponent";
import { Form } from "core-components/form/FormComponent";
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

const RecognitionTextComponent = ({ text, given_by }) => (
  <Row className="d-flex flex-column">
    <Border>
      <Legend>“</Legend>
      <Form.Label className="px-2 pb-2 pt-0">{text}</Form.Label>
    </Border>
    <Row className="d-flex justify-content-end">
      <Form.Label className="font-weight-bold text-dark">{given_by}</Form.Label>
      <Img>
        <ImageComponent
          src="https://i.picsum.photos/id/2/200/200.jpg"
          roundedCircle={true}
          alt="Profile"
        />
      </Img>
    </Row>
  </Row>
);

RecognitionTextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  given_by: PropTypes.string.isRequired,
};

export default React.memo(RecognitionTextComponent);
