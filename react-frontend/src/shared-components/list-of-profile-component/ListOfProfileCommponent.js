import React from "react";
import PropTypes from "prop-types";

import ProfileComponent from "shared-components/profile-component/ProfileComponent";
import { ListGroup } from "react-bootstrap";

const ListOfProfileComponent = ({ className, onClick, list, name, id }) => (
  <div className={className}>
    <ListGroup id={id}>
      {list.map((element, key) => (
        <ListGroup.Item key={key} name={name}>
          <ProfileComponent
            imageSrc={element.url}
            onClick={onClick}
            key={element.id}
            text={element.text}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

ListOfProfileComponent.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number,
  list: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string,
        text: PropTypes.string,
      })
    )
  ),
};

export default ListOfProfileComponent;
