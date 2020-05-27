import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const RecognnitionListContainer = () => {
  const recognitionList = useSelector((state) => state.recognitionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "RECOGNITION_GET_API" });
  }, [dispatch]);

  if (recognitionList[0].code == "invalid_token") {
    return <h1>unauthorised user</h1>;
  } else if (recognitionList[0].code == "access_denied") {
    return <h1>Permission required</h1>;
  }

  return (
    <div>
      {recognitionList.map((el, key) => (
        <h3 key={key}>{el.text}</h3>
      ))}
    </div>
  );
};

export default RecognnitionListContainer;
