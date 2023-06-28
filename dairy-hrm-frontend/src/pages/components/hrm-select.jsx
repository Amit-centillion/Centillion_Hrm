import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";

export const HRMSelect = ({
  label,
  name,
  control,
  options,
  error,
  ...rest
}) => {
  return (
    <Form.Group className="form-group">
      {label && <Form.Label>{label}</Form.Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return <Select options={options} {...field} {...rest} />;
        }}
      />
      {error && <div className="invalid-feedback">{error?.message}</div>}
    </Form.Group>
  );
};
