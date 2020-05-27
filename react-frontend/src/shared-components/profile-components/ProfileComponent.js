import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ImageComponent from "core-components/image/ImageComponent";
import Row from "core-components/row/RowComponent";
import LabelComponent from "core-components/label/LabelComponent";

const Img = styled.div`
  width: 8vh;
`;

const ProfileComponent = ({
  roundedCircle,
  className,
  profileImage,
  profileName,
}) => {
  return (
    <Row className={className}>
      <Img>
        <ImageComponent
          src={profileImage}
          roundedCircle={roundedCircle}
          alt="profile"
        />
      </Img>
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
