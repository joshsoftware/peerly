import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import {
  Col,
  Form,
  Input,
  Button,
  Container,
  FormGroup,
  Label,
  InputGroup,
} from "reactstrap";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const eventOnsubmit = (event) => {
    event.preventDefault();

    let schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(4),
    });
    schema
      .isValid({
        email: email,
        password: password,
      })
      .then(function (valid) {
        if (valid) {
          try {
            fetch("https://reqres.in/api/login", {
              method: "POST",
              credentials: "same-origin",
              withCredentials: true,
              headers: new Headers({
                "Content-Type": "application/json",
              }),
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((jsonresponse) => {
                // console.log("JSON RESPONSE:->  ", jsonresponse);
                if (jsonresponse.token) {
                  //console.log();
                } else {
                  // console.log(jsonresponse.message);
                }
              });
          } catch (ex) {
            //console.log(ex)
          }
        } else {
          //alert("Please give in right format");
        }
        //console.log(email + "  " + password + "  " + valid);
      });
  };

  return (
    <Container>
      <center>
        <Form class="form-signin" onSubmit={eventOnsubmit}>
          <br></br> <br></br>
          <br></br>
          <br></br>
          <h2>Please sign in</h2>
          <br></br>
          <Col sm={4}>
            <InputGroup>
              <Input
                type="email"
                class="form-control"
                placeholder="username or email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></Input>
            </InputGroup>
          </Col>
          <Col sm={4}>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Input>
          </Col>
          <br></br>
          <FormGroup check inline>
            <Label check>
              <Input type="checkbox" /> Remember me
            </Label>
          </FormGroup>
          <br></br>
          <br></br>
          <Col sm={4}>
            <Button type="submit" color="primary" size="lg" block>
              Sign in
            </Button>
          </Col>
          <br></br>
        </Form>
      </center>
    </Container>
  );
};
export default LoginForm;
