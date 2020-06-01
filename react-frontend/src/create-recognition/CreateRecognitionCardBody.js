import React from "react";
import { useState } from "react";

import { Card } from "core-components/card/card";
import { Form } from "core-components/form/FormComponent";
import CoreValue from "create-recognition/coreValues";
import { Row } from "core-components/grid/GridComponent";
import { Button } from "core-components/button/ButtonComponent";

const coreValues = [
  {
    id: 1,
    coreValueName: "core Value Name 1",
  },
  {
    id: 2,
    coreValueName: "core Value Name 2",
  },
  {
    id: 3,
    coreValueName: "core Value Name 3",
  },
  {
    id: 4,
    coreValueName: "core Value Name 4",
  },
];

const CreateRecognitionCardBody = () => {
  const [comment, addComment] = useState(false);
  const onClickAddComment = () => {
    addComment(true);
  };
  return (
    <Card.Body>
      <Row className="space-around ml-5"> Select Value </Row>
      <Row className="justify-content-around mt-4">
        <CoreValue coreValues={coreValues} />
      </Row>
      <Row className="justify-content-center mt-5">
        {comment ? (
          <Form.Control as="textarea" rows="3"></Form.Control>
        ) : (
          <Button onClick={onClickAddComment}> Add Comments </Button>
        )}
      </Row>
      <Row className="justify-content-center mt-5">
        <Button> Done </Button>
      </Row>
    </Card.Body>
  );
};

export default CreateRecognitionCardBody;
