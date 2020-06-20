import React from "react";
import PropTypes from "prop-types";

import ProfileComponent from "shared-components/profile-component/ProfileComponent";

const UserListComponent = ({ userList, setUserId }) => {
  return (
    <div className="text-center bg-light grey">
      {userList.map((user, index) => (
        <div key={index}>
          <ProfileComponent
            src={user.profile_image_url}
            name={`${user.first_name} ${user.last_name}`}
            id={user.id}
            size={8}
            labelClass="ml-2"
            className="my-3"
            setUserId={setUserId}
          />
        </div>
      ))}
    </div>
  );
};

UserListComponent.propTypes = {
  userList: PropTypes.array.isRequired,
  setUserId: PropTypes.func,
};

export default React.memo(UserListComponent);
