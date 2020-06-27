/*import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserComponent from "user-profile/UserprofileComponent";

import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import actionGenerator from "utils/actionGenerator";
import { store } from "root/redux-store";
import actionObjectGenerator from "actions/actionObjectGenerator";

import {
  S3_SIGNED_URL_API,
  S3_SIGNED_URL_POST,
  USER_PROFILE_POST_API,
  USER_PROFILE,
} from "constants/actionConstants";

const UserProfileContainer = () => {
  const [file, setFile] = useState(null);
  const [s3url, sets3url] = useState(null);
  const getSignedUrl = actionGenrator(S3_SIGNED_URL_API);
  // const postSignedUrl = actionGenrator(S3_SIGNED_URL_POST);

  const s3SignedUrl = useSelector((state) => state.s3SignedUrlReducer);
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setFile(e.target.files[0])
  }
  const uploadOnAws = (event) => {
    event.preventDefault();
    dispatch(actionObjectGenrator(getSignedUrl.success));

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

  if (s3SignedUrl.data.s3_signed_url) {
    fetch(s3SignedUrl.data.s3_signed_url, {
      method: "PUT",
      body: file,
    }).then(response => console.log(response)).then(data => {
      console.log(data);
      sets3url(data)
    }).catch(error => { console.error(error) })
  }

  return <><UserComponent uploadImage={uploadImage} uploadOnAws={uploadOnAws} /></>;
};

export default UserProfileContainer;
*/
