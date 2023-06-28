import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { genderOptions } from "../../../common/constants/options";
import { useEmployee } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { HRMSelect } from "../../components/hrm-select";
import { EmployeeValidation } from "../../../common/validations/employee-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";

export const EmployeeForm = ({
  isEmployeeFormVisible,
  onCloseForm,
  initialValues = null,
  designations = [],
  departments = [],
  roles = [],
  filters,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(EmployeeValidation),
  });
  const { onUpdateEmployees } = useEmployee();

  const handleSubmitEmployee = async (values) => {
    if (initialValues instanceof Object) {
      delete values.password;
    }
    const result = await onUpdateEmployees(values, filters);
    if (result?.status) {
      onCloseForm();
    }
  };

  useEffect(() => {
    if (initialValues instanceof Object) {
      const selectedDepartment = departments.find(
        (item) => item.value === initialValues.department?._id
      );

      const selectedDesignation = designations.find(
        (item) => item.value === initialValues?.designation?._id
      );

      const selectedGender = genderOptions.find(
        (item) => item.value === initialValues?.gender
      );

      const selectedRole = roles.find(
        (item) => item.value === initialValues?.role?._id
      );
      const payload = {
        ...initialValues,
        joiningDate: format(new Date(initialValues.joiningDate), "yyyy-MM-dd"),
        department: selectedDepartment ? selectedDepartment : {},
        designation: selectedDesignation ? selectedDesignation : {},
        gender: selectedGender ? selectedGender : {},
        role: selectedRole ? selectedRole : {},
        password: "test",
      };
      reset(payload);
    }
  }, [initialValues, reset, departments, designations, roles]);

  return (
    <Modal
      show={isEmployeeFormVisible}
      onHide={onCloseForm}
      size={"lg"}
      className="custom-modal"
    >
      <Form
        onSubmit={handleSubmit(handleSubmitEmployee)}
        className="modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Employee" : "Add Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <HRMFormInput
                label={"First Name"}
                {...register("firstName")}
                error={errors?.firstName}
              />
            </Col>
            <Col sm={6}>
              <HRMFormInput
                label={"Last Name"}
                {...register("lastName")}
                error={errors?.lastName}
              />
            </Col>
            {initialValues ? (
              <Col sm={12}>
                <HRMFormInput
                  label={"Email"}
                  {...register("email")}
                  error={errors.email}
                />
              </Col>
            ) : (
              <React.Fragment>
                <Col sm={6}>
                  <HRMFormInput
                    label={"Email"}
                    {...register("email")}
                    error={errors.email}
                  />
                </Col>
                <Col sm={6}>
                  <HRMFormInput
                    type={"password"}
                    label={"Password"}
                    {...register("password")}
                    error={errors?.password}
                  />
                </Col>
              </React.Fragment>
            )}
            <Col sm={6}>
              <HRMFormInput
                type="number"
                label={"Phone"}
                {...register("mobileNo")}
                error={errors?.mobileNo}
              />
            </Col>
            <Col sm={6}>
              <HRMFormInput
                type="date"
                label={"Joinig Date"}
                {...register("joiningDate")}
                error={errors?.joiningDate}
              />
            </Col>
            <Col sm={6}>
              <HRMSelect
                name={"department"}
                control={control}
                label={"Department"}
                options={departments}
                error={errors?.department}
                placeholder="Select Department"
              />
            </Col>
            <Col sm={6}>
              <HRMSelect
                name={"designation"}
                control={control}
                label={"Designation"}
                options={designations}
                error={errors?.designation}
                placeholder="Select Designation"
              />
            </Col>
            <Col sm={6}>
              <HRMSelect
                name={"gender"}
                control={control}
                label={"Gender"}
                options={genderOptions}
                error={errors?.gender}
                placeholder="Select Gender"
              />
            </Col>
            <Col sm={6}>
              <HRMSelect
                name={"role"}
                control={control}
                label={"Role"}
                options={roles}
                error={errors?.role}
                placeholder="Select Role"
              />
            </Col>
          </Row>
          <div className="submit-section">
            <Button type="submit" className="submit-btn">
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
