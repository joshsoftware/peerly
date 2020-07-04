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
  const filterItems = useSelector((state) => state.filterRecognitionReducer);
  const usersList = useSelector((state) => state.userListReducer);
  // const [/*eslint-disable no-unused-vars*/ inputValue, setState] = useState(
  //  null
  //);
  const [reload, setReload] = useState(false);
  const userListReducerStatus = actionGenrator(LIST_USERS);
  const [searchTerm, setSearchTerm] = useState(null);
  const usersApiStatus = actionGenrator(LIST_USERS_API);

  useEffect(() => {
    //  dispatch(actionObjectGenrator(usersApiStatus.success));
  }, [dispatch, usersApiStatus.success]);
  if (
    filterItems.filterData.core_value_id ||
    filterItems.filterData.given_for ||
    filterItems.filterData.given_by
  ) {
    store.dispatch(actionObjectGenrator(filterRecognitionAPI.success));
    store.dispatch(actionObjectGenrator(listRecognition.init));
  }

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
  // const callApi = () => { return setReload(true) };
  //  const status = actionGenrator(LIST_RECOGNITION_API);
  //const [debouncedCallApi] = useState(() => _.debounce(callApi, 3000));

  const filterOptions = (inputValue) => {
    return users.filter((i) =>
      i.label.props.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue, callback) => {
    //if () {
    // debouncedCallApi();
    setSearchTerm(inputValue);
    setReload(true);
    //console.log(users);
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 1000);
    // }
  };
  /*
    const handleInputChange = (newValue) => {
      console.log(newValue.length);
      if (newValue.length % 3 == 0) {
        console.log("in if")
        const inputValue = newValue.replace(/\W/g, "");
        setState({ inputValue });
        return inputValue;
      }
    };*/

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
  };

  return (
    <FilterRecognition
      coreValues={coreValueList.list}
      setCoreValueId={setCoreValueId}
      userList={users}
      onSubmit={onSubmit}
      promiseOptions={promiseOptions}
      //handleInputChange={handleInputChange}
    />
  );
};

export default React.memo(FilterRecognitionContainer);
