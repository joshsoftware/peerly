import React from "react";
import { useSelector } from "react-redux";

const UserProfileContainer = () => {
  const userProfile = useSelector((state) => state.userProfileReducer);
  return <h1>{userProfile}</h1>;
};

export default UserProfileContainer;
