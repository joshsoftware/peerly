import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import RecognitionCardComponent from "./recognitionCardComponent";

import recognitionByImage from "./images/recognitionByImage.png";
import recognitionForImage from "./images/recognitionForImage.png";
import highFiveImage from "./images/high-five.png";
import rightColumnImage from "listRecognition/images/rightColumnImage.jpg";

const ListRecognitionsComponent = () => {
  const recognitionList = [
    {
      recognition_for: {
        name: "Avinash Mane",
        image: recognitionForImage,
      },
      recognition_by: {
        name: "Onkar Hasabe",
        image: recognitionByImage,
      },
      recognition_on: "today at 5:37 pm",
      recognition_text:
        "i give high five to avinash for writing block on react strap documentation " +
        "i learn more from this docs ",
      core_value: "write a block",
      highFiveText: "got high-five for",
      rightColumnImage: rightColumnImage,
      highFiveImage: highFiveImage,
    },
    {
      recognition_for: {
        name: "Avinash Mane",
        image: recognitionForImage,
      },
      recognition_by: {
        name: "Onkar Hasabe",
        image: recognitionByImage,
      },
      recognition_on: "today at 5:37 pm",
      recognition_text:
        "i give high five to avinash for writing block on react strap documentation " +
        "i learn more from this docs ",
      core_value: "write a block",
      highFiveText: "got high-five for",
      rightColumnImage: rightColumnImage,
      highFiveImage: highFiveImage,
    },
  ];

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
  list: PropTypes.array,
};
export default ListRecognitionsComponent;
