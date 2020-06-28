/*import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Form } from "core-components/form/FormComponent";
import { Card } from "core-components/card/CardComponent";
import { Button } from "core-components/button/ButtonComponent";
import { Col } from "core-components/grid/GridComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";

const CardComponent = styled(Card)`
border-radius: 36px 36px 0px 0px;
  margin-top: 3%;
  margin-left: 30%;
 
  padding-bottom: 19%;
  height: 537px;
  margin-top: 100px;
  position: fixed;
  width: 550px;
`;

const UserProfileComponent = ({
  firstName,
  lastName,
  email,
  profileImage,
  displayName,
  id,
  uploadImage,
  uploadOnAws,
}) => {
  const onClick = () => {
    // console.log(id)
  };
  return (
    <CardComponent className="text-center">
      <Form onSubmit={uploadOnAws}>
        <ProfileComponent
          src={profileImage}
          name={displayName}
          onClick={onClick}
          className="d-flex flex-column "
        />
        <Form.Label>{email}</Form.Label>
        <Form.Group controlId="formFirstName" className=" d-flex">
          <Col>
            <Form.Label>First Name</Form.Label>
          </Col>
          <Col>
            <Form.Control type="text" placeholder={firstName} />
          </Col>
        </Form.Group>
        <Form.Group controlId="formLastName" className=" d-flex">
          <Col>
            <Form.Label>Last Name</Form.Label>
          </Col>
          <Col>
            <Form.Control type="text" placeholder={lastName} />
          </Col>
        </Form.Group>
        <Form.Group controlId="formDisplayName" className=" d-flex">
          <Col>
            <Form.Label>Display Name</Form.Label>
          </Col>
          <Col>
            <Form.Control type="text" placeholder={displayName} />
          </Col>
        </Form.Group>
        <Form.Group controlId="formImageUrl" className=" d-flex">
          <Col>
            <Form.Label>Profile Image</Form.Label>
          </Col>
          <Col>
            <Form.Control type="file" className="text-center" onChange={uploadImage}/>
          </Col>
        </Form.Group>
        <Button type="submit">Updates</Button>
      </Form>
    </CardComponent>
  );
};

UserProfileComponent.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  profileImage: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string,
};

export default React.memo(UserProfileComponent);
*/
