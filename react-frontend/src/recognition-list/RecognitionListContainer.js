import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { LIST_RECOGNITION_API, GIVE_HI5_API } from "constants/actionConstants";
import RecognitionListComponent from "recognition-list-components/RecognitionListComponent";

const RecognnitionListContainer = () => {
  const recognitionList = useSelector((state) => state.listRecognitionReducer);
  const dispatch = useDispatch();
  const status = actionGenrator(LIST_RECOGNITION_API);
  const hi5Status = actionGenrator(GIVE_HI5_API);
  const [refresh, changeRefresh] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    dispatch(actionObjectGenrator(hi5Status.init));
  };
  const handleObserver = (entries) => {
    if (entries[0].isIntersecting) {
      dispatch(actionObjectGenrator(status.success));
    }
  };

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

  if (recognitionList.error.code === "invalid_token") {
    return <SessionTimeoutComponent />;
  } else if (recognitionList.error.code === "access_denied") {
    return <UnauthorisedErrorComponent />;
  } else if (recognitionList.hi5.error.code !== undefined && show == false) {
    setShow(true);
  }
  return (
    <div>
      <RecognitionListComponent
        recognitionList={recognitionList.list}
        giveHi5func={giveHi5func}
        show={show}
        handleClose={handleClose}
        errorMessage={recognitionList.hi5.error.message}
      />
    </div>
  );
};

export default RecognnitionListContainer;