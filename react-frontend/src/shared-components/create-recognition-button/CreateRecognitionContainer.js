import React, { useState } from "react";
import { useDispatch } from "react-redux";

import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { GIVE_HI5_API, SHOW_MODAL } from "constants/actionConstants";
import CreateRecognitionButton from "shared-components/create-recognition-button/CreateRecognitionButton";
//import { useHistory } from "react-router-dom";

const LeftPanelContainer = () => {
  //let history = useHistory();
  const [showError, setShowError] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  // const [refresh, changeRefresh] = useState(0);
  const dispatch = useDispatch();
  const hi5Status = actionGenrator(GIVE_HI5_API);
  const handleCloseError = () => {
    setShowPopup(false);
    dispatch(actionObjectGenrator(hi5Status.init));
  };
  const showErrorPopup = () => setShowPopup(true);
  //let [user1Id, setUser1Id] = useState(null);
  //const [show, setShow] = useState(false);
  // const userList = useSelector((state) => state.userListReducer);
  const showModal = actionGenrator(SHOW_MODAL);
  //  const status = actionGenrator(LIST_RECOGNITION_API);
  /*
    const handleObserver = (entries) => {
      if (entries[0].isIntersecting) {
        console.log("list rendering");
        dispatch(actionObjectGenrator(userListStatus.success));
      }
    };*/
  /*useEffect(() => {
    
      dispatch(actionObjectGenrator(userListStatus.success));
  
    const options = {
      root: document.getElementById("#2345"), // Page as root
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(
      handleObserver, //callback
      options
    );
    observer.observe(document.getElementById("#2345"));
  }, [dispatch, userListStatus.success, refresh, show]);
*/

  const handleShow = () => {
    dispatch(actionObjectGenrator(showModal.success, { show: true }));
  };

  //console.log(show);
  return (
    <CreateRecognitionButton
      errorMessage="You have Empty Hi5 quota balance"
      showError={showError}
      handleCloseError={handleCloseError}
      handleShowError={showErrorPopup}
      showPopup={showPopup}
      setShowError={setShowError}
      handleShow={handleShow}
    />
  );
};

export default LeftPanelContainer;
