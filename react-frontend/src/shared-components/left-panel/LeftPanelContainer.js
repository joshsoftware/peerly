import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { USER_PROFILE_API } from "constants/actionConstants";
import LeftfPanel from "shared-components/left-panel/LeftPanelComponent";

const RecognnitionListContainer = () => {
  const userProfile = useSelector((state) => state.userProfileReducer);
  const dispatch = useDispatch();
  const status = actionGenrator(USER_PROFILE_API);
  useEffect(() => {
    dispatch(actionObjectGenrator(status.success));
  }, [dispatch, status.success]);
  if (userProfile.error === "invalid_token") {
    return <SessionTimeoutComponent />;
  } else if (userProfile.error === "access_denied") {
    return <UnauthorisedErrorComponent />;
  }
  return (
    <LeftfPanel
      profileImage={userProfile.data.profile_image_url}
      profileName={userProfile.data.display_name}
      collectedHi5={userProfile.data.hi5_quota_balance}
    />
  );
};

export default RecognnitionListContainer;
