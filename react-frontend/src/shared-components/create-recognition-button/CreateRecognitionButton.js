import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PlusSign from "shared-components/plus-sign/PlusSign";
import PopupWindow from "shared-components/user-list/UserListContainer";
import { Modal } from "core-components/modal/ModalComponent";

const WrapperCircle = styled.div`
  background: var(--white) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px var(--box-shadow-color);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  padding-top: 2%;
  position: relative;
`;

const ButtonComponent = styled.div`
  background: transparent url(${(props) => props.imageUrl}) 97% 50% no-repeat
    padding-box;
  box-shadow: 0px 3px 6px #0000004e;
  width: 45px;
  height: 45px;
  background-color: var(--rust);
  border: none;
  border-radius: 50%;
`;

const CreateRecognitionButton = ({
  theme,
  fontSize,
  hi5ImageForButton,
  errorMessage,
  handleCloseError,
  handleShowError,
  showPopup,
  hi5_quota_balance,
  handleShow,
}) => {
  return (
    <>
      <WrapperCircle className="m-auto">
        <ButtonComponent
          id="create-recognition-button"
          imageUrl={hi5ImageForButton}
          className="m-auto text-center"
          onClick={hi5_quota_balance !== 0 ? handleShow : handleShowError}
        >
          <PlusSign fontSize={fontSize} theme={theme} />
        </ButtonComponent>
      </WrapperCircle>
      {showPopup ? (
        <Modal
          show={showPopup}
          onHide={handleCloseError}
          centered={true}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Body closeButton className="text-center text-danger">
            {errorMessage}
          </Modal.Body>
        </Modal>
      ) : (
        <PopupWindow></PopupWindow>
      )}
    </>
  );
};

CreateRecognitionButton.defaultProps = {
  theme: "dark",
  fontSize: "27px",
};

CreateRecognitionButton.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  fontSize: PropTypes.string,
  hi5ImageForButton: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  showError: PropTypes.string,
  handleCloseError: PropTypes.func,
  handleShowError: PropTypes.func,
  showPopup: PropTypes.func,
  hi5_quota_balance: PropTypes.number,
  handleShow: PropTypes.func,
};

export default React.memo(CreateRecognitionButton);
