import CreateRecognition from "components/createRecognitionComponent";
import React, { useState } from "react"; // eslint-disable-line no-unused-vars

const CreateRecognitionContainer = () => {
  const [userList, setUserList] = useState([]); // eslint-disable-line no-unused-vars
  const [coreValueList, setCoreValueList] = useState([]); // eslint-disable-line no-unused-vars
  function userListData() {
    // eslint-disable-line no-unused-vars
  }

  function coreValueListData() {
    // eslint-disable-line no-unused-vars
  }

  return (
    <CreateRecognition users={coreValueListData()} coreValue={userListData()} />
  );
};

export default CreateRecognitionContainer;
