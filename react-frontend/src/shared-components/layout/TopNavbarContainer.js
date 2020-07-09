import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actionObjectGenerator from "actions/listRecognitionAction";
import actionGenerator from "utils/actionGenerator";
import { LOGOUT_API } from "constants/actionConstants";
import { store } from "root/redux-store";
import TopNavbar from "shared-components/layout/TopNavbar";

import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { USER_PROFILE_API } from "constants/actionConstants";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const TopNavbarContainer = () => {
  let history = useHistory();
  const [userId, setUserId] = useState(null);
  let createRecognitionRoute = false;
  let location = useLocation();
  if (
    location.pathname === "/createRecognition" ||
    location.pathname === "/profile"
  ) {
    createRecognitionRoute = true;
  }

  let hi5_count = 0;
  const userProfile = useSelector((state) => state.userProfileReducer);
  const dispatch = useDispatch();
  const status = actionGenrator(USER_PROFILE_API);
  if (userId === 1) {
    history.push("/profile");
  }
  useEffect(() => {
    dispatch(actionObjectGenrator(status.success));
  }, [dispatch, status.success]);
  const onClickLogout = () => {
    const actionStatus = actionGenerator(LOGOUT_API);
    const dispatchObject = actionObjectGenerator(actionStatus.success);
    store.dispatch(dispatchObject);
    localStorage.clear();
  };
  if (userProfile.data.hi5_quota_balance) {
    hi5_count = userProfile.data.hi5_quota_balance;
  }
  return (
    <TopNavbar
      onClickLogout={onClickLogout}
      count={hi5_count}
      profileImage={userProfile.data.profile_image_url}
      profileName={userProfile.data.display_name}
      collectedHi5={userProfile.data.hi5_count}
      setUserId={setUserId}
      id={1}
      createRecognitionRoute={createRecognitionRoute}
    />
  );
};

export default TopNavbarContainer;
