/*import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { CORE_VALUE_API, RECOGNIZE_TO_API } from "constants/actionConstants";

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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //console.log("container vore value" + coreValueId);
  const recognitionList = useSelector((state) => state.coreValueListReducer);
  const recognitionTo = useSelector((state) => state.RecognizeToReducer);
  //console.log(recognitionTo);
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
    />
  );*/
/** <div>
        {recognitionList.list.map((el, key) => (
          <>
          <h3 >{el.text}</h3>
          <h3>{el.id}</h3>
          </>
        ))}
      </div> */
/*
  const coreValues = [
    {
      id: 1,
      coreValueName: "core Value Name 1",
      coreValueImageSrc: "https://picsum.photos/id/237/200/300",
    },
    {
      id: 2,
      coreValueName: "core Value Name 2",
      coreValueImageSrc: "https://picsum.photos/id/237/200/300",
    },
    {
      id: 3,
      coreValueName: "core Value Name 3",
      coreValueImageSrc: "https://picsum.photos/id/237/200/300",
    },
    {
      id: 4,
      coreValueName: "core Value Name 4",
      coreValueImageSrc: "https://picsum.photos/id/237/200/300",
    },
  ];

  return (
    <CreateRecognition
      coreValues={coreValues}
      EmployeeImage="https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3Aa35c0de3-24d5-44c1-992c-59b8fc15f0d2&params=version%3A0&token=1592556550_da39a3ee_cf0656edd0c843bff08c7df820ff3f03b2ee011c&api_key=CometServer1"
      Hi5Image="https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3Aa1fd8594-6956-447e-91fa-99c68e40d839&params=version%3A0&token=1592556550_da39a3ee_cf0656edd0c843bff08c7df820ff3f03b2ee011c&api_key=CometServer1"
    />
  );*/
//};

//export default CreateRecognitionContainer;
/**eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJub2RlLnBlZXJseS5jb20iLCJzdWIiOjcsImF1ZCI6InBlZXJseS5jb20iLCJuYmYiOjE1OTI0ODgxNjUsImh0dHBzOi8vcGVlcmx5LmNvbSI6eyJyb2xlSWQiOjIsIm9yZ0lkIjoxLCJvcmdOYW1lIjoiam9zaCJ9LCJpYXQiOjE1OTI0ODgxNjUsImV4cCI6MTU5MjUyNDE2NX0.Pq0NHO5la5RztNY9e-FFYmqApfTokMIMlKBI1S6KDpk */
