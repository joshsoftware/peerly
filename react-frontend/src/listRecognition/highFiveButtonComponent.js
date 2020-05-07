import React from "react";
import "@reach/menu-button/styles.css";
import { Button } from "react-bootstrap";
import ImageComponent from "./imageComponent";

const HighFiveButtonComponent = () => {
  return (
    <Button className="btn-sm bg-light grey text-dark font-weight-bold border-light grey">
      +1
      <ImageComponent src="high-five.png" shape="rounded" />
    </Button>
  );
};

export default HighFiveButtonComponent;
