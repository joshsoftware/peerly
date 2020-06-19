import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import {
  CORE_VALUE_API,
  RECOGNIZE_TO_API,
  ADD_RECOGNITION_API,
} from "constants/actionConstants";
import actionGenerator from "utils/actionGenerator";
import { store } from "root/redux-store";
import actionObjectGenerator from "actions/actionObjectGenerator";

import CreateRecognition from "create-recognition/CreateRecognition";

const CreateRecognitionContainer = () => {
  const [commentText, updateCommentText] = useState(null);
  const [show, setShow] = useState(false);
  const [comment, addComment] = useState(false);
  const [coreValueId, setCoreValueId] = useState(null);
  const onClickAddComment = () => {
    addComment(true);
  };
  const addCommentText = (event) => {
    updateCommentText(event.target.value);
  };

  const sendData = () => {
    setShow(false);
    const actionStatus = actionGenerator(ADD_RECOGNITION_API);
    const addRecognition = {
      core_value_id: coreValueId,
      text: commentText,
      given_for: 1,
      given_by: 7,
    };
    const dispatchObject = actionObjectGenerator(
      actionStatus.success,
      addRecognition
    );
    store.dispatch(dispatchObject);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const recognitionList = useSelector((state) => state.coreValueListReducer);
  const recognitionTo = useSelector((state) => state.RecognizeToReducer);

  const dispatch = useDispatch();
  const status = actionGenrator(CORE_VALUE_API);
  const recognitionToStatus = actionGenrator(RECOGNIZE_TO_API);

  useEffect(() => {
    dispatch(actionObjectGenrator(status.success));
    dispatch(actionObjectGenrator(recognitionToStatus.success));
  }, [dispatch, status.success, recognitionToStatus.success]);

  if (recognitionList.error === "invalid_token") {
    return <SessionTimeoutComponent />;
  } else if (recognitionList.error === "access_denied") {
    return <UnauthorisedErrorComponent />;
  }
  return (
    <CreateRecognition
      coreValues={recognitionList.list}
      setCoreValueId={setCoreValueId}
      comment={comment}
      addComment={addComment}
      commentText={commentText}
      updateCommentText={updateCommentText}
      show={show}
      setShow={setShow}
      handleClose={handleClose}
      handleShow={handleShow}
      onClickAddComment={onClickAddComment}
      addCommentText={addCommentText}
      recognitionToImage={recognitionTo.data.profile_image_url}
      recognitionToName={`${recognitionTo.data.first_name} ${recognitionTo.data.last_name}`}
      sendData={sendData}
    />
  );
};

export default CreateRecognitionContainer;
