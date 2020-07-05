/*import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import {
  //GIVE_HI5_API,
  LIST_USERS_API,
  LIST_USERS,
  //LIST_RECOGNITION_API,
  SHOW_MODAL,
} from "constants/actionConstants";
import PopupWindow from "shared-components/user-list/PopupUserList";
import { useHistory } from "react-router-dom";

const ListHi5Container = () => {
  let history = useHistory();
  const [searchTerm, setSearchTerm] = useState(null);
  const showModal = actionGenrator(SHOW_MODAL);
  const handleClose = () => {
    dispatch(actionObjectGenrator(showModal.init));
  };
  const sendData = () => {
    //TODO
  };
  const dispatch = useDispatch();
  let [user1Id, setUser1Id] = useState(null);
  let [legthOfName, setLengthOfName] = useState(0);
  let errorMessage= null;
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
  const [debouncedCallApi] = useState(() => _.debounce(callApi, 3000));
  const searchBox = (e) => {
    if (e.target.value.length % 3 == 0) {
      debouncedCallApi();
      setLengthOfName(e.target.value.length);
      setSearchTerm(e.target.value);
    }
  };

  useEffect(() => {
   
  }, [
   
  ]);

  
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

export default ListHi5Container;*/
