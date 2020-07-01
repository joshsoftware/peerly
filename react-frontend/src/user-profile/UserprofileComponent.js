import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Form } from "core-components/form/FormComponent";
import { Card } from "core-components/card/CardComponent";
import { Button } from "core-components/button/ButtonComponent";
import { Col } from "core-components/grid/GridComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";
import { Spinner } from "core-components/spinner/SpinnerComponent.js";

const CardComponent = styled(Card)`
  border-radius: 36px 36px 0px 0px;
  margin-top: 3%;
  margin-left: 30%;
  padding-bottom: 19%;
  height: 537px;
  margin-top: 100px;
  align-items: center;
  position: fixed;
  width: 550px;
`;

const UserProfileComponent = ({
  firstName,
  lastName,
  email,
  profileImage,
  displayName,
  uploadImage,
  uploadOnAws,
  spinner,
}) => {
  const onClick = () => {
    // console.log(id)
  };
  return (
    <CardComponent className="text-center">
      <Form onSubmit={uploadOnAws}>
        <div className="d-flex justify-content-center">
          <ProfileComponent
            src={profileImage}
            name={displayName}
            onClick={onClick}
            className="d-flex flex-column"
          />
        </div>
        <Form.Label>{email}</Form.Label>
        <Form.Group controlId="formFirstName" className=" d-flex">
          <Col>
            <Form.Label>First Name</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder={firstName}
              defaultValue={firstName}
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="formLastName" className=" d-flex">
          <Col>
            <Form.Label>Last Name</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder={lastName}
              defaultValue={lastName}
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="formDisplayName" className=" d-flex">
          <Col>
            <Form.Label>Display Name</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder={displayName}
              defaultValue={displayName}
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="formImageUrl" className=" d-flex">
          <Col>
            <Form.Label>Profile Image</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="file"
              className="text-center"
              onChange={uploadImage}
            />
          </Col>
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
      {spinner ? (
        <>
          <Spinner className="mt-5" animation="grow" variant="info"></Spinner>
          <span className="mt-5">Updating...</span>
        </>
      ) : null}
    </CardComponent>
  );
};

UserProfileComponent.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  profileImage: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string,
  uploadImage: PropTypes.func,
  uploadOnAws: PropTypes.func,
  spinner: PropTypes.bool,
};

export default React.memo(UserProfileComponent);
