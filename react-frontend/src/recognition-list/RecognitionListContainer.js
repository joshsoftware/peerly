import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { store } from "root/redux-store";
import {
  LIST_RECOGNITION_API,
  GIVE_HI5_API,
  USER_PROFILE_API,
  GIVE_HI5_POST_RESPONSE,
  FILTER_STATUS,
  //FILTER_ERROR_STATUS,
} from "constants/actionConstants";
import RecognitionListComponent from "recognition-list-components/RecognitionListComponent";

const RecognnitionListContainer = () => {
  const [filter, showFilter] = useState(false);
  const sliderOn = () => {
    showFilter(true);
  };
  const sliderOff = () => {
    showFilter(false);
  };
  const userProfileStatus = actionGenrator(USER_PROFILE_API);
  const recognitionList = useSelector((state) => state.listRecognitionReducer);
  /*const filterRecognition = useSelector(
    (state) => state.filterRecognitionErrorResponse
  );*/
  const hi5StatusResponseReducer = useSelector(
    (state) => state.hi5StatusResponseReducer
  );
  const filterStatus = useSelector((state) => state.filterStatus);

  const filterReducerStatus = actionGenrator(FILTER_STATUS);
  //const filterErrorStatus = actionGenrator(FILTER_ERROR_STATUS);
  const dispatch = useDispatch();
  const status = actionGenrator(LIST_RECOGNITION_API);
  const hi5Status = actionGenrator(GIVE_HI5_API);
  const hi5StatusResponse = actionGenrator(GIVE_HI5_POST_RESPONSE);
  const [refresh, changeRefresh] = useState(0);
  const [show, setShow] = useState(false);
  const [showHi5ListPopup, setShowHi5ListPopup] = useState(false);
  if (filterStatus.status == "applied") {
    sliderOff();
    store.dispatch(actionObjectGenrator(filterReducerStatus.init));
  }
  const handleClose = () => {
    setShow(false);
    dispatch(actionObjectGenrator(hi5Status.init));
  };
  const handleObserver = (entries) => {
    if (entries[0].isIntersecting) {
      dispatch(actionObjectGenrator(status.success));
    }
  };
  //console.log(filterRecognition);

  useEffect(() => {
    if (refresh === 0) {
      dispatch(actionObjectGenrator(status.success));
    }
    const options = {
      root: document.getElementById("1233"), // Page as root
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(
      handleObserver, //callback
      options
    );
    observer.observe(document.getElementById("#1233"));
  }, [dispatch, status.success, refresh, show]);

  if (hi5StatusResponseReducer.status === 201) {
    dispatch(actionObjectGenrator(userProfileStatus.success));
    dispatch(actionObjectGenrator(hi5StatusResponse.init));
  }

  const showHi5List = () => {
    setShowHi5ListPopup(true);
  };

  const giveHi5func = async (id) => {
    if (id !== 0) {
      dispatch(
        actionObjectGenrator(hi5Status.success, {
          id: id,
        })
      );
      changeRefresh(refresh + 1);
    }
  };
  if (recognitionList.error === "invalid_token") {
    return <SessionTimeoutComponent />;
  } else if (recognitionList.error === "access_denied") {
    return <UnauthorisedErrorComponent />;
  } else if (recognitionList.hi5.error.code !== undefined && show == false) {
    setShow(true);
  } /*else if () {
    console.log("in true")
  } if (Object.keys(recognitionList.list[0].coreValue).length == 0 && filterRecognition.error.code == "recognition-not-found") {
    dispatch(actionObjectGenrator(filterErrorStatus.init));
    setShow(true);
  }*/
  return (
    <div>
      <RecognitionListComponent
        recognitionList={recognitionList.list}
        giveHi5func={giveHi5func}
        show={show}
        handleClose={handleClose}
        errorMessage={recognitionList.hi5.error.message}
        sliderOn={sliderOn}
        filter={filter}
        sliderOff={sliderOff}
        showHi5List={showHi5List}
        showHi5ListPopup={showHi5ListPopup}
      />
    </div>
  );
};

export default RecognnitionListContainer;
