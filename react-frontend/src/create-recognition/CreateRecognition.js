import React from "react";
import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Card } from "core-components/card/CardComponent";
import { Form } from "core-components/form/FormComponent";
import CoreValue from "shared-components/core-value/CoreValues";
import { Button } from "core-components/button/ButtonComponent";
import Image from "shared-components/image-name/UserImageName";
import AddRecognition from "create-recognition/AddRecognition";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";

const HighFive = styled(HighFiveComponent)`
  margin-left: 70%;
`;
const Wrapper = styled.section`
  margin-left: 10%;
  margin-right: 10%;
  align-items: center;
`;
const WrapperForHeader = styled.section`
  margin-left: 18%;
  margin-right: 18%;
`;

const CreateRecognition = ({
  coreValues,
  EmployeeName,
  EmployeeImage,
  recognitionToImage,
}) => {
  const [comment, addComment] = useState(false);
  const [commentText, updateCommentText] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onClickAddComment = () => {
    addComment(true);
  };
  const addCommentText = (event) => {
    updateCommentText(event.target.value);
  };
  return (
    <Card
      style={{
        "margin-left": "30%",
        borderRadius: "36px 36px 0px 0px",
        minHeight: "100vh",
        width: "500px",
        background: "linear-gradient(var(--sage) 175px, var(--white) 0%)",
      }}
    >
      <WrapperForHeader>
        <Image imageSrc={EmployeeImage} EmployeeName={EmployeeName}></Image>
        <HighFive />
        <div className="justify-content-center mt-5"> Select Value </div>
      </WrapperForHeader>
      <Wrapper className="justify-content-center mt-3">
        <div className="d-flex justify-content-center flex-row">
          <CoreValue coreValues={coreValues} />
        </div>
        <div className="text-center  mt-5">
          {comment ? (
            <Form.Control
              as="textarea"
              rows="3"
              onChange={(event) => {
                addCommentText(event);
              }}
            ></Form.Control>
          ) : (
            <Button onClick={onClickAddComment}> Add Comments </Button>
          )}
        </div>
        <div className="text-center mt-5">
          <Button onClick={handleShow}> Done </Button>
        </div>
      </Wrapper>
      <AddRecognition
        show={show}
        handleClose={handleClose}
        recognitionToImage={recognitionToImage}
        EmployeeName={EmployeeName}
        commentText={commentText}
      />
    </Card>
  );
};

CreateRecognition.propTypes = {
  coreValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      coreValueName: PropTypes.string.isRequired,
      fontSize: PropTypes.string,
      backgroundColor: PropTypes.string,
      coreValueImageSrc: PropTypes.string,
    })
  ),
  EmployeeName: PropTypes.string,
  EmployeeImage: PropTypes.string,
  recognitionToImage: PropTypes.string,
  comment: PropTypes.string,
  Hi5Image: PropTypes.string,
};

export default CreateRecognition;
