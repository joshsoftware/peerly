import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import CreateRecognitionCard from "./CreateRecognitionCard";
import PeerlyLabelComponent from "../coreComponents/PeerlyLabelComponent";
const CreateRecognitionComponent = () => {
  return (
    <Container>
      <Row>
        <Col xs={4}></Col>
        <Col xs={4}>
          <PeerlyLabelComponent labelName="Peerly" />
        </Col>
        <Col xs={4}></Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={3}></Col>
        <Col xs={5}>
          <CreateRecognitionCard />
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
};

export default CreateRecognitionComponent;
