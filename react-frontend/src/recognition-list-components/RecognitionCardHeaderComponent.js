import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Row, Col } from "core-components/grid/GridComponent";
import { Form } from "core-components/form/FormComponent";
import { Button } from "core-components/button/ButtonComponent";
import ImageComponent from "core-components/image/ImageComponent";

const onclickMenuButton = () => {
  //todo function for menu
};

const Img = styled.div`
  width: 12vh;
`;

const RecognitionCardHeaderComponent = ({
  given_at,
  given_for,
  core_value,
}) => {
  return (
    <Row>
      <Col>
        <Row className="d-flex justify-content-end">
          <Button
            className="bg-white font-weight-bold text-dark btn-outline-light grey"
            onClick={onclickMenuButton}
          >
            ...
          </Button>
        </Row>
        <Row className="d-flex flex-column-left">
          <Img>
            <ImageComponent
              src="https://i.picsum.photos/id/2/200/200.jpg"
              roundedCircle={true}
              alt="Profile"
            />
          </Img>
          <Row className="d-flex flex-column text-start ml-4">
            <Form.Label className="font-weight-bold ">{given_for}</Form.Label>
            <Row className=" d-sm-block d-xs-block d-md-none">
              <Row className="d-flex flex-column ml-2">
                <Form.Label>got a high five for</Form.Label>
                <Form.Label className="font-weight-bold ml-1">
                  {core_value}
                </Form.Label>
              </Row>
            </Row>
            <Row className="d-none d-md-block d-{sm,xs}-none">
              <Row className="d-flex flex-row ml-2">
                <Form.Label>got a high five for</Form.Label>
                <Form.Label className="font-weight-bold ml-1">
                  {core_value}
                </Form.Label>
              </Row>
            </Row>
            <Form.Label className="text-muted">{given_at}</Form.Label>
          </Row>
        </Row>
      </Col>
    </Row>
  );
};
RecognitionCardHeaderComponent.propTypes = {
  given_for: PropTypes.string.isRequired,
  given_at: PropTypes.string.isRequired,
  core_value: PropTypes.string.isRequired,
};

export default React.memo(RecognitionCardHeaderComponent);
