import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProfileComponent from "shared-components/profile-component/ProfileComponent";
import { Modal } from "core-components/modal/ModalComponent";
import { Button } from "core-components/button/ButtonComponent";

const Border = styled.fieldset`
  border: 1px solid;
  border-radius: 8px;
  opacity: 1;
  margin-left: 5%;
  margin-right: 5%;
`;

const Profile = styled(ProfileComponent)`
  align-items: center;
  margin-left: auto;
`;
const CommentBox = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
`;

const Legend = styled.legend`
  width: auto;
  margin-left: 10%;
  font-size: 0.75em;
`;

const AddRecognition = ({
  show,
  handleClose,
  recognitionToImage,
  commentText,
  recognitionToName,
  sendData,
}) => (
  <Modal
    show={show}
    onHide={handleClose}
    centered={true}
    aria-labelledby="contained-modal-title-vcenter"
  >
    <Modal.Header closeButton>
      <Profile
        className="d-flex flex-column"
        size="14"
        src={recognitionToImage}
        name={recognitionToName}
      />
    </Modal.Header>
    <Modal.Body>
      <Border>
        <Legend>Your Note</Legend>
        <CommentBox> {commentText} </CommentBox>
      </Border>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={sendData}>
        Send
      </Button>
    </Modal.Footer>
  </Modal>
);

AddRecognition.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  commentText: PropTypes.string,
  recognitionToImage: PropTypes.string,
  recognitionToName: PropTypes.string,
  sendData: PropTypes.func,
};

export default AddRecognition;
