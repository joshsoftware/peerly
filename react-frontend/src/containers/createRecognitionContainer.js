import CreateRecognition from "components/createRecognitionComponent";
import React, { useState, useEffect } from "react"; // eslint-disable-line no-unused-vars
/*eslint-disable-line no-unused-vars*/ function userListData() {} // eslint-disable-line no-empty-function

/*eslint-disable-line no-unused-vars*/ function coreValueListData() {} // eslint-disable-line no-empty-function

const CreateRecognitionContainer = () => {
  const [userList, setUserList] = useState([]); // eslint-disable-line no-unused-vars
  const [coreValueList, setCoreValueList] = useState([]); // eslint-disable-line no-unused-vars

  useEffect(() => {}, [userList, coreValueList]); // eslint-disable-line no-empty-function
  return <CreateRecognition users={userList} coreValue={coreValueList} />;
};
export default CreateRecognitionContainer;
