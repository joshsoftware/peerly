import React from "react";
import { useSelector, useDispatch } from "react-redux";

import actionObjectGenrator from "actions/listRecognitionAction";
import actionGenrator from "utils/actionGenerator";
import { LIST_HI5_POPUP, LIST_HI5_API } from "constants/actionConstants";
import ListHi5Popup from "listHi5/ListHi5Popup";

const ListHi5Container = () => {
  const showModal = actionGenrator(LIST_HI5_POPUP);
  const show = useSelector((state) => state.listHi5Popup);
  const handleClose = () => {
    dispatch(actionObjectGenrator(showModal.init));
  };
  const dispatch = useDispatch();
  const listHi5 = useSelector((state) => state.recognitionHi5List);
  const status = actionGenrator(LIST_HI5_API);

  const handleScroll = (event) => {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      dispatch(actionObjectGenrator(status.success));
    }
  };

  return (
    <ListHi5Popup
      show={show.show}
      handleClose={handleClose}
      userList={listHi5.data}
      errorMessage={null}
      handleScroll={handleScroll}
    />
  );
};

export default ListHi5Container;
