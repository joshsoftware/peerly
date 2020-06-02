import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Card } from "core-components/card/card";
import Img from "shared-components/user-image-name/UserImageName";
import { Row } from "core-components/grid/GridComponent";
import CreateRecognitionButton from "shared-components/create-reccognition-button/CreateRecognitionButton";

const ButtonComponentWrapper = styled.div`
  position: absolute;
  margin-top: 200px;
  margin-left: -35px;
`;

const CreateRecognitionLeftPanel = ({
  hi5ImageForButton,
  emaployeeImage,
  employeeName,
  hi5CollectedImage,
  hi5Collected,
}) => {
  const onClick = () => {
    //todo
  };
  return (
    <Card
      style={{
        borderRadius: "36px 36px 0px 0px",
        minHeight: "100vh",
        width: "206px",
        background: "linear-gradient(var(--sage) 100px, var(--white) 0%)",
      }}
    >
      <Row className="justify-content-center">
        <Img
          className="justify-content-center mt-5"
          text={employeeName}
          imageSrc={emaployeeImage}
        />
      </Row>
      <Row className="justify-content-center">
        <Img
          className="justify-content-center mt-5"
          text={hi5Collected}
          imageSrc={hi5CollectedImage}
        />
      </Row>
      <Row className="justify-content-center">
        <ButtonComponentWrapper>
          <CreateRecognitionButton
            imageUrl={hi5ImageForButton}
            onClick={onClick}
          />
        </ButtonComponentWrapper>
      </Row>
    </Card>
  );
};

CreateRecognitionLeftPanel.propTypes = {
  hi5ImageForButton: PropTypes.string.isRequired,
  emaployeeImage: PropTypes.string.isRequired,
  employeeName: PropTypes.string.isRequired,
  hi5CollectedImage: PropTypes.string.isRequired,
  hi5Collected: PropTypes.string.isRequired,
};

export default CreateRecognitionLeftPanel;
