import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../../common/contexts";
import { HRMFormInput } from "./hrm-input";

export const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { onChangePassword } = useAuth();

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onChangePassword)}>
        <HRMFormInput
          type="password"
          label={"Old Password"}
          {...register("oldPassword")}
          error={errors?.oldPassword}
        />
        <HRMFormInput
          type="password"
          label={"New Password"}
          {...register("newPassword")}
          error={errors?.newPassword}
        />
        <HRMFormInput
          type="password"
          label={"Confirm Password"}
          {...register("confirmPassword")}
          error={errors?.confirmPassword}
        />
        <div className="submit-section">
          <Button type="submit" className="submit-btn" variant="primary">
            Update Password
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
};
