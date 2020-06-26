import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Modal, Button } from "react-bootstrap";

import actionObjectGenrator from "actions/listRecognitionAction";
import { CORE_VALUE_API } from "constants/actionConstants";
import actionGenerator from "utils/actionGenerator";

const FilterRecognitionContainer = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  // const coreValueList = useSelector((state) => state.coreValueListReducer);
  const status = actionGenerator(CORE_VALUE_API);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionObjectGenrator(status.success));
  }, [dispatch, status.success]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(FilterRecognitionContainer);
