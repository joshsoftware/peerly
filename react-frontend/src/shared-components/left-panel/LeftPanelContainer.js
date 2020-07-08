import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { USER_PROFILE_API } from "constants/actionConstants";
import LeftfPanel from "shared-components/left-panel/LeftPanelComponent";
import { useHistory } from "react-router-dom";

const LeftPanelContainer = () => {
  let history = useHistory();
  const userProfile = useSelector((state) => state.userProfileReducer);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const status = actionGenrator(USER_PROFILE_API);
  if (userId === 1) {
    history.push("/profile");
  }

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
      profileImage={userProfile.data.profile_image_url || '/assets/images/profile.png'}
      profileName={userProfile.data.display_name}
      collectedHi5={userProfile.data.hi5_count}
      setUserId={setUserId}
      id={1}
    />
  );
};

export default LeftPanelContainer;
