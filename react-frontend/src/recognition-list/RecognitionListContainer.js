import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SessionTimeoutComponent from "shared-components/SessionTimeoutComponent";
import UnauthorisedErrorComponent from "shared-components/UnauthorisedErrorComponent";

const RecognnitionListContainer = () => {
  const recognitionList = useSelector((state) => state.recognitionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "RECOGNITION_GET_API" });
  }, [dispatch]);

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
