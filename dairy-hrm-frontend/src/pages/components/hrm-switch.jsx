import React from "react";
import { Form } from "react-bootstrap";

export const HRMFormSwitch = React.forwardRef(
  ({ label, placeholder, error, ...rest }, ref) => {
    return (
      <Form.Group className="form-group">
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Check
          type="switch"
          className="form-custom-switch"
          ref={ref}
          {...rest}
        />
        {error && <div className="invalid-feedback">{error?.message}</div>}
      </Form.Group>
    );
  }
);
