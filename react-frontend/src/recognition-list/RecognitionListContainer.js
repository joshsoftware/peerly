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

  const handleObserver = (entries) => {
    if (entries[0].isIntersecting) {
      dispatch(actionObjectGenrator(status.success));
    }
  };

  useEffect(() => {
    dispatch(
      actionObjectGenrator(status.success, {
        list: recognitionList.list.length === 1 ? [] : recognitionList.list,
        offset: recognitionList.offset,
        limit: recognitionList.limit,
      })
    );
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
  }, [dispatch, status.success, refresh]);

  const giveHi5func = async (id) => {
    if (id !== 0) {
      dispatch(
        actionObjectGenrator(hi5Status.success, {
          id: id,
          list: recognitionList.list,
        })
      );
      changeRefresh(refresh + 1);
    }
  };

  if (recognitionList.error.code === "invalid_token") {
    return <SessionTimeoutComponent />;
  } else if (recognitionList.error.code === "access_denied") {
    return <UnauthorisedErrorComponent />;
  } else if (recognitionList.hi5.error.code) {
    //alert(recognitionList.hi5.error.message)
  } else if (recognitionList.hi5.data.recognition_id) {
    //alert("success");
  }

  return (
    <div>
      <RecognitionListComponent
        recognitionList={recognitionList.list}
        giveHi5func={giveHi5func}
      />
      <div id="#1233" style={{ height: 10 }} className="text-center">
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default RecognnitionListContainer;
