import React from "react";
import { Form } from "react-bootstrap";

export const HRMFileInput = React.forwardRef(
  ({ label, placeholder, error, ...rest }, ref) => {
    return (
      <Form.Group className="form-group" controlId="formFile">
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control placeholder={placeholder} ref={ref} {...rest} />
        {error && <div className="invalid-feedback">{error?.message}</div>}
      </Form.Group>
    );
  }
);
