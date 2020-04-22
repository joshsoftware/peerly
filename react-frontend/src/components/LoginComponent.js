import React, { useState } from "react";
import * as yup from "yup";
import { Col, Form, Button, Container } from "react-bootstrap";
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
          // try {
          //   fetch("https://reqres.in/api/login", {
          //     method: "POST",
          //     credentials: "same-origin",
          //     withCredentials: true,
          //     headers: new Headers({
          //       "Content-Type": "application/json",
          //     }),
          //     body: JSON.stringify({
          //       email: email,
          //       password: password,
          //     }),
          //   })
          //     .then((response) => {
          //       return response.json();
          //     })
          //     .then((jsonresponse) => {
          //       //console.log("JSON RESPONSE:->  ", jsonresponse);
          //       if (jsonresponse.token) {
          //         //console.log();
          //       } else {
          //         //console.log(jsonresponse.message);
          //       }
          //     });
          // } catch (ex) {
          //   //console.log(ex)
          // }
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
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <br></br>
          <Col sm={4}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                class="form-control"
                placeholder="Username or Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Form.Control
                className="mt-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <br></br>
          <Col sm={4}>
            <Button variant="primary" type="submit" size="lg" block>
              Login
            </Button>
          </Col>
          <br></br>
        </Form>
      </center>
    </Container>
  );
};
export default LoginForm;
