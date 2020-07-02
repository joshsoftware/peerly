import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
//import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import {
  //GIVE_HI5_API,
  LIST_USERS_API,
  //LIST_RECOGNITION_API,
  SHOW_MODAL,
} from "constants/actionConstants";
//import ListOfUsers from "shared-components/user-list/UserListComponent";
import PopupWindow from "shared-components/user-list/PopupUserList";
import { useHistory } from "react-router-dom";

const UserListContainer = () => {
  let history = useHistory();
  // const [showError, setShowError] = useState(0);
  // const [showPopup, setShowPopup] = useState(false);
  // const [refresh, changeRefresh] = useState(0);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResults, setSearchResults] = useState([null]);
  const showModal = actionGenrator(SHOW_MODAL);
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
  //const [show, setShow] = useState(false);
  const userList = useSelector((state) => state.userListReducer);
  const modalShow = useSelector((state) => state.modalShowReducer);
  const userListStatus = actionGenrator(LIST_USERS_API);
  //  const status = actionGenrator(LIST_RECOGNITION_API);
  const searchBox = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleObserver = (entries) => {
    if (entries[0].isIntersecting) {
      dispatch(actionObjectGenrator(userListStatus.success));
    }
  };
  useEffect(() => {
    if (userList.list[0].first_name) {
      const results = userList.list.filter((person) =>
        person.first_name.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    }
    if (document.getElementById("#12345")) {
      dispatch(actionObjectGenrator(userListStatus.success));
      const options = {
        root: document.getElementById("#12345"), // Page as root
        rootMargin: "0px",
        threshold: 0,
      };
      const observer = new IntersectionObserver(
        handleObserver, //callback
        options
      );
      observer.observe(document.getElementById("#12345"));
    }
  }, [dispatch, userListStatus.success, searchTerm]);

  //console.log(document.getElementById("#12345"));
  //console.log(searchResults);
  if (user1Id) {
    localStorage.setItem("userId", user1Id);
    setUser1Id(null);
    history.push("/createREcognition");
  }
  //console.log(userList.list[0].first_name)
  //console.log(searchResults[0])
  return (
    <PopupWindow
      show={modalShow.show}
      handleClose={handleClose}
      // recognitionToImage={profileImage}
      // recognitionToName={profileName}
      sendData={sendData}
      listOfEmployee={userList.list}
      userList={searchResults[0] === null ? userList.list : searchResults}
      //userList={userList.list}
      setUserId={setUser1Id}
      searchBox={searchBox}
    ></PopupWindow>
  );
};

export default UserListContainer;
