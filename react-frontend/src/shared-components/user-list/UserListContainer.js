import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { LIST_USERS_API } from "constants/actionConstants";
import ListOfUsers from "shared-components/user-list/UserListComponent";
import { useHistory } from "react-router-dom";

const UserListContainer = () => {
  let history = useHistory();
  let [userId, setUserId] = useState(null);
  const recognitionList = useSelector((state) => state.userListReducer);
  const dispatch = useDispatch();
  const status = actionGenrator(LIST_USERS_API);
  useEffect(() => {
    dispatch(actionObjectGenrator(status.success));
  }, [dispatch, status.success]);

  if (recognitionList.error === "invalid_token") {
    return <SessionTimeoutComponent />;
  } else if (recognitionList.error === "access_denied") {
    return <UnauthorisedErrorComponent />;
  } else if (userId) {
    localStorage.setItem("userId", userId);
    setUserId(null);
    history.push("/createREcognition");
  }

  return (
    <div>
      <ListOfUsers userList={recognitionList.list} setUserId={setUserId} />
    </div>
  );
};

export default UserListContainer;
