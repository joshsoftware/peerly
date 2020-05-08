import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import RecognitionCardComponent from "./recognitionCardComponent";

const ListRecognitionsComponent = (props) => {
  const { recognitionList } = props;
  return (
    <Container className="rounded border border-secondary">
      {recognitionList.map((recognition) => (
        <RecognitionCardComponent
          key={recognition.index}
          recognition={recognition}
        />
      ))}
    </Container>
  );
};
ListRecognitionsComponent.propTypes = {
  recognitionList: PropTypes.array.isRequired,
};
export default ListRecognitionsComponent;
