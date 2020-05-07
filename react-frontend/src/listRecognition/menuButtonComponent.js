import React from "react";
import "@reach/menu-button/styles.css";
import PropTypes from "prop-types";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

const MenuButtonComponent = (props) => {
  const { onClickEvent, buttonClassName } = props;
  return (
    <Button className={buttonClassName} onClick={onClickEvent}>
      <FontAwesomeIcon icon={faEllipsisH} />
    </Button>
  );
};

MenuButtonComponent.propTypes = {
  onClickEvent: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string,
};

export default MenuButtonComponent;
