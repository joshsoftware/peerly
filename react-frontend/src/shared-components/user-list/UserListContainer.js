import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

//import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
//import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import {
  //GIVE_HI5_API,
  LIST_USERS_API,
  LIST_USERS,
  //LIST_RECOGNITION_API,
  SHOW_MODAL,
} from "constants/actionConstants";
//import ListOfUsers from "shared-components/user-list/UserListComponent";
import PopupWindow from "shared-components/user-list/PopupUserList";
import { useHistory } from "react-router-dom";

const UserListContainer = () => {
  let history = useHistory();
  const showModal = actionGenrator(SHOW_MODAL);
  // const [showError, setShowError] = useState(0);
  // const [showPopup, setShowPopup] = useState(false);
  // const [refresh, changeRefresh] = useState(0);
  const [searchTerm, setSearchTerm] = useState(null);
  //const [searchResults, setSearchResults] = useState([null]);
  //const showModal = actionGenrator(SHOW_MODAL);
  //const [show, setShow] = useState(false);
  const handleClose = () => {
    dispatch(actionObjectGenrator(showModal.init));
  };
  //const handleShow = () => setShow(true);
  const sendData = () => {
    //TODO
  };
  const dispatch = useDispatch();
  //const hi5Status = actionGenrator(GIVE_HI5_API);
  /* const handleCloseError = () => {
     setShowPopup(false);
     dispatch(actionObjectGenrator(hi5Status.init));
   };*/
  // const showErrorPopup = () => setShowPopup(true);
  let [user1Id, setUser1Id] = useState(null);
  //let [legthOfName, setLengthOfName] = useState(0);
  let errorMessage = null;
  //const [show, setShow] = useState(false);
  const userList = useSelector((state) => state.userListReducer);
  const modalShow = useSelector((state) => state.modalShowReducer);
  const [reload, setReload] = useState(false);
  const userListStatus = actionGenrator(LIST_USERS_API);
  const userListReducerStatus = actionGenrator(LIST_USERS);

  const callApi = () => {
    setReload(true);
  };
  //  const status = actionGenrator(LIST_RECOGNITION_API);
  const [debouncedCallApi] = useState(() => _.debounce(callApi, 1000));
  const searchBox = (e) => {
    if (e.target.value.length % 3 == 0) {
      debouncedCallApi();
      //setLengthOfName(e.target.value.length);
      setSearchTerm(e.target.value);
    }
  };

  useEffect(() => {
    /*if (userList.list[0].first_name) {
      const results = userList.list.filter((person) =>
        person.first_name.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    }*/
    if (reload) {
      dispatch(
        actionObjectGenrator(userListReducerStatus.success, {
          starts_with: searchTerm,
        })
      );
      dispatch(actionObjectGenrator(userListStatus.success));
      setReload(false);
    }
  }, [
    dispatch,
    userListStatus.success,
    userListReducerStatus.success,
    searchTerm,
    //legthOfName,
    reload,
  ]);

  //console.log(document.getElementById("#12345"));
  //console.log(searchResults);
  if (user1Id) {
    localStorage.setItem("userId", user1Id);
    setUser1Id(null);
    dispatch(actionObjectGenrator(showModal.init));
    history.push("/createRecognition");
  }

  if (userList.list[0] === undefined) {
    errorMessage = "user not found";
  } else if (userList.list[0].id === null) {
    errorMessage = "please enter name of user";
  }
  return (
    <PopupWindow
      show={modalShow.show}
      handleClose={handleClose}
      // recognitionToImage={profileImage}
      // recognitionToName={profileName}
      errorMessage={errorMessage}
      sendData={sendData}
      listOfEmployee={userList.list}
      userList={userList.list}
      //userList={userList.list}
      setUserId={setUser1Id}
      searchBox={searchBox}
    ></PopupWindow>
  );
};

export default UserListContainer;
