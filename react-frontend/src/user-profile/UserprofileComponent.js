import React from "react";
import PropTypes from "prop-types";

import { Form } from "core-components/form/FormComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";

const UserProfileComponent = ({
  className,
  firstName,
  lastName,
  email,
  profileImage,
  displayName,
  id,
}) => {
  const onClick = () => {
    // console.log(id)
  };
  return (
    <div className={className}>
      <Form>
        <div className="form-group">
          <ProfileComponent
            src={profileImage}
            name={displayName}
            onClick={onClick}
          />
          <span>
            {email}
            {firstName}
            {lastName}
            {id}
          </span>
          <input type="file" className="form-control-file"></input>
        </div>
      </Form>
    </div>
  );
};

UserProfileComponent.propTypes = {
  className: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  profileImage: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.number,
};

export default React.memo(UserProfileComponent);
