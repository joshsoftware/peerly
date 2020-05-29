import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import RecognitionCardComponent from "recognition-list-components/RecognitionCardComponent";

const Div = styled.div`
  border-radius: 36px;
`;

const RecognitionListComponent = ({ recognitionList }) => {
  return (
    <Div className=" border border-secondary">
      {recognitionList.map((recognition) => (
        <RecognitionCardComponent
          key={recognition.index}
          recognition={recognition}
        />
      ))}
    </Div>
  );
};

RecognitionListComponent.propTypes = {
  recognitionList: PropTypes.array.isRequired,
};

export default React.memo(RecognitionListComponent);
