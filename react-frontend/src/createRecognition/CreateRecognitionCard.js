import React from "react";
import { Card } from "react-bootstrap";

import CreateRecognitionCardHeader from "./CreateRecognitionCardHeader";
import CreateRecognitionCardBody from "./CreateRecognitionCardBody";
const CreateRecognitionCard = () => (
  <Card>
    <Card.Header>
      <CreateRecognitionCardHeader />
    </Card.Header>
    <Card.Body>
      <CreateRecognitionCardBody />
    </Card.Body>
  </Card>
);

export default CreateRecognitionCard;
