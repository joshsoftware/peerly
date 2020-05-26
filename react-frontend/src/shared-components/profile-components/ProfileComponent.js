import React from "react";
import PropTypes from "prop-types";

import ImageComponent from "core-components/image/ImageComponent";
import Row from "core-components/row/RowComponent";
import LabelComponent from "core-components/label/LabelComponent";

const ProfileComponent = ({
  roundedCircle,
  className,
  profileImage,
  profileName,
}) => {
  return (
    <Row className={className}>
      <ImageComponent
        src={profileImage}
        roundedCircle={roundedCircle}
        alt="profile"
      />
      <LabelComponent className="font-weight-bold" text={profileName} />
    </Row>
  );
};

ProfileComponent.propTypes = {
  className: PropTypes.string,
  roundedCircle: PropTypes.bool,
  profileImage: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
};

ProfileComponent.defaultProps = {
  roundedCircle: true,
  className: "d-flex justify-content-around",
};

export default React.memo(ProfileComponent);
