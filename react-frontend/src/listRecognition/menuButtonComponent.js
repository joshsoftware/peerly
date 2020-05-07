import React from "react";
import "@reach/menu-button/styles.css";
import PropTypes from "prop-types";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

const MenuButtonComponent = (props) => {
  const { onClickEvent } = props;
  return (
    <Button
      className="btn-sm bg-light grey text-dark font-weight-bold border-light grey"
      onClick={onClickEvent}
    >
      <FontAwesomeIcon icon={faEllipsisH} />
    </Button>
  );
};

MenuButtonComponent.propTypes = {
  onClickEvent: PropTypes.func.isRequired,
};

export default MenuButtonComponent;
