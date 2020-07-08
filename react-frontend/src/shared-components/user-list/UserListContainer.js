import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

//import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
//import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import {
  LIST_USERS_API,
  LIST_USERS,
  SHOW_MODAL,
  USER_PROFILE_API,
} from "constants/actionConstants";
import PopupWindow from "shared-components/user-list/PopupUserList";
import { useHistory } from "react-router-dom";

const UserListContainer = () => {
  let history = useHistory();
  const showModal = actionGenrator(SHOW_MODAL);
  const [searchTerm, setSearchTerm] = useState(null);
  const handleClose = () => {
    dispatch(actionObjectGenrator(showModal.init));
  };
  const dispatch = useDispatch();

  let [user1Id, setUser1Id] = useState(null);
  let [userProfileImage, setUserProfileImage] = useState(null);
  let [userProfileName, setUserProfileName] = useState(null);
  let errorMessage = null;

  const userProfile = useSelector((state) => state.userProfileReducer);
  const status = actionGenrator(USER_PROFILE_API);
  const userList = useSelector((state) => state.userListReducer);
  const modalShow = useSelector((state) => state.modalShowReducer);
  const [reload, setReload] = useState(false);
  const userListStatus = actionGenrator(LIST_USERS_API);
  const userListReducerStatus = actionGenrator(LIST_USERS);

  const callApi = () => {
    setReload(true);
  };

  const [debouncedCallApi] = useState(() => _.debounce(callApi, 1000));
  const searchBox = (e) => {
    if (e.target.value.length % 3 == 0) {
      debouncedCallApi();
      setSearchTerm(e.target.value);
    }
  };

  useEffect(() => {
    if (reload) {
      dispatch(
        actionObjectGenrator(userListReducerStatus.success, {
          starts_with: searchTerm,
        })
      );
      dispatch(actionObjectGenrator(userListStatus.success));
      dispatch(actionObjectGenrator(status.success));
      setReload(false);
    }
  }, [
    dispatch,
    userListStatus.success,
    userListReducerStatus.success,
    status.success,
    searchTerm,
    reload,
  ]);
  if (user1Id) {
    localStorage.setItem("userId", user1Id);
    localStorage.setItem("recognitionToImage", userProfileImage);
    localStorage.setItem("recognitionToName", userProfileName);
    setUser1Id(null);
    dispatch(actionObjectGenrator(showModal.init));
    history.push("/createRecognition");
  }

  const updateduserList = userList.list.filter(
    (item) => item.id !== userProfile.data.id
  );
  if (updateduserList[0] === undefined) {
    errorMessage = "employee not found";
  } else if (userList.list[0].id === null) {
    errorMessage = "please enter name of employee you want to recognize";
  }
  return (
    <PopupWindow
      show={modalShow.show}
      handleClose={handleClose}
      errorMessage={errorMessage}
      listOfEmployee={userList.list}
      userList={updateduserList}
      setUserId={setUser1Id}
      searchBox={searchBox}
      setUserProfileImage={setUserProfileImage}
      setUserProfileName={setUserProfileName}
    ></PopupWindow>
  );
};

export default UserListContainer;
