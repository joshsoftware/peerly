import React from "react";
import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";

import ImageComponent from "core-components/image/ImageComponent";
import { Card } from "core-components/card/card";
import { Form } from "core-components/form/FormComponent";
import CoreValue from "create-recognition/coreValues";
import { Button } from "core-components/button/ButtonComponent";
import Image from "shared-components/user-image-name/UserImageName";

const Wrapper = styled.section`
  margin-left: 10%;
  margin-right: 10%;
  align-items: center;
`;
const WrapperForSelectValue = styled.section`
  margin-left: 18%;
  margin-right: 18%;
`;
const CommentBoxWrapper = styled.div`
  max-width: 50%;
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

const CreateRecognitionCardBody = ({
  EmployeeName,
  EmployeeImage,
  Hi5Image,
}) => {
  const [comment, addComment] = useState(false);
  const onClickAddComment = () => {
    addComment(true);
  };
  const addCommentText = (event) => {
    addCommentText(event.target.value);
  };
  return (
    <Card>
      <WrapperForSelectValue>
        <Image imageSrc={EmployeeImage} EmployeeName={EmployeeName}></Image>
        <ImageComponent alt="Hi5Image" img={Hi5Image} src="" />
        <div> Select Value </div>
      </WrapperForSelectValue>
      <Wrapper>
        <ListGroup horizontal>
          <CoreValue coreValues={coreValues} />
        </ListGroup>
        <div className="text-center">
          {comment ? (
            <CommentBoxWrapper>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={(event) => {
                  addCommentText(event);
                }}
              ></Form.Control>
            </CommentBoxWrapper>
          ) : (
            <Button onClick={onClickAddComment}> Add Comments </Button>
          )}
        </div>
        <div className="text-center">
          <Button> Done </Button>
        </div>
      </Wrapper>
    </Card>
  );
};

CreateRecognitionCardBody.propTypes = {
  EmployeeName: PropTypes.string,
  EmployeeImage: PropTypes.string,
  Hi5Image: PropTypes.string,
};

export default CreateRecognitionCardBody;
