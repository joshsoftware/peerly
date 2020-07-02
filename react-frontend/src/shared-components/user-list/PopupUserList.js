import React from "react";
import PropTypes from "prop-types";

import { Modal } from "core-components/modal/ModalComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";
import { Form } from "core-components/form/FormComponent";

const PopupUserList = ({
  show,
  handleClose,
  userList,
  setUserId,
  searchBox,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered={true}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Form.Control
            type="text"
            placeholder="enter name"
            onChange={searchBox}
            // defaultValue={firstName}
          />
        </Modal.Header>
        <Modal.Body
          style={{
            //position: "fixed",
            overflow: "scroll",
            height: "600px",
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
              />
            </div>
          ))}
        </Modal.Body>
      </Modal>
      <div id="#12345" style={{ height: 1 }} className="text-center" />
    </>
  );
};

PopupUserList.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  userList: PropTypes.array,
  setUserId: PropTypes.func,
  searchBox: PropTypes.func,
};

export default PopupUserList;
