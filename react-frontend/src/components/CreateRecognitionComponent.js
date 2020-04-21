import React, { useState, useReducer, useEffect } from "react";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import reducer from "components/reducers/createRecognitionReducer";
import { setDetails } from "components/actions/createRecognitionAction";
import { string, object } from "yup";

const initialState = {
  user: "",
  coreValue: "",
  description: "",
};

const CreateRecognition = (props) => {
  const { userPlaceholder, textareaPlaceholder, coreValuePlaceholder } = props; // eslint-disable-line react/prop-types
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Loading the page  " + isLoading); // eslint-disable-line no-console
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("in submit"); // eslint-disable-line no-console

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
          alert("Information is sended"); // eslint-disable-line no-alert
          setIsLoading(false);
        } else {
          alert("information is not in correct formate"); // eslint-disable-line no-alert
          setIsLoading(false);
        }
      });
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
        <Card border="success">
          <Form onSubmit={handleOnSubmit} id="my-form">
            <Card.Header>
              <Row className="mt-2 mr-4">
                <Col></Col>
                <Col>
                  <Form.Control
                    className="font-italic h-6"
                    size="sm"
                    list="users"
                    name="user"
                    placeholder={userPlaceholder}
                    onChange={(event) => {
                      handleOnChange(event);
                    }}
                    value={state.user}
                  />
                </Col>
                <Col>
                  <Form.Control
                    className="font-italic h-6"
                    size="sm"
                    list="coreValues"
                    name="coreValue"
                    onChange={(event) => {
                      handleOnChange(event);
                    }}
                    placeholder={coreValuePlaceholder}
                    value={state.coreValue}
                  />
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row className="mt-2 mb-2">
                <Col>
                  <Form.Control
                    className="font-italic"
                    border="dark"
                    as="textarea"
                    placeholder={textareaPlaceholder}
                    name="description"
                    rows="3"
                    onChange={(event) => {
                      handleOnChange(event);
                    }}
                    value={state.description}
                  />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="bg-light">
              <Button
                type="submit"
                className="float-right mb-2 mr-4 btn btn-lg btn-info"
                size="sm"
              >
                Give Hi5
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </Col>
      <Col xs="3"></Col>
    </Row>
  );
};
CreateRecognition.defaultProps = {
  errorMesage: null,
  userPlaceholder: "select user",
  coreValuePlaceholder: "Select core values",
  textareaPlaceholder: "Write a description",
};
export default CreateRecognition;
