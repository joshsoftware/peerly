import React from "react";
import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

//import { store } from "root/redux-store";
import ImageComponent from "core-components/image/ImageComponent";
import { Card } from "core-components/card/card";
import { Form } from "core-components/form/FormComponent";
import CoreValue from "create-recognition/coreValues";
import { Row } from "core-components/grid/GridComponent";
import { Button } from "core-components/button/ButtonComponent";
import Image from "shared-components/user-image-name/UserImageName";

const Wrapper = styled.section`
  margin-left: 10%;
  margin-right: 10%;
`;
const WrapperForSelectValue = styled.section`
  margin-left: 18%;
  margin-right: 18%;
`;
const CommentBoxWrapper = styled.div`
  min-width: 50%;
`;
/*const CardWrapper = styled.section`

  borderRadius: "36px 36px 0px 0px",
  minHeight: "100vh",
  width: "206px",
  background: "linear-gradient(#00000 100px, var(--white) 0%)",
`;*/
const coreValues = [
  {
    id: 1,
    coreValueName: "core Value Name 1",
  },
  {
    id: 2,
    coreValueName: "core Value Name 2",
  },
  {
    id: 3,
    coreValueName: "core Value Name 3",
  },
  {
    id: 4,
    coreValueName: "core Value Name 4",
  },
];

const CreateRecognitionCardBody = ({
  EmployeeName,
  EmployeeImage,
  Hi5Image,
}) => {
  const [comment, addComment] = useState(false);
  const onClickAddComment = () => {
    addComment(true);
  };
  const addCommentText = (event) => {
    addCommentText(event.target.value);
  };
  return (
    <Card>
      <WrapperForSelectValue>
        <Row className="ml-5">
          <Image imageSrc={EmployeeImage} EmployeeName={EmployeeName}></Image>
        </Row>
        <Row className="justify-content-end">
          <ImageComponent
            img={Hi5Image}
            src="https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3Aa1fd8594-6956-447e-91fa-99c68e40d839&params=version%3A0&token=1591203478_da39a3ee_406848fd8fdd42120d43532f41101c504e61f5cb&api_key=CometServer1"
          />
        </Row>
        <Row> Select Value </Row>
      </WrapperForSelectValue>
      <Wrapper>
        <Row className="justify-content-around mt-4">
          <CoreValue coreValues={coreValues} />
        </Row>
        <Row className="justify-content-center mt-5">
          {comment ? (
            <CommentBoxWrapper>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={(event) => {
                  addCommentText(
                    event
                  ); /*store.dispatch({type:"add_comment",payload: event.target.value})*/
                }}
              ></Form.Control>
            </CommentBoxWrapper>
          ) : (
            <Button onClick={onClickAddComment}> Add Comments </Button>
          )}
        </Row>
        <Row className="justify-content-center mt-5">
          <Button> Done </Button>
        </Row>
      </Wrapper>
    </Card>
  );
};

CreateRecognitionCardBody.propTypes = {
  EmployeeName: PropTypes.string,
  EmployeeImage: PropTypes.string,
  Hi5Image: PropTypes.string,
};

export default CreateRecognitionCardBody;

/**
 * borderRadius: "36px 36px 0px 0px",
        minHeight: "100vh",
        width: "206px",
        background: "linear-gradient(var(--sage) 100px, var(--white) 0%)",
 *
*/
