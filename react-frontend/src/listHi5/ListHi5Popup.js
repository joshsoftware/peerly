import React from "react";
import PropTypes from "prop-types";

import { Modal } from "core-components/modal/ModalComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";

const ListHi5Popup = ({ show, handleClose, userList, errorMessage }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered={true}
        aria-labelledby="contained-modal-title-vcenter"
      >
        {errorMessage !== null ? (
          <Modal.Body>{errorMessage}</Modal.Body>
        ) : (
          <Modal.Body>
            {userList.map((user, index) => (
              <div key={index}>
                <ProfileComponent
                  src={user.profile_image_url}
                  name={user.display_name}
                  id={user.user_id}
                  size={8}
                  labelClass="ml-2"
                  className="my-3"
                />
              </div>
            ))}
          </Modal.Body>
        )}
      </Modal>
      <div id="#12345" style={{ height: 1 }} className="text-center" />
    </>
  );
};

ListHi5Popup.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  userList: PropTypes.array,
  setUserId: PropTypes.func,
  searchBox: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default ListHi5Popup;
