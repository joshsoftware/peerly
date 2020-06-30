import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserComponent from "user-profile/UserprofileComponent";

import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import actionGenerator from "utils/actionGenerator";
import { store } from "root/redux-store";
import actionObjectGenerator from "actions/actionObjectGenerator";
import { useHistory } from "react-router-dom";

import {
  S3_SIGNED_URL_API,
  USER_PROFILE_POST_API,
  USER_PROFILE_UPDATE_RESPONSE,
} from "constants/actionConstants";

const UserProfileContainer = () => {
  const [file, setFile] = useState(null);
  const [s3url, sets3url] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const getSignedUrl = actionGenrator(S3_SIGNED_URL_API);
  let history = useHistory();

  const s3SignedUrl = useSelector((state) => state.s3SignedUrlReducer);
  const userProfile = useSelector((state) => state.userProfileReducer);
  const updateUserStatus = useSelector(
    (state) => state.userProfileUpdateReducer
  );
  const dispatch = useDispatch();

  if (updateUserStatus.status == 200) {
    const actionStatus = actionGenerator(USER_PROFILE_UPDATE_RESPONSE);
    history.push("/listOfRecognition");
    dispatch(actionObjectGenrator(actionStatus.init));
  }
  const uploadImage = (e) => {
    setFile(e.target.files[0]);
  };
  if (s3url) {
    const actionStatus = actionGenerator(USER_PROFILE_POST_API);
    const addRecognition = {
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
      profile_image_url: s3url.split("?")[0],
    };
    const dispatchObject = actionObjectGenerator(
      actionStatus.success,
      addRecognition
    );
    store.dispatch(dispatchObject);
  }
  const uploadOnAws = (event) => {
    event.preventDefault();
    setFirstName(event.target.formFirstName.value);
    setLastName(event.target.formLastName.value);
    setDisplayName(event.target.formDisplayName.value);
    dispatch(actionObjectGenrator(getSignedUrl.success));
    if (!file) {
      const actionStatus = actionGenerator(USER_PROFILE_POST_API);
      const addRecognition = {
        first_name: event.target.formFirstName.value,
        last_name: event.target.formLastName.value,
        display_name: event.target.formDisplayName.value,
      };
      const dispatchObject = actionObjectGenerator(
        actionStatus.success,
        addRecognition
      );
      store.dispatch(dispatchObject);
    }
  };

  if (s3SignedUrl.data.s3_signed_url) {
    fetch(s3SignedUrl.data.s3_signed_url, {
      method: "PUT",
      body: file,
    }).then((response) => {
      sets3url(response.url);
    });
  }

  return (
    <UserComponent
      firstName={userProfile.data.first_name}
      lastName={userProfile.data.last_name}
      email={userProfile.data.email}
      profileImage={userProfile.data.profile_image_url}
      displayName={userProfile.data.display_name}
      id={userProfile.data.id}
      uploadImage={uploadImage}
      uploadOnAws={uploadOnAws}
    />
  );
};

export default UserProfileContainer;
