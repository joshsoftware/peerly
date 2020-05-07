import React from "react";
import "@reach/menu-button/styles.css";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "react-bootstrap";

const MenuButtonComponent = () => {
  return (
    <Button className="btn-sm bg-secondary">
      <FontAwesomeIcon icon={faEllipsisH} />
    </Button>
  );
};

export default MenuButtonComponent;
