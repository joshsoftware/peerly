import React from "react";
import PropTypes from "prop-types";

import ProfileComponent from "shared-components/profile-component/ProfileComponent";

const ListOfProfileComponent = ({ className, onClick, list, name }) => (
  <div className={className}>
    {list.map((element, key) => (
      <div key={key} name={name}>
        <ProfileComponent
          imageSrc={element.url}
          onClick={onClick}
          key={element.id}
          text={element.text}
        />
      </div>
    ))}
  </div>
);

ListOfProfileComponent.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
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
