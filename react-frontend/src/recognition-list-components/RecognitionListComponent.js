import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import RecognitionCardComponent from "recognition-list-components/RecognitionCardComponent";

const Div = styled.div`
  border-radius: 36px;
`;

const RecognitionListComponent = ({ recognitionList }) => {
  return (
    <Div className=" border border-secondary" data-testid="RecognitionCard">
      {recognitionList.map((recognition) => (
        <RecognitionCardComponent
          key={recognition.index}
          given_by={recognition.given_by}
          given_for={recognition.given_for}
          given_at={recognition.given_at}
          text={recognition.text}
          core_value={recognition.core_value}
          high_five_count={recognition.high_five_count}
        />
      ))}
    </Div>
  );
};

RecognitionListComponent.propTypes = {
  recognitionList: PropTypes.array.isRequired,
};

export default React.memo(RecognitionListComponent);
