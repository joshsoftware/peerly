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
  position: relative;
  margin-left: 70%;
  margin-top: -20px;
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

const CardWrapper = styled(Card)`
  border-radius: 36px 36px 0px 0px;
  background: linear-gradient(var(--sage) 120px, var(--white) 0%);
  height: 100%;
  position: fixed;
  width: 100%;
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
  coreValueId,
}) => {
  return (
    <CardWrapper className="">
      <WrapperForHeader>
        <ProfileComponent
          className="d-flex flex-column align-items-center mt-2"
          size={10}
          labelClass="ml-3"
          src={recognitionToImage}
          name={recognitionToName}
        />
        <HighFive />
        <div className="justify-content-center"> Select Value </div>
      </WrapperForHeader>
      <Wrapper className="justify-content-center mt-3">
        <div className="d-flex justify-content-around flex-row">
          <CoreValue coreValues={coreValues} setCoreValueId={setCoreValueId} />
        </div>
        <div className="text-center mt-5">
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
        <div className="text-center mt-3">
          {coreValueId ? <Button onClick={handleShow}> Done </Button> : <></>}
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
    </CardWrapper>
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
  coreValueId: PropTypes.number,
};

export default CreateRecognition;
