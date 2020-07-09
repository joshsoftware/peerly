import React from "react";
import PropTypes from "prop-types";

import { Modal } from "core-components/modal/ModalComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";
import { Form } from "core-components/form/FormComponent";
//import { Spinner } from "core-components/spinner/SpinnerComponent.js";

const PopupUserList = ({
  show,
  handleClose,
  userList,
  setUserId,
  searchBox,
  errorMessage,
  setUserProfileImage,
  setUserProfileName,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered={true}
        aria-labelledby="contained-modal-title-vcenter"
        style={{
          position: "fixed",
          marginTop: "0px",
          overflow: "scroll",
          minHeight: "100%",
        }}
      >
        <Modal.Header
          style={{
            position: "absolute",
            marginTop: "0px",
          }}
          closeButton
        >
          <Form.Control
            type="text"
            placeholder="enter name"
            onChange={searchBox}
          />
        </Modal.Header>
        {errorMessage !== null ? (
          <Modal.Body
            style={{
              marginTop: "50px",
            }}
          >
            {errorMessage}
          </Modal.Body>
        ) : (
          <Modal.Body
            style={{
              marginTop: "50px",
              maxHeight: "80vh",
              overflow: "scroll",
              "overflow-x": "hidden",
            }}
          >
            {userList.map((user, index) => (
              <div key={index}>
                <ProfileComponent
                  src={user.profile_image_url}
                  name={`${user.first_name} ${user.last_name}`}
                  id={user.id}
                  size={8}
                  labelClass="ml-2"
                  className="my-3"
                  setUserId={setUserId}
                  setUserProfileImage={setUserProfileImage}
                  setUserProfileName={setUserProfileName}
                />
              </div>
            ))}
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

PopupUserList.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  userList: PropTypes.array,
  setUserId: PropTypes.func,
  searchBox: PropTypes.func,
  errorMessage: PropTypes.string,
  setUserProfileImage: PropTypes.func,
  setUserProfileName: PropTypes.func,
};

export default PopupUserList;
