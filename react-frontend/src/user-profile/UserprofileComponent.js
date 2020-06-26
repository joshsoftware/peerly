import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Form } from "core-components/form/FormComponent";
import { Card } from "core-components/card/CardComponent";
import { Button } from "core-components/button/ButtonComponent";
import { Col } from "core-components/grid/GridComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";

const CardComponent = styled(Card)`
  border-radius: 20px;
  margin: 20px 20px;
  width: 550px;
  box-shadow: 0px 5px 20px var(--box-shadow-color);
  opacity: 1;
  background: var(--white) 0% 0% no-repeat padding-box;
`;

const UserProfileComponent = ({
  firstName,
  lastName,
  email,
  profileImage,
  displayName,
}) => {
  const onClick = () => {
    // console.log(id)
  };
  return (
    <CardComponent className="text-center">
      <Form>
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
            <Form.Control type="file" className="text-center" />
          </Col>
        </Form.Group>
        <Button onClick={onClick}>Update</Button>
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
