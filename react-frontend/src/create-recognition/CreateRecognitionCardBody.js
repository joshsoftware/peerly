import React from "react";
import { useState } from "react";
import styled from "styled-components";

//import { store } from "root/redux-store";
import { Card } from "core-components/card/card";
import { Form } from "core-components/form/FormComponent";
import CoreValue from "create-recognition/coreValues";
import { Row } from "core-components/grid/GridComponent";
import { Button } from "core-components/button/ButtonComponent";
import Image from "shared-components/user-image-name/UserImageName";

const Wrapper = styled.section`
  margin-left: 10%;
  margin-right: 10%;
`;
const WrapperForSelectValue = styled.section`
  margin-left: 10%;
`;
const CommentBoxWrapper = styled.div`
  min-width: 50%;
`;

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
  const addCommentText = (event) => {
    addCommentText(event.target.value);
  };
  return (
    <Card.Body>
      <Image imageSrc="https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3A4f24bbbe-5873-4fcb-8c68-7b9f653271bc&params=version%3A1&token=1591156621_da39a3ee_3e2c4b5df39ff435dc9cc88b89aff4beba282da9&api_key=CometServer1"></Image>
      <Wrapper>
        <Row>
          <WrapperForSelectValue> Select Value </WrapperForSelectValue>
        </Row>
        <Row className="justify-content-around mt-4">
          <CoreValue coreValues={coreValues} />
        </Row>
        <Row className="justify-content-center mt-5">
          {comment ? (
            <CommentBoxWrapper>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={(event) => {
                  addCommentText(
                    event
                  ); /*store.dispatch({type:"add_comment",payload: event.target.value})*/
                }}
              ></Form.Control>
            </CommentBoxWrapper>
          ) : (
            <Button onClick={onClickAddComment}> Add Comments </Button>
          )}
        </Row>
        <Row className="justify-content-center mt-5">
          <Button> Done </Button>
        </Row>
      </Wrapper>
    </Card.Body>
  );
};

export default CreateRecognitionCardBody;
