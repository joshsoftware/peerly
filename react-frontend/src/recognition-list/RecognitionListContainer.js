import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";
import actionObject from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { LIST_RECOGNITION_API } from "constants/actionConstants";

const RecognnitionListContainer = () => {
  const recognitionList = useSelector((state) => state.listRecognitionReducer);
  const dispatch = useDispatch();
  const status = actionGenrator(LIST_RECOGNITION_API);

  useEffect(() => {
    dispatch(actionObject(status.success));
  }, [dispatch, status.success]);

  if (recognitionList.error.code === "invalid_token") {
    return <SessionTimeoutComponent />;
  } else if (recognitionList.error.code === "access_denied") {
    return <UnauthorisedErrorComponent />;
  }

  return (
    <div>
      {recognitionList.list.map((el, key) => (
        <h3 key={key}>{el.text}</h3>
      ))}
    </div>
  );
};

export default RecognnitionListContainer;
