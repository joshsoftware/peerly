import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Form } from "core-components/form/FormComponent";
import { Button } from "core-components/button/ButtonComponent";
import ImageComponent from "core-components/image/ImageComponent";

const ProfileImage = styled.div`
  width: 12vh;
`;

const MenuButton = styled(Button)`
  color: var(--black);
  background-color: var(--white);
  font-weight: bold;
  border: none;
`;

const RecognitionCardHeaderComponent = ({
  givenAt,
  givenForName,
  givenForImage,
  coreValue,
}) => {
  return (
    <div>
      <div className="d-flex justify-content-end">
        <MenuButton>...</MenuButton>
      </div>
      <div className="d-flex flex-row">
        <ProfileImage>
          <ImageComponent
            src={givenForImage}
            roundedCircle={true}
            alt="Profile"
          />
        </ProfileImage>
        <div className="text-start ml-2">
          <Form.Label className="font-weight-bold ">{givenForName}</Form.Label>
          <div>
            <Form.Label> got a high five for</Form.Label>
            <Form.Label className="ml-1 font-weight-bold">
              {coreValue}
            </Form.Label>
          </div>
          <Form.Label className="text-muted">{givenAt}</Form.Label>
        </div>
      </div>
    </div>
  );
};
RecognitionCardHeaderComponent.propTypes = {
  givenForName: PropTypes.string.isRequired,
  givenForImage: PropTypes.string,
  givenAt: PropTypes.string.isRequired,
  coreValue: PropTypes.string.isRequired,
};

RecognitionCardHeaderComponent.defaultProps = {
  givenForImage: "https://i.picsum.photos/id/2/200/200.jpg",
};

export default React.memo(RecognitionCardHeaderComponent);
