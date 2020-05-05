import React from "react";
import { Card, Row, Col } from "react-bootstrap";

import PeerlyDisplayImage from "../coreComponents/PeerlyDisplayImage";
import PeerlyLabelComponent from "../coreComponents/PeerlyLabelComponent";
import PeerlyButtonComponent from "../coreComponents/PeerlyButtonComponent";
const CreateRecognitionCard = () => {
  return (
    <Card>
      <Card.Header>
        <Row>
          <PeerlyDisplayImage src="" />
        </Row>
        <Row>
          <PeerlyLabelComponent labelName="Employee Name" />
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={3}>
            <PeerlyButtonComponent variant="link" buttonName="core value 1" />
          </Col>
          <Col xs={3}>
            <PeerlyButtonComponent variant="link" buttonName="core value 2" />
          </Col>
          <Col xs={3}>
            <PeerlyButtonComponent variant="link" buttonName="core value 3" />
          </Col>
          <Col xs={3}>
            <PeerlyButtonComponent variant="link" buttonName="core value 4" />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <PeerlyButtonComponent
              variant="outline-info"
              buttonName="add comments"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <PeerlyButtonComponent variant="outline-info" buttonName="Done" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CreateRecognitionCard;
