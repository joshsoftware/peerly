import React, { useState, useReducer, useEffect } from "react";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import reducer from "components/reducers/createRecognitionReducer";
import { setDetails } from "components/actions/createRecognitionAction";
import { string, object } from "yup";
import PropTypes from "prop-types";

const initialState = {
  user: "",
  coreValue: "",
  description: "",
};

const CreateRecognition = (props) => {
  const {
    userPlaceholder, // eslint-disable-line react/prop-types
    users, // eslint-disable-line react/prop-types
    coreValue, // eslint-disable-line react/prop-types
    textareaPlaceholder, // eslint-disable-line react/prop-types
    coreValuePlaceholder, // eslint-disable-line react/prop-types
  } = props; // eslint-disable-line react/prop-types
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    console.log("Loading the page  " + isLoading); // eslint-disable-line no-console
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setIsLoading(true);
      let schema = object().shape({
        user: string().required(),
        coreValue: string().required(),
        description: string().required(),
      });
      schema
        .isValid({
          user: state.user,
          coreValue: state.coreValue,
          description: state.description,
        })
        .then(function (valid) {
          if (valid) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
    }
    setValidated(false);
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    let updatedValues = {};
    updatedValues[name] = value;
    dispatch(setDetails(updatedValues));
  };

  return (
    <Row className="mt-5">
      <Col xs="3"></Col>
      <Col xs="6">
        <Card>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Card.Header>
              <Form.Row className="mt-1">
                <Form.Group className="font-italic text-info" as={Col}>
                  Recognition
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Control
                    list="userList"
                    name="user"
                    size="sm"
                    placeholder={userPlaceholder}
                    value={state.user}
                    onChange={(event) => {
                      handleOnChange(event);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a user.
                  </Form.Control.Feedback>
                </Form.Group>
                <datalist id="userList">
                  {users.map((person) => (
                    <option key="1">{person.name}</option>
                  ))}
                </datalist>
                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Control
                    list="coreValueList"
                    size="sm"
                    name="coreValue"
                    placeholder={coreValuePlaceholder}
                    aria-describedby="inputGroupPrepend"
                    onChange={(event) => {
                      handleOnChange(event);
                    }}
                    value={state.coreValue}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a core value.
                  </Form.Control.Feedback>
                </Form.Group>
                <datalist id="coreValueList">
                  {coreValue.map((sample) => (
                    <option key="1">{sample.value}</option> // eslint-disable-line no-unused-expressions
                  ))}
                </datalist>
              </Form.Row>
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="font-italic text-info">
                    * Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows="3"
                    placeholder={textareaPlaceholder}
                    onChange={(event) => {
                      handleOnChange(event);
                    }}
                    value={state.description}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please write a description.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer>
              <Form.Row>
                <Col className="font-italic text-danger">Message</Col>
                <Col></Col>
                <Col>
                  <div className={isLoading ? "d-none" : "error"}>
                    <Button className="float-right" type="submit">
                      Give Hi5
                    </Button>
                  </div>
                  <div
                    className={
                      isLoading ? "spinner-border float-right" : "d-none"
                    }
                  ></div>
                </Col>
              </Form.Row>
            </Card.Footer>
          </Form>
        </Card>
      </Col>
      <Col xs="3"></Col>
    </Row>
  );
};
CreateRecognition.propTypes = {
  users: PropTypes.array,
  coreValue: PropTypes.array,
};

CreateRecognition.defaultProps = {
  errorMesage: null,
  users: [{ name: "ajay" }, { name: "rahul" }, { name: "amol" }],
  coreValue: [{ value: "abcd" }, { value: "pqrs" }, { value: "xyz" }],
  userPlaceholder: "Select user",
  coreValuePlaceholder: "Select core values",
  textareaPlaceholder: "Write a description",
};
export default CreateRecognition;
