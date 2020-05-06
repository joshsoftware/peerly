import React from "react";
import Container from "react-bootstrap";
import PropTypes from "prop-types";
import "@reach/menu-button/styles.css";

import CardComponent from "./cardComponent";

const ListRecognitionsComponent = () => {
  const list = [
    {
      recognition_for: { name: "Avinash Mane", img: "boy-524512_1280.png" },
      recognition_by: { name: "Onkar Hasabe", img: "man-4216529__480.png" },
      recognistion_on: "today at 5:37 pm",
      recognistion_text:
        "i give high five to onkar for writing block on react strap documentation ",
      core_value_text: "write a block",
      pixelimg: "pexels-3312664.jpg",
      hi5img: "high-five.png",
    },
    {
      recognition_for: { name: "Avinash Mane", img: "boy-524512_1280.png" },
      recognition_by: { name: "Onkar Hasabe", img: "man-4216529__480.png" },
      recognistion_on: "today at 5:37 pm",
      recognistion_text:
        "i give high five to onkar for writing block on react strap documentation ",
      core_value_text: "write a block",
      pixelimg: "pexels-3312664.jpg",
      hi5img: "high-five.png",
    },
    {
      recognition_for: { name: "Avinash Mane", img: "boy-524512_1280.png" },
      recognition_by: { name: "Onkar Hasabe", img: "man-4216529__480.png" },
      recognistion_on: "today at 5:37 pm",
      recognistion_text:
        "i give high five to onkar for writing block on react strap documentation ",
      core_value_text: "write a block",
      pixelimg: "pexels-3312664.jpg",
      hi5img: "high-five.png",
    },
  ];
  return (
    <Container className="rounded border border-secondary">
      {list.map((object) => (
        <CardComponent key={object.index} object={object} />
      ))}
    </Container>
  );
};
ListRecognitionsComponent.propTypes = {
  list: PropTypes.array,
};
export default ListRecognitionsComponent;
