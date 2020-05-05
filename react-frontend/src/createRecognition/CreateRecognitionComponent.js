import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import CreateRecognitionCard from "./CreateRecognitionCard";
const CreateRecognitionComponent = () => {
  return (
    <Container>
      <Row>
        <Col xs={3}></Col>
        <Col xs={6}>
          <CreateRecognitionCard />
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
};

export default CreateRecognitionComponent;
