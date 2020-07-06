import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FiFilter } from "react-icons/fi";

import CreateRecognitionContainer from "shared-components/create-recognition-button/CreateRecognitionContainer";
import { Button } from "core-components/button/ButtonComponent";
import RecognitionCardComponent from "recognition-list-components/RecognitionCardComponent";
import FilterContainer from "filterRecognition/FilterRecognitionContainer";
import { Modal } from "core-components/modal/ModalComponent";
import ListHi5Container from "listHi5/ListHi5Container";
//import { Form } from "react-bootstrap";

const Wrapper = styled.div`
  border: 1px solid var(--grey);
  background: var(--white) 0% 0% no-repeat padding-box;
  border-radius: 36px;
  opacity: 1;
  height: 100%;
  width: 50%;
  padding-bottom: 100%;
  position: fixed;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: ${({ filter }) => (filter ? "hidden" : null)};
`;

const Sidebar = styled.div`
  height: 100%;
  background-color: navy;
  opacity: 1;
  color: white;
  background: var(--white) 0% 0% no-repeat padding-box;
  border: none;
  position: fixed;
  z-index: 1000;
  right: 0%;
  top: 0%;
  padding: 3%;
  animation: slide-open 2s forwards;
`;

const Div = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 0%;
  width: 100%;
`;

const MobileWrapper = styled.div`
  border: 1px solid var(--grey);
  background: var(--white) 0% 0% no-repeat padding-box;
  border-radius: 36px;
  opacity: 1;
  width: 100%;
  height: 100%;
  padding-bottom: 100%;
  position: fixed;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: ${({ filter }) => (filter ? "hidden" : null)};
`;

const MobileSidebar = styled.div`
  height: 100%;
  background-color: navy;
  opacity: 1;
  color: white;
  background: var(--white) 0% 0% no-repeat padding-box;
  border: none;
  position: fixed;
  width: 100%;
  top: 0%;
  z-index: 1000;
  animation: slide-open 2s forwards;
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
  showHi5List,
  showHi5ListPopup,
  filterErrorMessage,
  filterError,
}) => {
  const getDateFormate = (timestamp) =>
    new Date(timestamp * 1000).toDateString();
  return (
    <div>
      <Wrapper className="d-none d-md-block" filter={filter}>
        <div className="d-flex justify-content-end mt-2 mr-1">
          <FiFilter onClick={sliderOn} className="position-fixed" />
        </div>
        {filter ? (
          <Sidebar>
            <div className="d-flex justify-content-between text-danger">
              <h4 className="align-self-center">Filters</h4>
              <Button
                id="close"
                variant="outline-dark"
                style={{
                  border: "none",
                }}
                className="mb-5 btn-lg"
                onClick={sliderOff}
              >
                &times;
              </Button>
            </div>
            <FilterContainer />
          </Sidebar>
        ) : null}
        {filterError ? (
          <h5 className="text-danger text-center">{filterErrorMessage}</h5>
        ) : (
          <>
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
                hi5Count={recognition.hi5_count}
                showHi5List={showHi5List}
              />
            ))}
          </>
        )}
        {showHi5ListPopup ? <ListHi5Container /> : null}
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
        className="d-sm-block d-xs-block d-md-none"
        filter={filter}
      >
        <Div className="d-sm-block d-xs-block d-md-none">
          <CreateRecognitionContainer />
        </Div>
        <div className="d-flex justify-content-end mt-2 mr-1">
          <FiFilter onClick={sliderOn} className="position-fixed" />
        </div>
        {filter ? (
          <MobileSidebar>
            <div className="d-flex justify-content-between text-danger">
              <h4 className="align-self-center">Filters</h4>
              <Button
                id="close"
                variant="outline-dark"
                style={{
                  border: "none",
                }}
                className="mb-5 btn-lg"
                onClick={sliderOff}
              >
                &times;
              </Button>
            </div>
            <FilterContainer />
          </MobileSidebar>
        ) : null}
        {filterError ? (
          <h5 className="text-danger text-center">{filterErrorMessage}</h5>
        ) : (
          <>
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
                hi5Count={recognition.hi5_count}
                showHi5List={showHi5List}
              />
            ))}
          </>
        )}
        {showHi5ListPopup ? <ListHi5Container /> : null}
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
        <div id="#1235" style={{ height: 1 }} className="text-center" />
      </MobileWrapper>
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
  showHi5List: PropTypes.func,
  showHi5ListPopup: PropTypes.bool,
  filterErrorMessage: PropTypes.string,
  filterError: PropTypes.string,
};

export default React.memo(RecognitionListComponent);
