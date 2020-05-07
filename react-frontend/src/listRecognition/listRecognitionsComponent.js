import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import "@reach/menu-button/styles.css";

import RecognitionCardComponent from "./recognitionCardComponent";

const ListRecognitionsComponent = () => {
  const list = [
    {
      recognition_for: { name: "Avinash Mane", image: "boy-524512_1280.png" },
      recognition_by: { name: "Onkar Hasabe", image: "man-4216529__480.png" },
      recognition_on: "today at 5:37 pm",
      recognition_text:
        "i give high five to avinash for writing block on react strap documentation " +
        "i learn more from this docs ",
      core_value: "write a block",
      pixelimage: "pexels-3312664.jpg",
      hi5image: "high-five.png",
    },
    {
      recognition_for: { name: "Avinash Mane", image: "boy-524512_1280.png" },
      recognition_by: { name: "Onkar Hasabe", image: "man-4216529__480.png" },
      recognition_on: "today at 5:37 pm",
      recognition_text:
        "i give high five to avinash for writing block on react strap docs " +
        "i learn more from this docs",
      core_value: "write a block",
      pixelimage: "pexels-3312664.jpg",
      hi5image: "high-five.png",
    },
    {
      recognition_for: { name: "Avinash Mane", image: "boy-524512_1280.png" },
      recognition_by: { name: "Onkar Hasabe", image: "man-4216529__480.png" },
      recognition_on: "today at 5:37 pm",
      recognition_text:
        "i give high five to avinash for writing block on react strap docs " +
        "i learn more from this docs",
      core_value: "write a block",
      pixelimage: "pexels-3312664.jpg",
      hi5image: "high-five.png",
    },
  ];

  return (
    <Container className="rounded border border-secondary">
      {list.map((object) => (
        <RecognitionCardComponent key={object.index} object={object} />
      ))}
    </Container>
  );
};
ListRecognitionsComponent.propTypes = {
  list: PropTypes.array,
};
export default ListRecognitionsComponent;
