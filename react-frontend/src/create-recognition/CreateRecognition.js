import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Card } from "core-components/card/CardComponent";
import { Form } from "core-components/form/FormComponent";
import CoreValue from "shared-components/core-value/CoreValues";
import { Button } from "core-components/button/ButtonComponent";
import AddRecognition from "create-recognition/AddRecognition";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";

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
  recognitionToName,
  recognitionToImage,
  setCoreValueId,
  comment,
  commentText,
  show,
  handleClose,
  handleShow,
  onClickAddComment,
  addCommentText,
  sendData,
}) => {
  return (
    <Card
      style={{
        marginLeft: "30%",
        borderRadius: "36px 36px 0px 0px",
        minHeight: "100vh",
        width: "500px",
        background: "linear-gradient(var(--sage) 23%, var(--white) 0%)",
      }}
    >
      <WrapperForHeader>
        <ProfileComponent
          className="d-flex flex-column"
          size={14}
          labelClass=""
          src={recognitionToImage}
          name={recognitionToName}
        />
        <HighFive />
        <div className="justify-content-center mt-5"> Select Value </div>
      </WrapperForHeader>
      <Wrapper className="justify-content-center mt-3">
        <div className="d-flex justify-content-center flex-row">
          <CoreValue coreValues={coreValues} setCoreValueId={setCoreValueId} />
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
        recognitionToName={recognitionToName}
        commentText={commentText}
        sendData={sendData}
      />
    </Card>
  );
};

CreateRecognition.propTypes = {
  coreValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      description: PropTypes.string,
      parent_core_value_id: PropTypes.number,
      org_id: PropTypes.number,
      thumbnail_url: PropTypes.string,
    })
  ),
  recognitionToName: PropTypes.string,
  EmployeeImage: PropTypes.string,
  recognitionToImage: PropTypes.string,
  comment: PropTypes.bool,
  Hi5Image: PropTypes.string,
  setCoreValueId: PropTypes.func,
  addComment: PropTypes.func,
  commentText: PropTypes.string,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  handleClose: PropTypes.func,
  handleShow: PropTypes.func,
  onClickAddComment: PropTypes.func,
  addCommentText: PropTypes.func,
  sendData: PropTypes.func,
};

export default CreateRecognition;
