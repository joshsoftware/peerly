import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import RecognitionCardComponent from "recognition-list-components/RecognitionCardComponent";

const Wrapper = styled.div`
  border: 1px solid lightgrey;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 36px;
  opacity: 1;
`;

const RecognitionListComponent = ({ recognitionList }) => {
  const getDateFormate = (timestamp) =>
    new Date(timestamp * 1000).toDateString();

  return (
    <Wrapper>
      {recognitionList.map((recognition, index) => (
        <RecognitionCardComponent
          key={index}
          givenByName={`${recognition.givenBy.first_name} ${recognition.givenBy.last_name}`}
          givenByImage={recognition.givenBy.profile_image_url}
          givenForName={`${recognition.givenFor.first_name} ${recognition.givenFor.last_name}`}
          givenForImage={recognition.givenFor.profile_image_url}
          givenAt={getDateFormate(recognition.given_at)}
          text={recognition.text}
          coreValue={recognition.coreValue.text}
          coreValueImage={recognition.coreValue.thumbnail}
        />
      ))}
    </Wrapper>
  );
};

RecognitionListComponent.propTypes = {
  recognitionList: PropTypes.array.isRequired,
};

export default React.memo(RecognitionListComponent);
