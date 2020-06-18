import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Image from "shared-components/image-name/UserImageName";
import { Modal } from "core-components/modal/ModalComponent";
import { Button } from "core-components/button/ButtonComponent";

const Border = styled.fieldset`
  border: 1px solid;
  border-radius: 8px;
  opacity: 1;
  margin-left: 5%;
  margin-right: 5%;
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
}) => (
  <Modal show={show} onHide={handleClose} centered={true} size="xl">
    <Modal.Header closeButton />
    <Image imageSrc={recognitionToImage} />
    <Modal.Body>
      <Border>
        <Legend>Your Note</Legend>
        {commentText}
      </Border>
    </Modal.Body>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary" onClick={handleClose}>
      Save Changes
    </Button>
  </Modal>
);

AddRecognition.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  commentText: PropTypes.string,
  recognitionToImage: PropTypes.string,
};

export default AddRecognition;
