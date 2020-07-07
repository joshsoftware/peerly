import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import actionObjectGenrator from "actions/listRecognitionAction";
import {
  CORE_VALUE_API,
  FILTER_RECOGNITION,
  LIST_RECOGNITION,
  FILTER_RECOGNITION_API,
  LIST_USERS_API,
  FILTER_STATUS,
  LIST_USERS,
} from "constants/actionConstants";
import actionGenerator from "utils/actionGenerator";
import actionGenrator from "utils/actionGenerator";
import FilterRecognition from "filterRecognition/FilterRecognitionComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";
import { store } from "root/redux-store";

const FilterRecognitionContainer = () => {
  const [coreValueId, setCoreValueId] = useState(null);
  const status = actionGenerator(CORE_VALUE_API);
  const filterStatus = actionGenerator(FILTER_STATUS);
  const filterReducerStatus = actionGenerator(FILTER_RECOGNITION);
  const filterRecognitionAPI = actionGenerator(FILTER_RECOGNITION_API);
  const listRecognition = actionGenerator(LIST_RECOGNITION);
  const dispatch = useDispatch();
  const coreValueList = useSelector((state) => state.coreValueListReducer);
  const usersList = useSelector((state) => state.userListReducer);

  const [reload, setReload] = useState(false);
  const userListReducerStatus = actionGenrator(LIST_USERS);
  const [searchTerm, setSearchTerm] = useState(null);
  const usersApiStatus = actionGenrator(LIST_USERS_API);

  useEffect(() => {
    dispatch(actionObjectGenrator(status.success));
    if (reload) {
      dispatch(
        actionObjectGenrator(userListReducerStatus.success, {
          starts_with: searchTerm,
        })
      );
      dispatch(actionObjectGenrator(usersApiStatus.success));
      setReload(false);
    }
  }, [
    dispatch,
    status.success,
    userListReducerStatus.success,
    searchTerm,
    reload,
    usersApiStatus.success,
  ]);

  let users = [];
  usersList.list.map((user) =>
    users.push({
      value: user.id,
      label: (
        <ProfileComponent
          name={`${user.first_name} ${user.last_name}`}
          src={user.profile_image_url}
          size={5}
          labelClass="ml-2"
          className="text-dark"
        />
      ),
    })
  );

  const filterOptions = (inputValue) => {
    return users.filter((i) =>
      i.label.props.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue, callback) => {
    setSearchTerm(inputValue);
    setReload(true);
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 1000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    store.dispatch(
      actionObjectGenrator(filterReducerStatus.success, {
        core_value_id: coreValueId,
        given_for: e.target.given_for.value,
        given_by: e.target.given_by.value,
      })
    );
    dispatch(actionObjectGenrator(filterStatus.success, { status: "applied" }));
    store.dispatch(actionObjectGenrator(filterRecognitionAPI.success));
    store.dispatch(actionObjectGenrator(listRecognition.init));
  };

  return (
    <FilterRecognition
      coreValues={coreValueList.list}
      setCoreValueId={setCoreValueId}
      userList={users}
      onSubmit={onSubmit}
      promiseOptions={promiseOptions}
    />
  );
};

export default React.memo(FilterRecognitionContainer);
