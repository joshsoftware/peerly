import React from "react";
import PropTypes from "prop-types";

import { Modal } from "core-components/modal/ModalComponent";
import ProfileContainer from "shared-components/user-list/UserListContainer";

const PopupUserList = ({ show, handleClose }) => (
  <Modal
    show={show}
    onHide={handleClose}
    centered={true}
    aria-labelledby="contained-modal-title-vcenter"
  >
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
      <ProfileContainer />
    </Modal.Body>
  </Modal>
);

PopupUserList.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default PopupUserList;
