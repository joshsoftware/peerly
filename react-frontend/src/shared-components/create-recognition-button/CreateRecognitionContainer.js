import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import {
  GIVE_HI5_API,
  SHOW_MODAL,
  USER_PROFILE_API,
} from "constants/actionConstants";
import CreateRecognitionButton from "shared-components/create-recognition-button/CreateRecognitionButton";

const LeftPanelContainer = () => {
  const [showError, setShowError] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const hi5Status = actionGenrator(GIVE_HI5_API);
  const userProfile = useSelector((state) => state.userProfileReducer);
  const status = actionGenrator(USER_PROFILE_API);
  const handleCloseError = () => {
    setShowPopup(false);
    dispatch(actionObjectGenrator(hi5Status.init));
  };
  const showErrorPopup = () => setShowPopup(true);
  useEffect(() => {
    dispatch(actionObjectGenrator(status.success));
  }, [dispatch, status.success]);
  const showModal = actionGenrator(SHOW_MODAL);

  const handleShow = () => {
    dispatch(actionObjectGenrator(showModal.success, { show: true }));
  };

  return (
    <CreateRecognitionButton
      errorMessage="You have Empty Hi5 quota balance"
      showError={showError}
      handleCloseError={handleCloseError}
      handleShowError={showErrorPopup}
      showPopup={showPopup}
      setShowError={setShowError}
      handleShow={handleShow}
      hi5_quota_balance={userProfile.data.hi5_quota_balance}
    />
  );
};

export default LeftPanelContainer;
