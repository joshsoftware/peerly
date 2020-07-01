import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FiFilter } from "react-icons/fi";
import { Button } from "core-components/button/ButtonComponent";
import RecognitionCardComponent from "recognition-list-components/RecognitionCardComponent";
import FilterContainer from "filterRecognition/FilterRecognitionContainer";
import { Modal } from "core-components/modal/ModalComponent";

import CreateRecognitionButton from "shared-components/create-recognition-button/CreateRecognitionButton";
const Wrapper = styled.div`
  border: 1px solid var(--grey);
  background: var(--white) 0% 0% no-repeat padding-box;
  border-radius: 36px;
  opacity: 1;
  padding-bottom: 19%;
  margin-left: 35%;
  margin-right: 20%;
  height: 537px;
  margin-top: 100px;
  position: fixed;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: ${({ filter }) => (filter ? "hidden" : null)};
`;
const Sidebar = styled.div`
  height: 800px;
  position: absolute;
  padding-left: 20px;
  background-color: navy;
  opacity: 1;
  color: white;
  background: var(--white) 0% 0% no-repeat padding-box;
  border: none;
  width: 480px;
  position: fixed;
  z-index: 1000;
  margin-right: 800px;
  margin-left: 441px;
  margin-top: -98px;
  animation: slide-open 2s forwards;
`;

const MobileSidebar = styled.div`
  height: 100%;
  background-color: navy;
  opacity: 1;
  color: white;
  background: var(--white) 0% 0% no-repeat padding-box;
  width: 100%;
  z-index: 1000;
  animation: slide-open 2s forwards;
`;

const MobileWrapper = styled.div`
  border: 1px solid var(--grey);
  background: var(--white) 0% 0% no-repeat padding-box;
  border-radius: 36px;
  opacity: 1;
  width: 100%;
  height: 100vh;
  margin-top: 35%;
  position: fixed;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: ${({ filter }) => (filter ? "hidden" : null)};
`;

const CreateRecognition = styled.div`
  position: absolute;
  margin-top: 150%;
  margin-left: 45%;
`;
const RecognitionListComponent = ({
  recognitionList,
  giveHi5func,
  handleClose,
  errorMessage,
  sliderOn,
  show,
  sliderOff,
  filter,
}) => {
  const getDateFormate = (timestamp) =>
    new Date(timestamp * 1000).toDateString();
  return (
    <div>
      <Wrapper filter={filter} className="d-none d-md-block">
        <div className="d-flex justify-content-end mt-2 mr-2">
          <FiFilter onClick={sliderOn} />
        </div>
        {filter ? (
          <Sidebar>
            <h2>Sidebar</h2>
            <Button
              id="close"
              variant="outline-dark"
              style={{
                border: "none",
                "margin-left": "325px",
                "margin-top": "25px",
              }}
              className="mt-5"
              onClick={sliderOff}
            >
              &times;
            </Button>
            <FilterContainer />
          </Sidebar>
        ) : null}
        {recognitionList.map((recognition) => (
          <RecognitionCardComponent
            key={recognition.index}
            giveHi5func={giveHi5func}
            recognitionId={recognition.id}
            givenByName={`${recognition.given_by_user.first_name} ${recognition.given_by_user.last_name}`}
            givenByImage={recognition.given_by_user.profile_image_url}
            givenForName={`${recognition.given_for_user.first_name} ${recognition.given_for_user.last_name}`}
            givenForImage={recognition.given_for_user.profile_image_url}
            givenAt={getDateFormate(recognition.given_at)}
            text={recognition.text}
            coreValue={recognition.coreValue.text}
            coreValueImage={recognition.coreValue.thumbnail_url}
            hi5Count={recognition.recognition_hi5s.length}
          />
        ))}
        <Modal
          show={show}
          onHide={handleClose}
          centered={true}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Body closeButton className="text-center text-danger">
            {errorMessage}
          </Modal.Body>
        </Modal>
        <div id="#1233" style={{ height: 1 }} className="text-center" />
      </Wrapper>
      <MobileWrapper
        filter={filter}
        className="d-md-none d-sm-block d-xs-block"
      >
        <div className="d-flex justify-content-end mt-2 mr-2">
          <FiFilter onClick={sliderOn} />
        </div>
        {filter ? (
          <MobileSidebar>
            <h2>Sidebar</h2>
            <Button id="close" onClick={sliderOff}>
              &times;
            </Button>
            <FilterContainer />
          </MobileSidebar>
        ) : null}
        {recognitionList.map((recognition) => (
          <RecognitionCardComponent
            key={recognition.index}
            giveHi5func={giveHi5func}
            recognitionId={recognition.id}
            givenByName={`${recognition.given_by_user.first_name} ${recognition.given_by_user.last_name}`}
            givenByImage={recognition.given_by_user.profile_image_url}
            givenForName={`${recognition.given_for_user.first_name} ${recognition.given_for_user.last_name}`}
            givenForImage={recognition.given_for_user.profile_image_url}
            givenAt={getDateFormate(recognition.given_at)}
            text={recognition.text}
            coreValue={recognition.coreValue.text}
            coreValueImage={recognition.coreValue.thumbnail_url}
            hi5Count={recognition.recognition_hi5s.length}
          />
        ))}
        <div id="#1233" style={{ height: 1 }} className="text-center" />
      </MobileWrapper>
      <CreateRecognition>
        <CreateRecognitionButton />
      </CreateRecognition>
    </div>
  );
};

RecognitionListComponent.propTypes = {
  recognitionList: PropTypes.array.isRequired,
  giveHi5func: PropTypes.func.isRequired,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  errorMessage: PropTypes.string,
  onFilterClick: PropTypes.func,
  filter: PropTypes.string,
  sliderOn: PropTypes.func,
  sliderOff: PropTypes.func,
};

export default React.memo(RecognitionListComponent);
