import React from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "react-bootstrap";

const MenuButtonComponent = (props) => {
  const { onClickEvent, ClassName } = props;
  return (
    <Button className={ClassName} onClick={onClickEvent}>
      <BsThreeDots />
    </Button>
  );
};

MenuButtonComponent.propTypes = {
  onClickEvent: PropTypes.func.isRequired,
  ClassName: PropTypes.string,
};

export default MenuButtonComponent;
