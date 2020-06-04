import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Modal } from "react-bootstrap";
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

const AddRecognition = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Border>
        <Legend>Your Note</Legend>
        hii
      </Border>
    </Modal.Body>
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

AddRecognition.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddRecognition;
