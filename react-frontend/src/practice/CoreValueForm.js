import React from "react";
import { Form, Button } from "react-bootstrap";
import { store } from "root/redux-store";

const CoreValueForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    let formData = new FormData(form);
    let coreValueData = {
      org_id: formData.get("orgId"),
      text: formData.get("text"),
      describtion: formData.get("describtion"),
    };
    store.dispatch({ type: "CORE_VALUE_API", payload: coreValueData });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>org_id</Form.Label>
          <Form.Control
            type="number"
            name="orgId"
            placeholder="select org id"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control type="text" name="text" placeholder="enter text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>description</Form.Label>
          <Form.Control
            type="textarea"
            name="description"
            placeholder="enter describtion"
          />
        </Form.Group>
        <Button type="submit">Add Core Values</Button>
      </Form>
    </div>
  );
};

export default CoreValueForm;
