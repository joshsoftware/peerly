import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import CreateRecognitionCard from "./CreateRecognitionCard";
const CreateRecognitionComponent = () => (
  <Container>
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

export default CreateRecognitionComponent;
