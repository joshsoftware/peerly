import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Form } from "core-components/form/FormComponent";
import ImageComponent from "core-components/image/ImageComponent";

const Border = styled.fieldset`
  border: 1px solid lightgrey;
  border-radius: 11px;
  opacity: 1;
  margin-left: 5%;
  margin-right: 5%;
`;

const Legend = styled.legend`
  width: auto;
  margin-left: 10%;
`;

const ProfileImage = styled(ImageComponent)`
  width: 7vh;
  margin-right: 5%;
`;

const RecognitionTextComponent = ({ text, givenByName, givenByImage }) => (
  <div>
    <Border>
      <Legend>“</Legend>
      <Form.Label className="px-2 pb-2 pt-0">{text}</Form.Label>
    </Border>
    <div className="d-flex justify-content-end w-100">
      <Form.Label className="font-weight-bold text-dark">
        {givenByName}
      </Form.Label>
      <ProfileImage src={givenByImage} roundedCircle={true} alt="Profile" />
    </div>
  </div>
);

RecognitionTextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  givenByName: PropTypes.string.isRequired,
  givenByImage: PropTypes.string,
};

RecognitionTextComponent.defaultProps = {
  givenByImage: "https://i.picsum.photos/id/2/200/200.jpg",
};

export default React.memo(RecognitionTextComponent);
