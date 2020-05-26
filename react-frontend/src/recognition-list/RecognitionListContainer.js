import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { store } from "root/redux-store";

const RecognnitionListContainer = () => {
  const recognitionList = useSelector((state) => state.recognitionReducer);
  const [ListStatus, setListStatus] = useState(false);

  useEffect(() => {
    if (!ListStatus) {
      store.dispatch({ type: "RECOGNITION_GET_API", payload: {} });
      setListStatus(true);
    }
  }, [ListStatus]);

  return (
    <div>
      {recognitionList.map((el, key) => (
        <h3 key={key}>{el.id}</h3>
      ))}
    </div>
  );
};

export default RecognnitionListContainer;
